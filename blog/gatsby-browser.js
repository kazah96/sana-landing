/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

const React = require("react")
const ThemeProvider = require("./src/components/theming-context").Provider

exports.wrapRootElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it

  const theme = localStorage.getItem('theme');
  document.documentElement.setAttribute('theme', theme || 'light');
  return <ThemeProvider value={'dark'}>{element}</ThemeProvider>
}
