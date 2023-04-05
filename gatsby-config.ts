import type { GatsbyConfig } from 'gatsby';

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    author: `Daniel Jackson`,
    title: `Mongo Source Error`,
    siteUrl: `https://localhost:8000`,
  },

  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',

    {
      resolve: `gatsby-plugin-sass`,
      options: {
        additionalData: '@import "utilities";',
        sassOptions: {
          includePaths: ['./src/styles'],
        },
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Mongo Source Error',
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#e3e3e3`,
        display: `minimal-ui`,
        crossOrigin: `use-credentials`,
        icon: 'src/images/favicon.png',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: `gatsby-source-mongodb`,
      options: {
        dbName: process.env.MONGODB_DB,
        collection: [`submissions`, `students`, `projects`],
        server: {
          address: process.env.MONGODB_ADDRESS,
          port: process.env.MONGODB_PORT,
        },
        auth: {
          user: process.env.MONGODB_USER,
          password: process.env.MONGODB_PASS,
        },
        preserveObjectIds: `true`,
      },
    },
  ],
};

export default config;
