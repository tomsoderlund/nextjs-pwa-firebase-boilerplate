import { handleRestRequest, CustomError } from 'lib/handleRestRequest'
// import { config } from 'config/config'

// const DOMAINS_ALLOWED_LIST = [`http://localhost:${config.serverPort}`, config.appUrl.slice(0, -1)]

export default (req, res) => handleRestRequest(async (req, res) => {
  switch (req.method) {
    case 'GET':
      await returnSomething(req, res)
      break
    default:
      throw new CustomError('Method not allowed', 405)
  }
}, { req, res })

const returnSomething = async (req, res) => {
  // if (!DOMAINS_ALLOWED_LIST.includes(req.headers.origin)) throw new CustomError('Request not authorized', 401, { origin: req.headers.origin })
  const results = 'Hello World'
  res.statusCode = 200
  res.json({ results })
}
