import React, { PureComponent } from 'react'
import ReactMarkdown from 'react-markdown'
import './style.css'

import Layout from '../layout'

class ArticleTemplate extends PureComponent {

  render() {

    const { title, content } = this.props.pathContext

    return (
      <Layout>
        <ReactMarkdown className="markdown-field" source={content} />
      </Layout>
    )
  }
}

export default ArticleTemplate
