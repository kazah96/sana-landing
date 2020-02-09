import React, { PureComponent } from "react"
import VideoThumb from "../components/video-thumbnail"

import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

class Portfolio extends PureComponent {

  render() {
    console.log(this.props)
    return (
      <Layout>
        <div>
          {this.props.data.allStrapiVideo.edges.map(({node: item}) => {
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
        }
      }
    }
  }
`
