import React, { PureComponent } from "react";
import "./style.css";
import { Link } from "gatsby";

class Menu extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <nav>
          <ul>
            <li>
              <Link
                className="link"
                activeClassName="selected"
                to="/"
              >
                portfolio
              </Link>
            </li>
            <li>
              <Link className="link" activeClassName="selected" to="/about">
                about
              </Link>
            </li>
            <li>
              <Link
                className="link"
                activeClassName="selected"
                to="/contact"
              >
                contact
              </Link>
            </li>
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}

export default Menu;
