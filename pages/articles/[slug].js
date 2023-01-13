import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { convertDates } from 'lib/data/firebase'
import { articleObject } from 'hooks/useArticles'

import ArticleDetails from 'components/articles/ArticleDetails'

function ArticleDetailsPage ({ article }) {
  // Note: 'query' contains both /:params and ?query=value from url
  const { query } = useRouter()
  return (
    <>
      {article && (
        <ArticleDetails
          article={article}
        />
      )}

      <h2>Routing</h2>
      <p>Current query: <strong>{JSON.stringify(query)}</strong></p>

      <ul>
        <li><Link legacyBehavior href='/'><a>Home</a></Link></li>
      </ul>
    </>
  )
}

export default ArticleDetailsPage

const getArticleProps = async (slug) => {
  const articleId = slug.split('-').pop()
  const article = convertDates(await articleObject(articleId))
  return {
    article,
    title: article.title,
    description: article.content || null
  }
}

// SSG
export async function getStaticProps ({ params: { slug }, locale = 'en' }) {
  return {
    props: await getArticleProps(slug),
    revalidate: 10 * 60 // Refresh page every 10 minutes
  }
}

export async function getStaticPaths ({ locales }) {
  // const paths = (await articlesCollection()).map(article => ({ params: { slug: getArticleSlug(article) }, locale: 'en' }))
  return {
    paths: [
      // { params: { propNameThatMustBePartOfFolderStructure: 'value' }, locale: 'en' }
    ],
    fallback: true // true → build page if missing, false → serve 404
  }
}

// SSR
// export async function getServerSideProps ({ req, res, query: { slug } }) {
//   return {
//     props: await getArticleProps(slug)
//   }
// }
