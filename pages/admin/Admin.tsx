import { useState, useEffect } from "react";
import HeaderAdmin from "../../components/HeaderAdmin";
import CuerpoAdmin from "../../components/CuerpoAdmin";
import ModalInnitLeague from "../../components/ModalInnitLeague";

// Si el estado es 1, no ha empezado la liga
// Si el estado es 2, esta en progreso la liga
// Si el estado es 3, ya terminó la liga

function App() {
  const [estadoInicio, setEstadoInicio] = useState(0);
  const [InnitLiga, setInnitLiga] = useState(false);
  const [ChooseLiga, setChooseLiga] = useState(false);
  useEffect(() => {
    // Fetch initial page mode from the server
    fetch("/get-page-mode")
      .then((response) => response.json())
      .then((data) => {
        setEstadoInicio(data.pageMode);
      })
      .catch((error) => console.error("Error fetching page mode:", error));
  }, []);

  const handleChangePageMode = (mode: number) => {
    switch (mode) {
      case 1:
        break;
      case 2:
        toggleModalInnitLeague();
        break;
      case 3:
        console.log("eat shit");
      case 4:
        toggleModalChooseLeague();
    }
  };

  const toggleModalInnitLeague = () => {
    setInnitLiga(true);
  };

  const toggleModalChooseLeague = () => {
    setChooseLiga(true);
  };

  const modeChange = (newMode: number) => {
    // Update local state
    setEstadoInicio(newMode);

    // Send updated mode to the server
    fetch("/update-page-mode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageMode: newMode }),
    })
      .then((response) => response.text())
      .then((message) => console.log(message))
      .catch((error) => console.error("Error updating page mode:", error));
  };

  return (
    <>
      <HeaderAdmin
        estadoInicio={estadoInicio}
        onChangePageMode={handleChangePageMode}
      />
      <div className="contenedor_inicio">
        <CuerpoAdmin estadoInicio={estadoInicio} />
        {InnitLiga && (
          <ModalInnitLeague
            onSubmit={() => {
              modeChange(2);
              setInnitLiga(false);
            }}
            onClose={() => {
              setInnitLiga(false);
            }}
          />
        )}
        {ChooseLiga && (
          <ModalInnitLeague
            onSubmit={() => {
              modeChange(2);
              setInnitLiga(false);
            }}
            onClose={() => {
              setInnitLiga(false);
            }}
          />
        )}
      </div>
    </>
  );
}

export default App;
