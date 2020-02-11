import React, { Component } from "react"
import "./style.css"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

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
    return (
      <span
        className="thumbnail"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {this.state.isActive && (
          <img src={this.props.gifUrl} alt="" className="img" />
        )}
        <img src={this.props.imgUrl} alt="" className="img" />
        <div className="label">{this.props.name}</div>
      </span>
    )
  }
}

export default VideoThumbnail
