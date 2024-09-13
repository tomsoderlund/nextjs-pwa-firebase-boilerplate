import React from 'react'
import type { GetStaticPropsContext, GetStaticPropsResult, GetStaticPathsContext, GetStaticPathsResult } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { convertDates } from 'lib/data/firebase'
import { Article, articleObject } from 'hooks/useArticles'

import { PageProps } from 'components/page/PageHead'
import ArticleDetails from 'components/articles/ArticleDetails'

interface ArticleDetailsPageParams extends ParsedUrlQuery {
  slug: string
}

interface ArticleDetailsPageProps extends PageProps {
  article: Article
}

function ArticleDetailsPage ({ article }: ArticleDetailsPageProps): React.ReactElement {
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

const getArticlePageProps = async (slug: string): Promise<ArticleDetailsPageProps> => {
  const articleId = slug.split('-').pop()
  const article = convertDates(await articleObject(articleId as string)) as Article
  return {
    article,
    title: article.name,
    description: article.content
  }
}

// SSG
export async function getStaticProps ({ params }: GetStaticPropsContext<ArticleDetailsPageParams>): Promise<GetStaticPropsResult<ArticleDetailsPageProps>> {
  // if (article === undefined) {
  //   return { notFound: true }
  // }
  return {
    props: await getArticlePageProps(params?.slug as string),
    revalidate: 10 * 60 // Refresh page every 10 minutes
  }
}

export async function getStaticPaths (context: GetStaticPathsContext): Promise<GetStaticPathsResult<ArticleDetailsPageParams>> {
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
//     props: await getArticlePageProps(slug)
//   }
// }
