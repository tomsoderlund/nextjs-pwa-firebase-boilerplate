import { config } from '../../config/config'
import isDevelopment from '../../lib/isDevelopment'

declare global {
  interface Window {
    gtag: (event: string, action: string, options: any) => void
  }
}

/* options: { 'page_title' : 'homepage' } */
// See https://developers.google.com/analytics/devguides/collection/gtagjs
export const googlePageview = (path: string, options?: any): void => {
  const completeOptions = Object.assign({}, options, { page_path: path }) // 'page_title' : 'homepage'
  if (config.googleAnalyticsId !== undefined && config.googleAnalyticsId !== null) window.gtag('config', config.googleAnalyticsId, completeOptions)
  if (isDevelopment()) console.log('Google pageview:', { path, options: completeOptions })
}

// options: { 'event_category' : 'bbb', 'event_label' : 'ccc' }
// See https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const googleEvent = (action: string, options?: any): void => {
  if (config.googleAnalyticsId !== undefined) window.gtag('event', action, options)
  if (isDevelopment()) console.log('Google event:', { action, options })
}
