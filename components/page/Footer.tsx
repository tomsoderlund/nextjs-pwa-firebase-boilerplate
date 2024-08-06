import React from 'react'
// import Link from 'next/link'

import { config } from 'config/config'

const Footer = (): React.ReactElement => (
  <footer>
    <TomorroworldLogo />
    <span>
      {/*
        <Link href='/about'><a>About</a></Link>
        {' | '}
        <Link href='/projects'><a>Sign in</a></Link>
        {' | '}
    */}
      {config.appName} is an early access product from <a href='http://www.tomorroworld.com' target='_blank' rel='noopener noreferrer'>Tomorroworld</a>
      {' | '}
      <a href={`mailto:contact+${config.appSlug as string}@tomorroworld.com`} target='_blank' rel='noopener noreferrer'>Contact</a>
    </span>
    <style jsx>{`
      :global(main) {
        margin-bottom: 3em;
      }

      footer {
        color: #777777;
        height: unset;
        padding: 0.5em;
      }

      a {
        color: inherit;
        border-color: inherit;
      }
    `}
    </style>
  </footer>
)
export default Footer

const TomorroworldLogo = (): React.ReactElement => (
  <a href='http://www.tomorroworld.com' target='_blank' rel='noopener noreferrer' className='no-link'>
    <img
      src='https://www.tomorroworld.com/favicon.png'
      alt='Tomorroworld'
      title='Tomorroworld'
    />
    <style jsx>{`
      a {
        margin-right: 0.5em;
        border-bottom: none;
        line-height: 0;
      }
      img {
        width: 20px;
        height: 20px;
        border-radius: 2px;
      }
    `}
    </style>
  </a>
)
