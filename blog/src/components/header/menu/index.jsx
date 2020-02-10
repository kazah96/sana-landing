import React, { PureComponent } from 'react'
import './style.css'
import { Link } from 'gatsby'

class Menu extends PureComponent {
  render() {
    const { links } = this.props

    return (
      <React.Fragment>
        <nav>
          <ul>
            {links.map(({ title, url }) => {
              return (
                <li key={title}>
                  <Link className="link" activeClassName="selected" to={url}>
                    {title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </React.Fragment>
    )
  }
}

export default Menu
