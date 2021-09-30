require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
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
        icon: `src/images/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: "gatsby-source-custom-api",
      options: {
        url: {
          development: process.env.GATSBY_API_URL_AUTHORS,
        },
        rootKey: "authors",
        schemas: {
          authors: `
          id: Int
          name: String
                    `,
        },
      },
    },
    {
      resolve: "gatsby-source-custom-api",
      options: {
        url: {
          development: process.env.GATSBY_API_URL_COURSES,
        },
        rootKey: "courses",
        schemas: {
          courses: `
          id: Int
          title: String
          authorId: Int
          category: String
                    `,
        },
      },
    },
  ],
}
