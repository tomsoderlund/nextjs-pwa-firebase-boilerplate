/** handleRestRequest(async () => {...}, { req, res }) */
module.exports.handleRestRequest = async function handleRestRequest (actionFunction, { req, res }) {
  try {
    await actionFunction(req, res)
  } catch (error) {
    const reference = `E${Math.round(1000 * Math.random())}`
    const { message, status = 400 } = error
    console.error(`[${reference}] Error ${status}: “${message}” –`, error)
    if (!isNaN(status)) res.status(status)
    res.json({ status, message, reference })
  }
}

// From: https://levelup.gitconnected.com/the-definite-guide-to-handling-errors-gracefully-in-javascript-58424d9c60e6
/** throw new CustomError(`Account not found`, 404) */
module.exports.CustomError = class CustomError extends Error {
  constructor (message, status) {
    super(message)
    if (Error.captureStackTrace) Error.captureStackTrace(this, CustomError)
    this.status = status
  }
}
