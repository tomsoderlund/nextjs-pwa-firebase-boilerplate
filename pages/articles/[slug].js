import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { docWithId } from 'lib/data/firebase'
import { articleRef } from 'hooks/articles'

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
        <li><Link href='/'><a>Home</a></Link></li>
      </ul>
    </>
  )
}

export default ArticleDetailsPage

const getArticleProps = async (slug) => {
  const articleId = slug.split('-').pop()
  const articleSnapshot = await articleRef(articleId).get()
  if (!articleSnapshot.exists) {
    const notFoundError = new Error(`Not found: ${articleId}`)
    notFoundError.code = 'ENOENT'
    throw notFoundError
  }
  const article = docWithId(articleSnapshot)
  if (article.dateCreated) article.dateCreated = article.dateCreated.toDate().toString() // To avoid “cannot be serialized as JSON” error
  if (article.dateUpdated) article.dateUpdated = article.dateUpdated.toDate().toString()
  return {
    article,
    title: article.title,
    description: article.content || null
  }
}

export async function getStaticProps ({ params: { slug } }) {
  return {
    props: await getArticleProps(slug),
    revalidate: 30
  }
}

export const getStaticPaths = () => ({
  paths: [],
  fallback: true
})

// export async function getServerSideProps ({ req, res, query: { slug } }) {
//   return {
//     props: await getArticleProps(slug)
//   }
// }
