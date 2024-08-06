import React from 'react'
import Link from 'next/link'

import { config } from 'config/config'

const Header = ({ title = config.appName, children }) => (
  <header>
    <AppIcon />
    {title}
    {children}
    <style jsx>{`
      header {
        position: fixed;
        z-index: 1000;
        width: 100%;
        left: 0;
        top: 0;
        height: 50px;
        line-height: 50px;
        font-weight: normal;
        text-align: center;
      }

      :global(main) {
        margin-top: 50px;
        min-height: calc(100vh - 50px);
      }
    `}
    </style>
  </header>
)
export default Header

const AppIcon = () => (
  <Link legacyBehavior href='/'>
    <a className='app-icon' title={config.appName}>
      <img src='/favicon.png' alt={config.appName} />
      <style jsx>{`
        a:hover {
          filter: none;
        }

        img {
          position: absolute;
          left: 10px;
          top: 10px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      `}
      </style>
    </a>
  </Link>
)
