import React from 'react'

import { config } from '../config/config'

import PageHead from '../components/PageHead'
import Header from '../components/Header'

function Page ({ title, description, path, children }) {
  return (
    <>
      <PageHead
        title={title}
        description={description}
        path={path}
      />

      <Header title={config.appName} />

      <main>
        {children}
      </main>
    </>
  )
}

export default Page
