import React, { PureComponent } from "react"
import VideoThumb from "../components/video-thumbnail"

import { Link, graphql } from "gatsby"

import "./style.css"
import Layout from "../components/layout"

class Portfolio extends PureComponent {
  render() {
    const videos = this.props.data.allStrapiVideo.edges.sort((a, b) => {
      if (a.node.orderby > b.node.orderby) return 1
      if (a.node.orderby < b.node.orderby) return -1
      return 0
    })

    return (
      <Layout>
        <div className="thumbnails-container">
          {videos.map(({ node: item }) => {
            return (
              <Link to={`/videos/${item.title}`}>
                <VideoThumb imgUrl={item.image_url} name={item.title} />
              </Link>
            )
          })}
        </div>
      </Layout>
    )
  }
}

export default Portfolio

export const pageQuery = graphql`
  query PortfolioQuery {
    allStrapiVideo {
      edges {
        node {
          id
          title
          video_url
          image_url
          orderby
        }
      }
    }
  }
`
