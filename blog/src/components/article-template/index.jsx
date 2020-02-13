import React, { PureComponent } from 'react'
import ReactMarkdown from 'react-markdown'
import './style.css'
import SEO from '../seo'
import Layout from '../layout'

class ArticleTemplate extends PureComponent {
  render() {
    const { content, title } = this.props.pathContext

    return (
      <>
        <SEO lang="en" title={title} description={content.slice(0, 40)} />
        <Layout>
          <ReactMarkdown className="markdown-field" source={content} />
        </Layout>
      </>
    )
  }
}

export default ArticleTemplate
