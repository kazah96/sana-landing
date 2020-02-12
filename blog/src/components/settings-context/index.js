import React from "react"
import { graphql, StaticQuery } from "gatsby"

const SettingsContext = React.createContext()

export { SettingsContext }
export const Consumer = SettingsContext.Consumer

export const themes = {
  desktop: "desktop",
  mobile: "mobile",
}

function getConfig(queryQlResult) {
  return queryQlResult.allStrapiConfig.edges.reduce((acc, next) => {
    return { ...acc, [next.node.key]: next.node.value }
  }, {})
}

export class Provider extends React.Component {
  state = { theme: "dark" }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query settingsProviderQuery {
            allStrapiConfig {
              edges {
                node {
                  id
                  key
                  value
                }
              }
            }
          }
        `}
        render={data => {
          const settings = getConfig(data)

          return (
            <SettingsContext.Provider value={{ ...this.state, ...settings }}>
              {this.props.children}
            </SettingsContext.Provider>
          )
        }}
      ></StaticQuery>
    )
  }
}
