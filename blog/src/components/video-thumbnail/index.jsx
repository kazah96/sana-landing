import React, { PureComponent } from "react"
import "./style.css"
import PropTypes from "prop-types"
import Layout from "../layout"

class Header extends PureComponent {
  static propTypes = {
    imgUrl: PropTypes.string,
    name: PropTypes.string,
  }

  render() {
    return (
      <span className="thumbnail">
        <img src={this.props.imgUrl} alt="" className="img" />
        <div className="label">{this.props.name}</div>
      </span>
    )
  }
}

export default Header
