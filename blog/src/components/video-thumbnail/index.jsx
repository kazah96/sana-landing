import React, { PureComponent } from "react"
import "./style.css"
import PropTypes from "prop-types"

class Header extends PureComponent {
  static propTypes = {
    imgUrl: PropTypes.string,
    name: PropTypes.string,
    width: PropTypes.number,
  }

  static defaultProps = {
    width: 1,
  }

  render() {
    return (
      <span className="thumbnail" style={{ width: `${this.props.width}px` }}>
        <img src={this.props.imgUrl} alt="" className="img" />
        <div className="label">{this.props.name}</div>
      </span>
    )
  }
}

export default Header
