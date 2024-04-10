import { useState, useEffect } from "react";
import Header from "../../components/Header";
import InicioCuerpo from "../../components/InicioCuerpo";

// Si el estado es 1, no ha empezado la liga
// Si el estado es 2, esta en progreso la liga
// Si el estado es 3, ya terminó la liga

function App() {
  const [estadoInicio, setEstadoInicio] = useState(1);

  useEffect(() => {
    // Fetch initial page mode from the server
    fetch("/get-page-mode")
      .then((response) => response.json())
      .then((data) => setEstadoInicio(data.pageMode))
      .catch((error) => console.error("Error fetching page mode:", error));
  }, []);

  const handleModeChange = (newMode: number) => {
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
      <Header estadoInicio={estadoInicio} onChangePageMode={handleModeChange} />
      <div className="contenedor_inicio">
        <InicioCuerpo estadoInicio={estadoInicio}></InicioCuerpo>
      </div>
    </>
  );
}

console.log("puta");

export default App;
