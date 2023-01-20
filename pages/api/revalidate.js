import { handleRestRequest, CustomError } from 'lib/handleRestRequest'
import { config } from 'config/config'

const DOMAINS_ALLOWED_LIST = [`localhost:${config.serverPort}`, (new URL(config.appUrl)).host]

export default (req, res) => handleRestRequest(async (req, res) => {
  if (!DOMAINS_ALLOWED_LIST.includes(req.headers.host)) throw new CustomError('Request not authorized', 401, { host: req.headers.host })
  switch (req.method) {
    case 'POST':
      await revalidatePagePath(req, res)
      break
    default:
      throw new CustomError('Method not allowed', 405)
  }
}, { req, res })

// https://vercel.com/docs/concepts/next.js/incremental-static-regeneration#using-on-demand-revalidation
const revalidatePagePath = async (req, res) => {
  const { path } = req.body
  // Use asPath e.g. '/blog/post-1'
  await res.revalidate(path)
  return res.json({ revalidated: true })
}
