module.exports = {
  siteMetadata: {
    title: `The Mush`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
  ],
}
