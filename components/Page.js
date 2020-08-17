import React from 'react'
import { ToastContainer } from 'react-toastify'

import { config } from 'config/config'

import PageHead from 'components/PageHead'
import Header from 'components/Header'

function Page ({ title, description, path, children }) {
  return (
    <>
      <PageHead
        title={title}
        description={description}
        path={path}
      />

      <Header
        title={config.appName}
      />

      <main>
        {children}
      </main>

      <ToastContainer />

      <style jsx>{`
        :global(.Toastify__toast) {
          border-radius: 0.5em;
          box-shadow: 0 0.2em 0.4em rgba(0,0,0, 0.3);
          padding: 0.8em;
          font-family: 'Inter', sans-serif;
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

export default Page
