import React, { PureComponent } from "react";
import "./style.css";

import Menu from "./menu";

class Header extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <header className="header">
          <h2 className="name">SVNV</h2>
          <h4 className="sub-name">Filmmaker</h4>
          <Menu />
        </header>
      </React.Fragment>
    );
  }
}

export default Header;
