import { useState } from "react";

interface Props {
  estadoInicio: number;
  onChangePageMode(pageMode: number): void;
}

const NavContent = ({ estadoInicio, onChangePageMode }: Props) => {
  const handleModeChange = (newMode: number) => {
    // Update local state
    onChangePageMode(newMode);
  };

  switch (estadoInicio) {
    case 1:
      return (
        <>
          <p onClick={() => handleModeChange(4)}> Escoger liga </p>
          <p className="green" onClick={() => handleModeChange(2)}>
            Crear liga
          </p>
        </>
      );
    case 2:
      return (
        <>
          <p>Agregar juego</p>
          <p>Agregar jugador</p>
          <p>Agregar encuentro</p>
          <p className="red" onClick={() => handleModeChange(3)}>
            Finalizar liga
          </p>
        </>
      );
    case 3:
      return (
        <p className="green" onClick={() => handleModeChange(1)}>
          Reiniciar liga
        </p>
      );
    default:
      return <></>;
  }
};

const Nav = ({ estadoInicio, onChangePageMode }: Props) => {
  const [listState, setListState] = useState(false);
  function changeListState() {
    if (listState == true) {
      setListState(false);
    } else {
      setListState(true);
    }
  }
  return (
    <div className="nav">
      <div
        className={listState ? "list_icon list_icon_opened" : "list_icon"}
        style={{ fontSize: 42 }}
        onClick={() => changeListState()}
      >
        <i className="bi bi-list"></i>
      </div>
      <div className={listState ? "list_nav show" : "list_nav"}>
        <NavContent
          estadoInicio={estadoInicio}
          onChangePageMode={onChangePageMode}
        />
      </div>
    </div>
  );
};

export default Nav;
