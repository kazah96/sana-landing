const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(
    `src/components/video-page-template/index.jsx`
  )
  const articleTemplate = path.resolve(
    `src/components/article-template/index.jsx`
  )
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  return graphql(
    `
      query loadPagesQuery($limit: Int!) {
        allStrapiArticle {
          edges {
            node {
              id
              title
              url
              content
            }
          }
        }
        allStrapiVideo(limit: $limit) {
          edges {
            node {
              title
              video_url
              description
            }
          }
        }
      }
    `,
    { limit: 1000 }
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    result.data.allStrapiArticle.edges.forEach(({ node }) => {
      createPage({
        // Path for this page — required
        path: `/${node.url || node.title}`,
        component: articleTemplate,
        context: {
          ...node,
        },
      })
    })
    // Create blog post pages.
    result.data.allStrapiVideo.edges.forEach(({ node }) => {
      createPage({
        // Path for this page — required
        path: `/videos/${node.title}`,
        component: blogPostTemplate,
        context: {
          ...node,
        },
      })
    })
  })
}
