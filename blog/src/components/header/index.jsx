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
          <div className="brands">
            <a target="_blank" rel="noopener noreferrer" href="https://t.me/svnvsvg">
              <i class="fab fa-telegram"></i>
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/BblCoKa9_AcTma">
              <i class="fab fa-twitter"></i>
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://instagram.com/svnvsvg">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
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
