/* eslint-disable no-undef */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = "https://www.peelthegarlic.com",
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env
const isNetlifyProduction = NETLIFY_ENV === "production"
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

module.exports = {
  siteMetadata: {
    title: `Peel the Garlic`,
    description: `Online recipes with the user in mind.`,
    author: `Braxton Lemmon`,
    siteUrl,
  },
  plugins: [
    "gatsby-plugin-polyfill-io",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "markdown",
        path: `${__dirname}/src/markdown`,
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: "*" }],
          },
          "branch-deploy": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null,
          },
          "deploy-preview": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Peel the Garlic`,
        short_name: `Peel the Garlic`,
        start_url: `/`,
        background_color: `#2f3020`,
        theme_color: `#2f3020`,
        display: `fullscreen`,
        icon: "src/images/garlic_logo.svg",
      },
    },
    {
      resolve: "gatsby-plugin-google-fonts",
      options: {
        fonts: ["Montserrat"],
        display: "swap",
      },
    },
    {
      resolve: "gatsby-plugin-canonical-urls",
      options: {
        siteUrl: "https://www.peelthegarlic.com/",
      },
    },
    {
      resolve: "gatsby-plugin-layout",
      options: {
        component: require.resolve("./src/components/layout.js"),
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-176765666-1",
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        excludes: ["/ThankYou", "/unsubscribe"],
      },
    },
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "bgdyw4m1",
        dataset: "production",
        token: process.env.GATSBY_SANITY_TOKEN,
        watchMode: true,
        overlayDrafts: true,
      },
    },
    "gatsby-plugin-styled-components",
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    "gatsby-plugin-netlify",
    `gatsby-transformer-sharp`,
    "gatsby-transformer-remark",
    `gatsby-plugin-typescript`,
  ],
}
