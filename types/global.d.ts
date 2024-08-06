declare module 'react-toastify'

declare global {
  interface Window {
    gtag: (event: string, action: string, options: any) => void
  }
}
