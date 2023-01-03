import { handleRestRequest, CustomError } from 'lib/handleRestRequest'
import { config } from 'config/config'

const DOMAINS_ALLOWED_LIST = [`localhost:${config.serverPort}`, (new URL(config.appUrl)).host]

export default (req, res) => handleRestRequest(async (req, res) => {
  if (!DOMAINS_ALLOWED_LIST.includes(req.headers.host)) throw new CustomError('Request not authorized', 401, { host: req.headers.host })
  switch (req.method) {
    case 'GET':
      await exampleFunction(req, res)
      break
    default:
      throw new CustomError('Method not allowed', 405)
  }
}, { req, res })

const exampleFunction = async (req, res) => {
  try {
    const results = 'Hello World'
    res.statusCode = 200
    res.json({ results })
  } catch (error) {
    throw new CustomError(error.message, 400)
  }
}
