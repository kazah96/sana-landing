import React, { Component } from "react"
import VideoThumb from "../components/video-thumbnail"
import cn from "classnames"

import { Link, graphql } from "gatsby"
import "./style.css"
import Layout from "../components/layout"
import Loader from "../components/loader"

function sortVideos(edges) {
  return edges.sort((a, b) => {
    if (a.node.orderby > b.node.orderby) return 1
    if (a.node.orderby < b.node.orderby) return -1
    return 0
  })
}

const videoExtension = "webm"

class Portfolio extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loadedCount: {},
      images: props.data.allFile.edges.reduce((acc, next) => {
        const { node } = next

        if (!acc[node.name]) {
          acc[node.name] = {}
        }

        const fileext =
          node.extension === videoExtension ? videoExtension : "img"

        return {
          ...acc,
          [node.name]: { ...acc[node.name], [fileext]: node.publicURL },
        }
      }, {}),
    }
  }

  getVideoWebmImg = video => {
    const localImage = this.state.images[video.local_image_name]
    if (localImage) {
      return [localImage.webm, localImage.img]
    }

    return [video.image_url, video.image_url]
  }

  onHasLoaded = id => {
    const loadedCount = this.state.loadedCount
    this.setState({ loadedCount: { ...loadedCount, [id]: true } })
  }

  render() {
    const videos = sortVideos(this.props.data.allStrapiVideo.edges)

    const isLoading = Object.keys(this.state.loadedCount).length < videos.length
    const thumbClass = cn("thumbnails-container", {
      hide: isLoading,
    })

    return (
      <Layout>
        {isLoading && <Loader />}
        <div className={thumbClass}>
          {videos.map(({ node: item }, idx) => {
            const [webm, img] = this.getVideoWebmImg(item)

            return (
              <Link key={`${idx}${item.title}`} to={`/videos/${item.title}`}>
                <VideoThumb
                  onHasLoaded={this.onHasLoaded}
                  id={idx}
                  imgUrl={img}
                  webmUrl={webm}
                  name={item.title}
                />
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
          local_image_name
          video_url
          image_url
          orderby
          local_image_name
        }
      }
    }
  }
`
