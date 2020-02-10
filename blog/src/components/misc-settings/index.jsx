import React, { PureComponent } from "react"
import PropTypes from "prop-types"

import ReactDOM from "react-dom"

class Settings extends PureComponent {
  constructor(props) {
    super(props)

    if (typeof document !== "undefined") {
      this.el = document.createElement("div")
    }

    this.state = {
      values: { ...props.settings },
    }
  }
  static propTypes = {
    settings: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string,
      })
    ),
    onChange: PropTypes.func,
  }

  componentDidMount() {
    const modalRoot = document.getElementById("settings-root")

    modalRoot.appendChild(this.el)
  }

  onChange = e => {
    const values = { ...this.state.values }
    this.setState(
      { values: { ...values, [e.target.name]: e.target.value } },
      () => this.props.onChange(this.state.values)
    )
  }

  getSettings = () => {
    const { settings } = this.props

    return (
      <React.Fragment>
        {Object.keys(settings).map(item => {
          return (
            <div>
              <label>{item}</label>
              <input
                type="text"
                name={item}
                onChange={this.onChange}
                value={this.state.values[item]}
              />
            </div>
          )
        })}
      </React.Fragment>
    )
  }

  render() {
    if (typeof document !== "undefined") {
      return ReactDOM.createPortal(this.getSettings(), this.el)
    } else return null
  }
}

export default Settings
