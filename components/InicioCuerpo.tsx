interface Props {
  estadoInicio: number;
}

function checkIfData() {}

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
    case 2:
      return <>pipopipo</>;
    case 3:
      return <>something changed</>;
    default:
      return <></>;
  }
};

export default InicioCuerpo;
