import React from 'react'
import Router from 'next/router'
import Link from 'next/link'

// Import global CSS files here
import 'bootstrap/dist/css/bootstrap.min.css';

// import { config } from 'config/config'

import PageHead from 'components/page/PageHead'
import Header from 'components/page/Header'
import Notifications from 'components/page/Notifications'
import { googlePageview } from 'components/page/GoogleAnalytics'

Router.events.on('routeChangeComplete', path => googlePageview(path))

const MyApp = ({ Component, pageProps, router }) => {
  // props (Server + Client): Component, err, pageProps, router
  const { title, description } = pageProps
  return (
    <>
      <PageHead
        title={title}
        description={description}
        path={router.asPath}
      />

      <Header />

      <main>
        <Component
          {...pageProps}
          {...router}
        />
      </main>

      <Notifications />
    </>
  )
}

export default MyApp
