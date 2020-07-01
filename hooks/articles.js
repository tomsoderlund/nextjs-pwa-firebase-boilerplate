import React, { createContext, useState, useContext } from 'react'

import { firebaseDB, docWithId } from '../lib/firebase'

export const ArticlesContext = createContext()

export const ArticlesContextProvider = (props) => {
  // Use State to keep the values. Initial values are obtained from ArticlesContextProvider’s props.
  const [articles, setArticles] = useState(props.articles)

  // addArticle({ variables })
  const addArticle = async ({ variables }) => {
    const newArticleRef = await firebaseDB.collection('articles').add(variables)
    const newArticleSnapshot = await newArticleRef.get()
    setArticles([
      ...articles,
      docWithId(newArticleSnapshot)
    ])
    return newArticleRef
  }

  /*
  // { data, loading, error } = useGetArticles()
  export const useGetArticles = () => {
  }

  // const { data, loading, error } = useGetArticle('slug-1')
  export const useGetArticle = (slugAndId) => {
  }

  // updateArticle({ variables })
  export const useUpdateArticle = () => {
  }

  // deleteArticle({ variables })
  export const useDeleteArticle = () => {
  }
  */

  // Make the context object (or array)
  const articlesContext = { articles, addArticle }
  // Pass the value in Provider and return
  return <ArticlesContext.Provider value={articlesContext}>{props.children}</ArticlesContext.Provider>
}

export const { Consumer: ArticlesContextConsumer } = ArticlesContext

export const useArticles = () => useContext(ArticlesContext)
