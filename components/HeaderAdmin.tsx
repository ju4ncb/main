import Nav from "./Nav";

interface Props {
  estadoInicio: number;
  onChangePageMode(pageMode: number): void;
}

const Header = ({ estadoInicio, onChangePageMode }: Props) => {
  return (
    <header>
      <div className="home_container">
        <i
          className="bi bi-house-fill"
          style={{ fontSize: 34 }}
          onClick={() => {
            window.location.href = "/";
          }}
        />
      </div>
      <div className="title_container">
        <h1 style={{ fontSize: 26 }}>LIGA ELECTRICARIBE</h1>
      </div>
      <Nav estadoInicio={estadoInicio} onChangePageMode={onChangePageMode} />
    </header>
  );
};

export default Header;
