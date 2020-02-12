import React, { Component } from "react"
import "./style.css"
import PropTypes from "prop-types"

class VideoThumbnail extends Component {
  static propTypes = {
    imgUrl: PropTypes.string,
    gifUrl: PropTypes.string,
    name: PropTypes.string,
    defaultActive: PropTypes.bool,
    showGif: PropTypes.bool,
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
    const style = {
      opacity:
        (this.state.isActive || this.props.defaultActive) && this.props.showGif
          ? "1"
          : "0",
    }

    return (
      <span
        className="thumbnail"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <img src={this.props.gifUrl} className="img gif" style={style} />
        <img src={this.props.imgUrl} alt="" className="img pic" />
        <div className="label">{this.props.name}</div>
      </span>
    )
  }
}

export default VideoThumbnail
