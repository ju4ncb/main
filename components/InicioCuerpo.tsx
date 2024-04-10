interface Props {
  estadoInicio: number;
}

const InicioCuerpo = ({ estadoInicio }: Props) => {
  switch (estadoInicio) {
    case 1:
      return (
        <>
          <div className="inicio_vacio">
            <p>Aún no ha empezado la liga</p>
            <i className="bi bi-boxes"></i>
          </div>
        </>
      );
    default:
      return <></>;
  }
};

export default InicioCuerpo;
