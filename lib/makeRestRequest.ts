import { config } from 'config/config'

export const makeRestRequest = async (method = 'GET', path: string, data?: object, sessionAccessToken?: string): Promise<any> => {
  const completeUrl = config.apiBaseUrl as string + path
  // console.log('makeRestRequest:', { completeUrl, method, path, data, sessionAccessToken })
  return await fetch(
    completeUrl,
    {
      method,
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Auth token
        ...(sessionAccessToken !== undefined && {
          Authorization: `Bearer ${sessionAccessToken ?? ''}`
        })
      },
      body: (data !== undefined) ? JSON.stringify(data) : null
    }
  )
    .then(async (res: Response) => {
      if (!res.ok) {
        const jsonData = await res.json()
        throwError(jsonData, res)
      } else {
        let jsonData: any = {}
        try {
          jsonData = await res.json()
        } catch (error: any) {
          console.warn('Parse JSON:', error?.message ?? error)
        }
        // console.log('*apiResponses.json:\n', JSON.stringify({ method, path, response: jsonData }, null, 2))
        if (jsonData.code?.toLowerCase?.()?.includes('error') === true) throwError(jsonData, res)
        return jsonData
      }
    })
}

export default makeRestRequest

const throwError = (jsonData: any, res: Response): void => {
  const errorMessage = jsonData?.message?.includes('{') === true
    // Variant 1: { message: '{ message }' }
    ? JSON.parse(jsonData?.message)?.message ?? jsonData?.message
    // Variant 2: { errors: [{ message }] }
    : jsonData?.errors?.[0]?.message ??
    // Variant 3: { message }
    jsonData?.message ??
    // Fallback: use HTTP status text
    res.statusText
  throw new Error(errorMessage)
}
