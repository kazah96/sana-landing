import React, { PureComponent } from "react"

import "./style.css"

import Menu from "./menu"

const defaultLinks = [{ title: "portfolio", url: "/" }]

class HeaderPage extends PureComponent {
  render() {
    const { title, subtitle, pages } = this.props

    const links = [
      ...defaultLinks,
      ...pages.map(page => ({ ...page, url: `/${page.url}` })),
    ]

    return (
      <React.Fragment>
        <header className="header">
          <h2 className="name">{title}</h2>
          <h4 className="sub-name">{subtitle}</h4>
          <Menu links={links} />
        </header>
      </React.Fragment>
    )
  }
}

HeaderPage.defaultProps = {
  title: "SSS",
  subtitle: "DSFSDF",
}

export default HeaderPage
