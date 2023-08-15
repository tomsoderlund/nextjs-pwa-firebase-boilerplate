import { handleRestRequest, CustomError } from 'lib/handleRestRequest'
import { config } from 'config/config'

const DOMAINS_WHITELIST = [`http://localhost:${config.serverPort}`, config.appUrl.slice(0, -1)]
const SLACK_WEBHOOK = 'https://hooks.slack.com/services/TTUFA...'

export default (req, res) => handleRestRequest(async (req, res) => {
  switch (req.method) {
    case 'POST':
      await createSlackNotification(req, res)
      break
    default:
      throw new CustomError('Method not allowed', 405)
  }
}, { req, res })

const createSlackNotification = async (req, res) => {
  if (!DOMAINS_WHITELIST.includes(req.headers.host)) throw new CustomError('Request not authorized', 401, { origin: req.headers.origin })
  const { email = '?', id = '?', requestType = 'Firebase login' } = req.body
  const text = `New ${requestType} for ${config.appName}: ${email} (#${id})`
  const results = await postToSlack({ text })
  res.statusCode = 200
  res.json({ results })
}

function postToSlack ({ text }) {
  return fetch(SLACK_WEBHOOK, { // eslint-disable-line no-undef
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
}
