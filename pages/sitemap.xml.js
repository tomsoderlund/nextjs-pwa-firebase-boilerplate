import React from 'react'
import ReactDOMServer from 'react-dom/server'

import { config } from '../config/config'
import formatDate from '../lib/formatDate'

const Sitemap = () => {
  const getDate = () => formatDate(new Date())
  const pages = ['/']
  return (
    <urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>
      {pages.map((path, index) => (
        <url key={index}>
          <loc>{config.appUrl}{path.substr(1)}</loc>
          <lastmod>{getDate()}</lastmod>
        </url>
      ))}
    </urlset>
  )
}

Sitemap.getInitialProps = async ({ res }) => { // { req, res, pathname, asPath, query }
  if (res.write) {
    res.setHeader('Content-Type', 'text/xml')
    res.write(
      ReactDOMServer.renderToStaticMarkup(
        <Sitemap />
      )
    )
    res.end()
  }
  return {}
}

export default Sitemap
