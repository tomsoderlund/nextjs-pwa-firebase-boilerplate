import type { NextApiRequest, NextApiResponse } from 'next'

import { handleRestRequest, CustomError } from 'lib/handleRestRequest'
import { config } from 'config/config'

const SLACK_WEBHOOK = 'https://hooks.slack.com/services/TTUFA...'

export default async (req: NextApiRequest, res: NextApiResponse) => await handleRestRequest(async (req, res) => {
  switch (req.method) {
    case 'POST':
      await createSlackNotification(req, res)
      break
    default:
      throw new CustomError('Method not allowed', 405)
  }
}, { req, res })

const createSlackNotification = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!config.allowedHostsList?.includes(req.headers.host as string)) throw new CustomError('Request not authorized', 401, { origin: req.headers.origin })
  const { email = '?', id = '?', requestType = 'Firebase login' } = req.body
  const text = `New ${requestType} for ${config.appName}: ${email} (#${id})`
  const results = await postToSlack({ text })
  res.statusCode = 200
  res.json({ results })
}

async function postToSlack ({ text }: { text: string }) {
  return await fetch(SLACK_WEBHOOK, { // eslint-disable-line no-undef
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
}
