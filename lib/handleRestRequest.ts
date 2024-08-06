import type { NextApiRequest, NextApiResponse } from 'next'

type ActionFunction = (req: NextApiRequest, res: NextApiResponse) => Promise<void>

interface RequestAndResponse {
  req: NextApiRequest
  res: NextApiResponse
}

/** handleRestRequest(async () => {...}, { req, res }) */
export const handleRestRequest = async function handleRestRequest (actionFunction: ActionFunction, { req, res }: RequestAndResponse): Promise<void> {
  try {
    await actionFunction(req, res)
  } catch (error: any) {
    const reference = `E${Math.round(1000 * Math.random())}`
    const { message, status = 400 }: CustomError = error
    console.error(`[${reference}] Error ${status ?? ''}: “${message ?? ''}” –`, error)
    if (!isNaN(status)) res.status(status)
    res.json({ status, message, reference })
  }
}

// From: https://levelup.gitconnected.com/the-definite-guide-to-handling-errors-gracefully-in-javascript-58424d9c60e6
/** throw new CustomError(`Account not found`, 404) */
export class CustomError extends Error {
  status?: number

  constructor (message: string, status: number, metadata?: Record<string, any>) {
    super(message)
    Object.setPrototypeOf(this, CustomError.prototype)
    Error.captureStackTrace?.(this, CustomError)
    this.status = status
  }
}
