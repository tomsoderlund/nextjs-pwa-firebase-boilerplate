const packageJson = require('package.json')
const manifest = require('public/manifest.json')

const serverPort = process.env.PORT || 3004

const completeConfig = {

  default: {
    serverPort,
    appSlug: packageJson.name,
    appUrl: process.env.NEXT_PUBLIC_APP_URL,
    appName: manifest.name,
    appTagline: manifest.description,
    appDescription: manifest.description,
    locale: 'en_US',
    googleAnalyticsId: 'UA-XXXXXXX-X',
    googleSiteVerification: false
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
