module.exports = {
  siteMetadata: {
    title: `Umirzakov`,
    description: `Filmmaker, vfx artist and creative director based in nur-sultan. `,
    url: 'http://umirzakovs-test.surge.sh/',
    siteUrl: 'http://umirzakovs-test.surge.sh/',
    twitterUsername: '@BblCoKa9_AcTma',
    author: 'autrrr',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-robots-txt',
    {
      resolve: 'gatsby-source-strapi',
      options: {
        // loginData: {
        //   identifier: "aa",
        //   password: "11111111",
        // },
        apiURL: 'http://localhost:1337',
        contentTypes: [
          // List of the Content Types you want to be able to request from Gatsby.
          'user',
          'config',
          'article',
          'video',
        ],
        queryLimit: 1000,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/video-thumbs`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/s.png`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
