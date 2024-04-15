import React from "react";

const Header = () => {
  return (
    <header>
      <div className="title_container">
        <h1 style={{ flex: 1, fontSize: 26 }}>LIGA ELECTRICARIBE</h1>
      </div>
      <div
        className="go_to_admin"
        onClick={() => {
          window.location.href = "/admin";
        }}
      >
        <p>Aministrar</p>
      </div>
    </header>
  );
};

export default Header;
