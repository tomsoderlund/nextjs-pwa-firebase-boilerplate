import React from 'react'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Notifications = () => {
  return (
    <>
      <ToastContainer />

      <style jsx>{`
        :global(.Toastify__toast) {
          border-radius: 0.5em;
          box-shadow: 0 0.2em 0.4em rgba(0,0,0, 0.3);
          padding: 0.8em;
          background-color: #EDF1F7;
          color: black;
        }
        :global(.Toastify__toast--success) {
          background-color: #D6FFC8;
          color: black;
        }
        :global(.Toastify__toast--warning) {
          background-color: #FFFBE6;
          color: white;
        }
        :global(.Toastify__toast--error) {
          background-color: #FFF1F0;
          color: white;
        }
      `}
      </style>
    </>
  )
}
export default Notifications
