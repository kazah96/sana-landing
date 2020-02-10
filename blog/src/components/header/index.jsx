import React, { PureComponent } from "react"

import cn from "classnames"

import "./style.css"

import Menu from "./menu"
import { Consumer } from "../theming-context"

const defaultLinks = [{ title: "portfolio", url: "/" }]

class HeaderPage extends PureComponent {
  state = { theme: "light" }

  changeTheme = () => {
    if (this.state.theme === "dark") {
      this.setState({ theme: "light" })
      document.documentElement.setAttribute("theme", "light")
    } else {
      document.documentElement.setAttribute("theme", "dark")
      this.setState({ theme: "dark" })
    }
  }

  render() {
    const { title, subtitle, pages, theme, toggleTheme } = this.props

    const links = [
      ...defaultLinks,
      ...pages.map(page => ({ ...page, url: `/${page.url}` })),
    ]

    return (
      <React.Fragment>
        <header className="header">
          <div className={cn("brands", { "brands-dark": theme === "dark" })}>
            <i onClick={this.changeTheme} class="fas fa-adjust"></i>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://t.me/svnvsvg"
            >
              <i class="fab fa-telegram"></i>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/BblCoKa9_AcTma"
            >
              <i class="fab fa-twitter"></i>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://instagram.com/svnvsvg"
            >
              <i class="fab fa-instagram"></i>
            </a>
          </div>
          <h2 className="name" >
            {title}
          </h2>
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
