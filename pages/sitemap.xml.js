import React from 'react'
import ReactDOMServer from 'react-dom/server'

import { config } from 'config/config'
import formatDate from 'lib/formatDate'

const SiteUrl = ({ path }) => {
  const getDate = () => formatDate(new Date())
  return (
    <url>
      <loc>{config.appUrl}{path.substr(1)}</loc>
      <lastmod>{getDate()}</lastmod>
    </url>
  )
}

const Sitemap = () => {
  const allPaths = ['/']
  return (
    <urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>
      {allPaths.map((path, index) => <SiteUrl key={index} path={path} />)}
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
