import React, { PureComponent } from 'react'
import './style.css'
import Layout from '../layout'
import SEO from '../seo'

class VideoPageTemplate extends PureComponent {
  render() {
    const { title, description, video_url } = this.props.pathContext

    return (
      <React.Fragment>
        <SEO lang="en" title={title} description={description} />
        <Layout>
          <div className="video-page-container">
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
          </div>
        </Layout>
      </React.Fragment>
    )
  }
}

export default VideoPageTemplate
