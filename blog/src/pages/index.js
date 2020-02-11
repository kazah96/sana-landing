import React, { PureComponent } from "react"
import VideoThumb from "../components/video-thumbnail"

import { Link, graphql } from "gatsby"

import "./style.css"
import Layout from "../components/layout"

class Portfolio extends PureComponent {
  state = {
    images: {},
  }

  componentDidMount() {
    this.setState({
      images: this.props.data.allFile.edges.reduce((acc, next) => {
        const { node } = next

        if (!acc[node.name]) {
          acc[node.name] = {}
        }

        const fileext = node.extension === "gif" ? "gif" : "img"

        return {
          ...acc,
          [node.name]: { ...acc[node.name], [fileext]: node.publicURL },
        }
      }, {}),
    })
  }

  getVideoGifImg = video => {
    const localImage = this.state.images[video.local_image_name]
    if (localImage) {
      return [localImage.gif, localImage.img]
    }

    return [video.image_url, video.image_url]
  }

  render() {
    const videos = this.props.data.allStrapiVideo.edges.sort((a, b) => {
      if (a.node.orderby > b.node.orderby) return 1
      if (a.node.orderby < b.node.orderby) return -1
      return 0
    })

    return (
      <Layout>
        <div className="thumbnails-container">
          {videos.map(({ node: item }, idx) => {
            const [gif, img] = this.getVideoGifImg(item)

            return (
              <Link key={`${item.title}${idx}`} to={`/videos/${item.title}`}>
                <VideoThumb gifUrl={gif} imgUrl={img} name={item.title} />
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
    allFile {
      edges {
        node {
          publicURL
          name
          extension
        }
      }
    }
    allStrapiVideo {
      edges {
        node {
          id
          title
          video_url
          image_url
          orderby
          local_image_name
        }
      }
    }
  }
`
