import React from 'react'
import Router from 'next/router'
import Link from 'next/link'

// Import global CSS files here
import 'node_modules/aether-css-framework/dist/aether.min.css'
import 'public/app.css'

// import { config } from 'config/config'

import PageHead from 'components/page/PageHead'
// import Header from 'components/page/Header'
import Footer from 'components/page/Footer'
import Notifications from 'components/page/Notifications'
import { googlePageview } from 'components/page/GoogleAnalytics'

Router.events.on('routeChangeComplete', path => googlePageview(path))

const MyApp = ({ Component, pageProps, router }) => {
  // props (Server + Client): Component, err, pageProps, router
  return (
    <>
      <PageHead
        {...pageProps}
        path={router.asPath}
      />

      {/*
      <Header
        title={config.appName}
      />
 */}

      <main>
        <Component
          {...pageProps}
          {...router}
        />
      </main>

      <Footer />

      <Link legacyBehavior href='/'><a className='button circle-menu-button'><img src='/icons/menu.svg' alt='Menu' /></a></Link>
      <button className='circle-menu-button right'><img src='/icons/person.svg' alt='User' /></button>
      <button className='circle-menu-button bottom right'><img src='/icons/help.svg' alt='Help' /></button>

      <Notifications />
    </>
  )
}
export default MyApp
