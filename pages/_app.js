import React from 'react'
import Router from 'next/router'

import 'react-toastify/dist/ReactToastify.min.css'

import { googlePageview } from 'components/GoogleAnalytics'

Router.events.on('routeChangeComplete', path => googlePageview(path))

const MyApp = ({ Component, pageProps, router }) => {
  // this.props (Server + Client): Component, err, pageProps, router
  return (
    <Component
      {...pageProps}
      {...router}
    />
  )
}
export default MyApp
