const packageJson = require('../package.json')
const manifest = require('../public/manifest.json')

const appSlug = 'nextjs-pwa-graphql-sql'
const serverPort = process.env.PORT || 3004

const completeConfig = {

  default: {
    serverPort,
    appSlug,
    appUrl: process.env.APP_URL,
    appName: manifest.name,
    appTagline: 'Best web app boilerplate ever',
    appDescription: packageJson.description,
    locale: 'en_US',
    googleAnalyticsId: 'UA-XXXXXXX-X',
    googleSiteVerification: false,
    databaseUrl: process.env.DATABASE_URL
  },

  development: {
    appUrl: `http://localhost:${serverPort}/`,
    googleAnalyticsId: null
  },

  production: {
  }

}

// Public API
module.exports = {
  config: { ...completeConfig.default, ...completeConfig[process.env.NODE_ENV] },
  completeConfig
}
