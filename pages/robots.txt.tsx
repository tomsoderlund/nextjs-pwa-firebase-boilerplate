import { NextPage, GetServerSidePropsContext } from 'next'
import { config } from '../config/config'

const robotsTxt = `# robotstxt.org

User-agent: *

Sitemap: ${config.appUrl as string}sitemap.xml`

const RobotsTxt: NextPage = () => null

export async function getServerSideProps ({ res }: GetServerSidePropsContext): Promise<{ props: any }> {
  if (res !== undefined) {
    res.setHeader('Content-Type', 'text/plain')
    res.write(robotsTxt)
    res.end()
  }
  return { props: {} }
}

export default RobotsTxt
