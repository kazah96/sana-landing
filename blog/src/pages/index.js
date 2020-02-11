import React, { PureComponent } from "react"
import VideoThumb from "../components/video-thumbnail"

import { Link, graphql } from "gatsby"

import "./style.css"
import Media from "react-media"
// import Settings from "../components/misc-settings"

import Layout from "../components/layout"

const margin = 4;

const settings = {
  max_plitok_mobile: 1,
  plitka_width_mobile: 450,
  plitka_width_medium: 350,
  plitka_width_large: 550,
}


class Portfolio extends PureComponent {
  state = {
    ...settings
  }

  onSettingsChange = values => {
    this.setState({ ...values })
  }

  render() {
    const videos = this.props.data.allStrapiVideo.edges.sort((a, b) => {
      if (a.node.orderby > b.node.orderby) return 1
      if (a.node.orderby < b.node.orderby) return -1
      return 0
    })

    return (
      <Layout>
        {/* <Settings
          settings={settings}
          onChange={this.onSettingsChange}
        /> */}
        <div className="thumbnails-container">
          <Media
            queries={{
              small: "(max-width: 740px)",
              medium: "(min-width: 741px)",
              large: "(min-width: 1101px)",
            }}
          >
            {matches =>
              videos.map(({ node: item }, index) => {
                let width = item.width || 1;

                if (matches.small) width = this.state.max_plitok_mobile
                if (matches.medium)
                  width = width === 1 ? 1 : index % 2 === 0 ? width - 1 : 1

                let w = this.state.plitka_width_mobile
                if (matches.medium) w = this.state.plitka_width_medium
                if (matches.large) w = this.state.plitka_width_large;

                const qq =
                  parseInt(width) * w +
                  margin * (width - 1)

                return (
                  <Link to={`/videos/${item.title}`}>
                    <VideoThumb
                      imgUrl={item.image_url}
                      name={item.title}
                      width={qq}
                    />
                  </Link>
                )
              })
            }
          </Media>
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
          width
        }
      }
    }
  }
`
