const path = require(`path`)
const { getSlugUrl } = require('./src/utils/url')

const fs = require("fs")
const ffmpeg = require("ffmpeg")

const videoExtension = ".webm"
const webmFolder = "video-thumbs/webm"
const imgFolder = "video-thumbs/pic"

if (!fs.existsSync(webmFolder)) fs.mkdirSync(webmFolder)
if (!fs.existsSync(imgFolder)) fs.mkdirSync(imgFolder)

fs.readdir(webmFolder, (err, files) => {
  files.forEach(file => {
    if (path.extname(file) === videoExtension) {
      const filename = file.slice(0, -5)
      console.log(filename)

      new ffmpeg(path.join(webmFolder, file)).then(video => {
        video.fnExtractFrameToJPG(imgFolder, {
          frame_rate: 1,
          number: 1,
          file_name: filename,
        })
      })
    }
  })
})

exports.onPostBootstrap = () => {
  fs.readdir(imgFolder, (err, files) => {
    files.forEach(file => {
      const ext = path.extname(file)
      const filename = file.slice(0, -ext.length)
      const res = /(\w+)_\d/.exec(filename)

      if (res) {
        fs.renameSync(
          path.join(imgFolder, file),
          path.join(imgFolder, `${res[1]}${ext}`)
        )
      }
    })
  })
}

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
      const slug = node.url || node.title;

   
      createPage({
        // Path for this page — required
        path: `/${slug}`,
        component: articleTemplate,
        context: {
          ...node,
        },
      })
    })
    // Create blog post pages.
    result.data.allStrapiVideo.edges.forEach(({ node }) => {
      const slugUrl = getSlugUrl(node.title)

      createPage({
        // Path for this page — required
        path: `/videos/${slugUrl}`,
        component: blogPostTemplate,
        context: {
          ...node,
        },
      })
    })
  })
}
