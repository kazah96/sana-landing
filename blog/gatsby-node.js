const path = require(`path`)
const fs = require("fs")
const gifFrames = require("gif-frames")

// exports.onPostBootstrap = ({ graphql, actions }) => {
//   console.log("PREBUILD")
//   const r = graphql(
//     `
//       query loadPagesQuery($limit: Int!) {
//         allStrapiVideo(limit: $limit) {
//           edges {
//             node {
//               title
//               video_url
//               description
//             }
//           }
//         }
//       }
//     `,
//     { limit: 1000 }
//   ).then(result => {
//     console.log(result)
//     throw new Error()
//   })

//   const gifFolder = "src/images/video-thumbs/gif"
//   const imgFolder = "src/images/video-thumbs/pic"

//   if (!fs.existsSync(gifFolder)) fs.mkdirSync(gifFolder, { recursive: true })
//   if (!fs.existsSync(imgFolder)) fs.mkdirSync(imgFolder, { recursive: true })

//   fs.readdir(gifFolder, (err, files) => {
//     if (!files) return

//     files.forEach(file => {
//       if (path.extname(file) === ".gif") {
//         const filename = file.slice(0, -4)

//         gifFrames({ url: path.resolve(gifFolder, file), frames: 0 }).then(
//           function(frameData) {
//             frameData[0]
//               .getImage()
//               .pipe(
//                 fs.createWriteStream(path.resolve(imgFolder, `${filename}.jpg`))
//               )
//           }
//         )
//       }
//     })
//   })
// }

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
              ffwe { ... }
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
      console.log(node)
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
