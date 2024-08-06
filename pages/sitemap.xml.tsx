import React from 'react'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { ParsedUrlQuery } from 'querystring'

import { config } from 'config/config'
import { formatDate } from 'lib/formatDate'

interface SiteUrlProps {
  path: string
}

const SiteUrl = ({ path }: SiteUrlProps): string => {
  const getDate = (): string => formatDate(new Date())
  return (
    `<url>
      <loc>${config.appUrl as string}${path.substring(1)}</loc>
      <lastmod>${getDate()}</lastmod>
    </url>`
  )
}

interface SitemapProps {
  pagePaths: string[]
}

const Sitemap = ({ pagePaths }: SitemapProps): string => {
  return (
    `<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>
      ${pagePaths.map((path, index) => <SiteUrl key={index} path={path} />).join('\n')}
    </urlset>`
  )
}

const getPagePaths = async (): Promise<string[]> => {
  return ['/']
}

interface SitemapPageParams extends ParsedUrlQuery {
}

export async function getServerSideProps ({ res }: GetServerSidePropsContext<SitemapPageParams>): Promise<GetServerSidePropsResult<SitemapPageParams>> {
  if (res !== undefined) {
    const pagePaths = await getPagePaths()
    res.setHeader('Content-Type', 'text/xml')
    res.write(
      <Sitemap
        pagePaths={pagePaths}
      />
    )
    res.end()
  }
  return { props: {} }
}

export default Sitemap
