import React from 'react'
import Router from 'next/router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { config } from 'config/config'

import PageHead from 'components/page/PageHead'
import Header from 'components/page/Header'
import { googlePageview } from 'components/page/GoogleAnalytics'

Router.events.on('routeChangeComplete', path => googlePageview(path))

const MyApp = ({ Component, pageProps, router }) => {
  // this.props (Server + Client): Component, err, pageProps, router
  const { title, description } = pageProps
  return (
    <>
      <PageHead
        title={title}
        description={description}
        path={router.asPath}
      />

      <Header
        title={config.appName}
      />

      <main>
        <Component
          {...pageProps}
          {...router}
        />
      </main>

      <ToastContainer />

      <style jsx>{`
        :global(.Toastify__toast) {
          border-radius: 0.5em;
          box-shadow: 0 0.2em 0.4em rgba(0,0,0, 0.3);
          padding: 0.8em;
          background-color: lemonchiffon;
          color: black;
        }
        :global(.Toastify__toast--success) {
          background-color: greenyellow;
          color: black;
        }
        :global(.Toastify__toast--warning) {
          background-color: darkorange;
          color: white;
        }
        :global(.Toastify__toast--error) {
          background-color: tomato;
          color: white;
        }
      `}
      </style>
    </>
  )
}
export default MyApp
