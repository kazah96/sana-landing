import React, { PureComponent } from "react"
import "./style.css"
import PropTypes from "prop-types"

class VideoThumbnail extends PureComponent {
  video = React.createRef()

  static propTypes = {
    imgUrl: PropTypes.string,
    webmUrl: PropTypes.string,
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

  onMouseEnter = () => {
    const vid = this.video.current
    if (vid) {
      vid.play()
    }
  }

  onMouseLeave = () => {
    const vid = this.video.current
    if (vid) {
      vid.pause()
    }
  }

  render() {
    const { imgUrl, webmUrl, name } = this.props

    return (
      <span
        className="thumbnail"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <video ref={this.video} loop poster={imgUrl} muted className="img">
          {webmUrl && <source src={webmUrl} />}
        </video>
        <div className="label">{name}</div>
      </span>
    )
  }
}

export default VideoThumbnail
