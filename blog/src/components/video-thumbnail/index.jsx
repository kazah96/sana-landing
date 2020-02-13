import React, { PureComponent } from "react"
import "./style.css"
import PropTypes from "prop-types"
import cn from "classnames"

class VideoThumbnail extends PureComponent {
  video = React.createRef()
  
  timer = setInterval(() => {
    this.checkReady()
  }, 700)

  static propTypes = {
    id: PropTypes.number,
    imgUrl: PropTypes.string,
    webmUrl: PropTypes.string,
    name: PropTypes.string,
    defaultActive: PropTypes.bool,
    showGif: PropTypes.bool,
  }
  state = {
    isActive: false,
  }

  checkReady = () => {
    const vid = this.video.current
    if (vid) {
      if (vid.readyState > 3) this.props.onHasLoaded(this.props.id)

      clearInterval(this.timer)
    }
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

  onLoad = () => {
    this.checkReady()
  }

  render() {
    const { imgUrl, webmUrl, name } = this.props

    const thumbClass = cn("thumbnail")

    return (
      <span
        className={thumbClass}
        role="link"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        tabIndex={0}
      >
        <video
          ref={this.video}
          onError={() => this.props.onHasLoaded(this.props.id)} /* Костыль для того чтоб на айфоне лоадер отрабатывал нормально. Нужно пофиксить в дальнейшем*/
          onCanPlayThrough={this.onLoad}
          onCanPlay={this.onLoad}
          loop={true}
          poster={imgUrl}
          muted={true}
          className="img"
        >
          <source src={webmUrl} />
          <source src={imgUrl} /> {/* Костыль для того чтоб на айфоне лоадер отрабатывал нормально. Нужно пофиксить в дальнейшем*/}
        </video>
        <div className="label">{name}</div>
      </span>
    )
  }
}

export default VideoThumbnail
