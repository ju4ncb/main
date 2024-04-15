import { application } from "express";
import { useState } from "react";

interface Props {
  onSubmit(): void;
  onClose(): void;
}

const ModalInnitLeague = ({ onSubmit, onClose }: Props) => {
  const [nombreLiga, setNombreLiga] = useState("");
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let err = false;

    // Insert into database new league
    fetch("/insert-league", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombreLiga: nombreLiga }),
    })
      .then((response) => response.text())
      .then((message) => {
        console.log(message);
        if (message != "League inserted successfully!") {
          err = true;
        }
        if (!err) {
          let data = {
            mode: 2,
            leagueName: nombreLiga,
          };

          onSubmit();

          // Send updated mode to the server
          fetch("/update-page-mode", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          })
            .then((response) => response.text())
            .then((message) => {
              console.log(message);
            })
            .catch((error) => {
              console.error("Error updating page mode:", error);
            });
        } else {
          alert("Ya existe esa liga");
        }
      })
      .catch((error) => {
        console.error("Error inserting new league:", error);
        console.log("mmi");
      });
  }
  return (
    <form className="form-inicio-pagina" onSubmit={handleSubmit}>
      <label>
        <span className="bi bi-x-lg" onClick={onClose} />
        Ingrese un nombre para la liga:
        <input
          className="input_liga"
          type="text"
          name="nombreLiga"
          maxLength={50}
          onChange={(event) => setNombreLiga(event.target.value)}
        />
        <button type="submit">Ingresar</button>
      </label>
    </form>
  );
};

export default ModalInnitLeague;
