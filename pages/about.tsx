/*
  Don't forget to add to next.config.js:

  images: {
    domains: ['www.tomsoderlund.com']
  },
*/
import React from 'react'
import Image from 'next/image'

import { PageProps } from 'components/page/PageHead'
import { config } from 'config/config'

const AboutPage: React.FC<PageProps> = ({ title }) => {
  return (
    <div className='about'>
      <div className='column'>
        <Image
          src='https://www.tomsoderlund.com/images/tomsoderlund_pink.jpg'
          alt='Tom Söderlund'
          width={150}
          height={150}
          className='avatar'
        />
        <div>
          <h1>{title}</h1>
          <p>
            I created <strong>{config.appName}</strong> because I’ve always been passionate about building fast,
            modern web apps using the best technology out there. This project combines the power of React Hooks,
            Firebase as a backend, and the flexibility of Next.js for SSG or SSR—all to make lightning-fast apps
            entirely in JavaScript.
          </p>
          <p>
            As a compulsive maker and someone constantly exploring new ways to build impactful projects,
            I wanted a streamlined, flexible template that could handle everything from e-commerce sites to
            digital media platforms. It’s a solution born from my experience working as a CTO and full-stack
            developer at sustainability-focused startups.
          </p>
          <p>
            You might find my other projects interesting too.
            For example, my <a href='https://www.tomsoderlund.com/articles' target='_blank' rel='noopener noreferrer'>startup and AI blog</a>,
            or my web and mobile apps at <a href='https://www.tomorroworld.com/#projects' target='_blank' rel='noopener noreferrer'>Tomorroworld</a>.
          </p>
          <p>
            If you’re curious to learn more or collaborate,
            feel free to email me or check out <a href='https://www.tomorroworld.com/' target='_blank' rel='noopener noreferrer'>Tomorroworld</a> for a deeper
            dive into my world of projects, ranging from AI to sustainability tech.
          </p>
        </div>
      </div>
      <style jsx>{`
        .about {
          padding: 2rem;
          margin: auto;
          max-width: 800px;
        }
        .column {
          display: flex;
          align-items: flex-start;
        }
        .about :global(.avatar) {
          border-radius: 50%;
          margin-right: 1.5rem;
        }
        a {
          font-weight: bold;
        }

        @media (max-width: 600px) {
          .column {
            flex-direction: column;
          }
          .about :global(.avatar) {
            border-radius: 50%;
            margin: 0 auto 1em;
          }
        }
      `}
      </style>
    </div>
  )
}
export default AboutPage

export const getStaticProps = async () => {
  return {
    props: {
      title: 'About'
    }
  }
}
