import React from 'react'
import Link from 'next/link'

import { config } from '../config/config'

import Page from '../components/Page'
// import ArticleList from '../components/articles/ArticleList'

function StartPage ({ query, asPath }) {
  // Note: 'query' contains both /:params and ?query=value from url
  return (
    <Page
      title={undefined}
      path={asPath}
    >
      <h1>{config.appName}</h1>

      <p><em>{config.appTagline}</em></p>

      {/* <ArticleList /> */}

      <h2>Routing</h2>
      <p>Current query: <strong>{JSON.stringify(query)}</strong></p>

      <ul>
        <li><Link href='/'><a>Home</a></Link></li>
        <li><Link href='/articles/other-1'><a>Other route</a></Link></li>
      </ul>

      <p>Get the <a target='_blank' rel='noopener noreferrer' href='https://github.com/tomsoderlund/nextjs-pwa-firebase-boilerplate'>source code for nextjs-pwa-firebase-boilerplate</a></p>
    </Page>
  )
}

export default StartPage
