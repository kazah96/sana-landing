import React, { PureComponent } from 'react';
import './style.css'

class Header extends PureComponent {
  render() {
    return <section className="content-section">{this.props.children}</section>;
  }
}

export default Header;
