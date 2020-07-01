import React from 'react'
import { config } from '../config/config'

const robotsTxt = `# robotstxt.org

User-agent: *

Sitemap: ${config.appUrl}sitemap.xml`

export default class Sitemap extends React.Component {
  static getInitialProps ({ res }) {
    res.setHeader('Content-Type', 'text/plain')
    res.write(robotsTxt)
    res.end()
  }
}
