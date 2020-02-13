import React, { PureComponent } from "react"
import VideoThumb from "../components/video-thumbnail"

import { Link, graphql } from "gatsby"
import "./style.css"
import Layout from "../components/layout"
import SEO from "../components/seo"

const pageTitle = "Portfolio"

function sortVideos(edges) {
  return edges.sort((a, b) => {
    if (a.node.orderby > b.node.orderby) return 1
    if (a.node.orderby < b.node.orderby) return -1
    return 0
  })
}

const videoExtension = "webm"

if (typeof document !== "undefined" && typeof window !== "undefined") {
  var body = document.body,
    timer

  window.addEventListener(
    "scroll",
    function() {
      clearTimeout(timer)
      if (!body.classList.contains("disable-hover")) {
        body.classList.add("disable-hover")
      }

      timer = setTimeout(function() {
        body.classList.remove("disable-hover")
      }, 500)
    },
    false
  )
}

class Portfolio extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
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

  render() {
    const videos = sortVideos(this.props.data.allStrapiVideo.edges)

    const thumbClass = "thumbnails-container"

    return (
      <>
        <SEO lang="en" title={pageTitle} description={"Portfolio main page"} />
        <Layout>
          <div className={thumbClass}>
            {videos.map(({ node: item }, idx) => {
              const [webm, img] = this.getVideoWebmImg(item)

              return (
                <Link key={`${idx}${item.title}`} to={`/videos/${item.title}`}>
                  <VideoThumb
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
      </>
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
