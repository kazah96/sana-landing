/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Consumer } from "./settings-context"

import Header from "./header"
import "./layout.css"

function getConfig(queryQlResult) {
  return queryQlResult.allStrapiConfig.edges.reduce((acc, next) => {
    return { ...acc, [next.node.key]: next.node.value }
  }, {})
}

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      allFile {
        edges {
          node {
            id
          }
        }
      }
      allStrapiArticle {
        edges {
          node {
            id
            content
            url
            title
          }
        }
      }
      allStrapiConfig {
        edges {
          node {
            key
            value
          }
        }
      }
    }
  `)

  const config = getConfig(data)

  const pages = data.allStrapiArticle.edges.map(({ node }) => ({
    ...node,
  }))

  return (
    <Consumer>
      {theme => (
        <>
          <Header
            theme={theme}
            title={config.title}
            width="200px"
            height="200px"
            subtitle={config.subtitle}
            pages={pages}
          />
          <div
            style={{
              margin: `0 auto`,
              padding: `0 1.0875rem 1.45rem`,
            }}
          >
            <main className="main-content">{children}</main>
          </div>
        </>
      )}
    </Consumer>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
