interface Props {
  comboboxOculto: boolean;
  onClickVerTabla(): void;
  opciones: JSX.Element[];
}

const ComboboxInicio = ({
  comboboxOculto,
  onClickVerTabla,
  opciones,
}: Props) => {
  return (
    <div
      className={
        !comboboxOculto ? "contenedor_combobox" : "contenedor_combobox oculto"
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
        <button onClick={!comboboxOculto ? onClickVerTabla : () => {}}>
          Ver tabla
        </button>
      </div>
    </div>
  );
};

export default ComboboxInicio;
