import React, { Component } from "react"
import "./style.css"
import PropTypes from "prop-types"

class VideoThumbnail extends Component {
  static propTypes = {
    imgUrl: PropTypes.string,
    gifUrl: PropTypes.string,
    name: PropTypes.string,
  }
  state = {
    isActive: false,
  }

  onMouseEnter = () => {
    this.setState({ isActive: true })
  }

  onMouseLeave = () => {
    this.setState({ isActive: false })
  }

  render() {
    const style = { display: this.state.isActive ? "inline" : "none" }
    return (
      <span
        className="thumbnail"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <img src={this.props.gifUrl} alt="" className="img" style={style} />
        <img src={this.props.imgUrl} alt="" className="img" />
        <div className="label">{this.props.name}</div>
      </span>
    )
  }
}

export default VideoThumbnail
