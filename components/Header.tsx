import Nav from "./Nav";

interface Props {
  estadoInicio: number;
  onChangePageMode(pageMode: number): void;
}

const Header = ({ estadoInicio, onChangePageMode }: Props) => {
  return (
    <header>
      <h1 style={{ flex: 1, fontSize: 26 }}>LIGA ELECTRICARIBE</h1>
      <Nav estadoInicio={estadoInicio} onChangePageMode={onChangePageMode} />
    </header>
  );
};

export default Header;
