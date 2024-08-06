import type { NextApiRequest, NextApiResponse } from 'next'

import { handleRestRequest, CustomError } from 'lib/handleRestRequest'
import { config } from 'config/config'

export default async (req: NextApiRequest, res: NextApiResponse) => await handleRestRequest(async (req, res) => {
  if (!config.allowedHostsList?.includes(req.headers.host as string)) throw new CustomError('Request not authorized', 401, { host: req.headers.host })
  switch (req.method) {
    case 'POST':
      await revalidatePagePath(req, res)
      break
    default:
      throw new CustomError('Method not allowed', 405)
  }
}, { req, res })

// https://nextjs.org/docs/pages/building-your-application/rendering/incremental-static-regeneration#using-on-demand-revalidation
const revalidatePagePath = async (req: NextApiRequest, res: NextApiResponse) => {
  const { path } = req.body
  // Use asPath e.g. '/blog/post-1'
  await res.revalidate(path)
  return res.json({ revalidated: true })
}
