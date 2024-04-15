// This file isn't processed by Vite, see https://github.com/vikejs/vike/issues/562
// Consequently:
//  - When changing this file, you needed to manually restart your server for your changes to take effect.
//  - To use your environment variables defined in your .env files, you need to install dotenv, see https://vike.dev/env
//  - To use your path aliases defined in your vite.config.js, you need to tell Node.js about them, see https://vike.dev/path-aliases

// If you want Vite to process your server code then use one of these:
//  - vavite (https://github.com/cyco130/vavite)
//     - See vavite + Vike examples at https://github.com/cyco130/vavite/tree/main/examples
//  - vite-node (https://github.com/antfu/vite-node)
//  - HatTip (https://github.com/hattipjs/hattip)
//    - You can use Bati (https://batijs.dev/) to scaffold a Vike + HatTip app. Note that Bati generates apps that use the V1 design (https://vike.dev/migration/v1-design) and Vike packages (https://vike.dev/vike-packages)

import express from 'express'
import compression from 'compression'
import { renderPage } from 'vike/server'
import { root } from './root.js'
import dbConfig from './dbConfig.js';
import fs from 'fs'
import mysql from "mysql2/promise"

const isProduction = process.env.NODE_ENV === 'production'
// app
const app = express()

// leagueName
let lgName = "";

// db connection
const pool = mysql.createPool(dbConfig);

startServer()

async function insertNewRow(tableName: string, columns: string[], values: string[], res: express.Response) {
  let columnsQuery = columns[0];
  let valuesQuery = "?";
  if (columns.length === 0 || values.length === 0){
    res.status(200).send("I can't guess columns bro");
    return;
  } else if (columns.length != values.length){
    res.status(200).send("Are you restarted?");
    return;
  }
  for (let i = 1; i < columns.length; i++){
    columnsQuery += ", " + columns[i];
    valuesQuery += ", ?";
  }
  try {
    const connection = await pool.getConnection();
    const query = `
      INSERT INTO ${tableName} (${columnsQuery})
      VALUES (${valuesQuery});`;

    // Provide actual values for your columns
    const [rows] = await connection.execute(query, values);
    console.log('New row inserted:', rows);

    connection.release(); // Release the connection
  } catch (error) {
    console.log(error);
    res.status(200).send(error);
    return;
  }
  res.status(200).send('League inserted successfully!');
}

async function query(tableName: string, columns: string, condition: string, res: express.Response) {
  try {
    const connection = await pool.getConnection();
    const query = `
      SELECT ${columns} FROM ${tableName}
      WHERE (${condition});`;

    // Provide actual values for your columns
    const [rows] = await connection.execute(query);
    console.log(rows);
    connection.release(); // Release the connection
    res.json({ ligas: rows });
  } catch (error) {
    console.log(error);
    res.status(200).send(error);
    return;
  }
}

async function cleanQuery(tableName: string, columns: string, res: express.Response) {
  try {
    const connection = await pool.getConnection();
    const query = `
      SELECT ${columns} FROM ${tableName}
    `;

    // Provide actual values for your columns
    const [rows] = await connection.execute(query);
    connection.release(); // Release the connection
    res.json({ ligas: rows });
  } catch (error) {
    console.log(error);
    res.status(200).send(error);
    return;
  }
}

async function startServer() {
  app.use(compression());
  app.use(express.json());

  // Vite integration
  if (isProduction) {
    // In production, we need to serve our static assets ourselves.
    // (In dev, Vite's middleware serves our static assets.)
    const sirv = (await import('sirv')).default
    app.use(sirv(`${root}/dist/client`))
  } else {
    // We instantiate Vite's development server and integrate its middleware to our server.
    // ⚠️ We instantiate it only in development. (It isn't needed in production and it
    // would unnecessarily bloat our production server.)
    const vite = await import('vite')
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true }
      })
    ).middlewares
    app.use(viteDevMiddleware)
  }

  app.get('/get-page-mode', (req, res) => {
    const data = fs.readFileSync('data.json', 'utf8');
    const { mode, leagueName } = JSON.parse(data);
    res.json({ pageMode: mode, leagueName: leagueName });
  });
  
  app.post('/get-ligas', (req, res) => {
    const { table, columns } = req.body;
    cleanQuery(table, columns, res);
  });

  app.post('/update-page-mode', (req, res) => {
    const { mode, leagueName } = req.body;
    const existingData = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

    switch (mode){
      case 1:
        lgName = "";
        break;
      case 2:
        lgName = leagueName;
        break;
    }

    existingData.mode = mode;
    existingData.leagueName = lgName;

    fs.writeFileSync('data.json', JSON.stringify(existingData, null, 2));
    
    res.status(200).send('Page mode updated successfully!');
  });

  app.post('/insert-league', (req, res) => {
    insertNewRow("Ligas", ["nombre", "esta_activa"], [req.body.nombreLiga, 1], res);
  });

  // ...
  // Other middlewares (e.g. some RPC middleware such as Telefunc)
  // ...

  // Vike middleware. It should always be our last middleware (because it's a
  // catch-all middleware superseding any middleware placed after it).
  app.get('*', async (req, res, next) => {
    const pageContextInit = {
      urlOriginal: req.originalUrl
    }
    const pageContext = await renderPage(pageContextInit)
    if (pageContext.errorWhileRendering) {
      // Install error tracking here, see https://vike.dev/errors
    }
    const { httpResponse } = pageContext
    if (!httpResponse) {
      return next()
    } else {
      const { body, statusCode, headers, earlyHints } = httpResponse
      if (res.writeEarlyHints) res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) })
      headers.forEach(([name, value]) => res.setHeader(name, value))
      res.status(statusCode)
      // For HTTP streams use httpResponse.pipe() instead, see https://vike.dev/streaming
      res.send(body)
    }
    
  })

  const port = process.env.PORT || 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
