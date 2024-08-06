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

const Sitemap = ({ pagePaths }) => {
  return (
    <urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>
      {pagePaths.map((path, index) => <SiteUrl key={index} path={path} />)}
    </urlset>
  )
}

const getPagePaths = async () => {
  return ['/']
}

export async function getServerSideProps ({ res }) { // { req, res, query }
  if (res.write) {
    const pagePaths = await getPagePaths()
    res.setHeader('Content-Type', 'text/xml')
    res.write(
      ReactDOMServer.renderToStaticMarkup(
        <Sitemap
          pagePaths={pagePaths}
        />
      )
    )
    res.end()
  }
  return { props: {} }
}

export default Sitemap
