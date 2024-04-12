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
        <p className="green" onClick={() => handleModeChange(2)}>
          Iniciar liga
        </p>
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
      <i
        className={
          listState
            ? "bi bi-list list_icon list_icon_opened"
            : "bi bi-list list_icon"
        }
        style={{ fontSize: 42 }}
        onClick={() => changeListState()}
      ></i>
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
