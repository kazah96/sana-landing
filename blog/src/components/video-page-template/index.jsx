/* eslint-disable jsx-a11y/iframe-has-title */
import React, { PureComponent } from "react"
import "./style.css"
import Layout from "../layout"

class VideoPage extends PureComponent {
  componentDidMount() {
    document.title = this.props.title || 'Video';
  }

  render() {
    const { title, description, video_url } = this.props.pathContext

    console.log(this.props)
    return (
      <Layout>
        <div>{description}</div>
        <iframe
          className="video"
          src={video_url}
          frameborder="0"
          allowfullscreen
        ></iframe>
      </Layout>
      // eslint-disable-next-line jsx-a11y/iframe-has-title
    )
  }
}

export default VideoPage
