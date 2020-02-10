import React, { PureComponent } from "react"
import "./style.css"
import Layout from "../layout"

class VideoPage extends PureComponent {
  componentDidMount() {
    document.title = this.props.pathContext.title || "Video"
  }

  render() {
    const { title, description, video_url } = this.props.pathContext

    return (
      <Layout>
        <iframe
          title={title}
          className="video"
          width="800px"
          height="400px"
          src={video_url}
          allow="autoplay; fullscreen"
          frameborder="0"
          allowfullscreen
        ></iframe>
        <div className="video-description">{description}</div>
      </Layout>
    )
  }
}

export default VideoPage
