import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { Navbar, Container } from 'react-bootstrap';

import { config } from 'config/config'
import { showErrorNotification } from 'lib/showNotification'
import { articlesCollectionObjects, ArticlesContextProvider } from 'hooks/articles'
import useUser from 'hooks/useUser'

import LoginForm from 'components/user/LoginForm'
import ArticleList from 'components/articles/ArticleList'

function ArticleListPage ({ articles }) {
  // Note: 'query' contains both /:params and ?query=value from url
  const { query } = useRouter()
  const { user } = useUser()

  if(user) {
    return (
        <Container>
            <p><strong>{user.email}</strong></p>
        </Container>
      )
  } else {
    return (
      <Container>
      <h1>Login</h1>

      <LoginForm />
    </Container>
    )
  }
}

export default ArticleListPage

// SSG
export async function getStaticProps ({ params, locale = 'en' }) {
  const articlesRaw = await articlesCollectionObjects()
  const articles = articlesRaw.map(article => ({
    ...article,
    // To avoid “cannot be serialized as JSON” error:
    dateCreated: article.dateCreated ? article.dateCreated.toString() : null,
    dateUpdated: article.dateUpdated ? article.dateUpdated.toString() : null
  }))
  return {
    props: {
      articles
    },
    revalidate: 60 // Seconds. This refresh time could be longer depending on how often data changes.
  }
}


// SSR
// export async function getServerSideProps ({ req, res, query: { slug } }) {
//   return {
//     articles
//   }
// }
