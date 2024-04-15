import { useState, useEffect } from "react";

const Inicio = () => {
  const [comboboxActivo, setComboboxActivo] = useState(true);
  const [opciones, setOpciones] = useState([
    <option key={"it's a beautiful ride"}>Aún no hay na</option>,
  ]);

  function handleClickVerTabla() {
    setComboboxActivo(false);
    setTimeout(() => {
      const comboBox = document.getElementById("contenedorCombobox");
      comboBox?.classList.remove("oculto");
      comboBox?.classList.add("desactivado");
    }, 1000);
  }

  useEffect(() => {
    // Fetch initial page mode from the server
    fetch("/get-ligas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table: "ligas", columns: "nombre, id_liga" }),
    })
      .then((response) => response.json())
      .then((data) => {
        const ligas = data.ligas;
        if (ligas.length === 0) {
          return;
        }
        let tempOpciones = [
          <option value={ligas[0].nombre} key={ligas[0].id_liga}>
            {ligas[0].nombre}
          </option>,
        ];
        for (let i = 1; i < ligas.length; i++) {
          tempOpciones.push(
            <option value={ligas[i].nombre} key={ligas[i].id_liga}>
              {ligas[i].nombre}
            </option>
          );
        }
        setOpciones(tempOpciones);
      })
      .catch((error) => console.error("Error fetching page mode:", error));
  }, []);
  return (
    <main className="inicio_main">
      <div style={{ height: 100 }} />
      <div
        className={
          comboboxActivo ? "contenedor_combobox" : "contenedor_combobox oculto"
        }
        id="contenedorCombobox"
      >
        <div className="cabeza">
          <p>Seleccione una liga:</p>
        </div>
        <div className="cuerpo">
          <select name="ligas" id="ligas">
            {opciones}
          </select>
          <button onClick={comboboxActivo ? handleClickVerTabla : () => {}}>
            Ver tabla
          </button>
        </div>
        <hr style={{ display: "none" }} />
      </div>
    </main>
  );
};

export default Inicio;
