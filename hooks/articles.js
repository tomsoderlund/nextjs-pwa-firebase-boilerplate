import React, { createContext, useState, useContext } from 'react'

import { articlesCollection, articleRef, docWithId } from '../lib/firebase'

// ----- Articles collection -----

export const ArticlesContext = createContext()

export const ArticlesContextProvider = (props) => {
  // Use State to keep the values. Initial values are obtained from ArticlesContextProvider’s props.
  const [articles, setArticles] = useState(props.articles)

  // addArticle({ variables })
  const addArticle = async ({ variables }) => {
    const variablesWithTimestamp = { ...variables, dateCreated: Date.now() }
    const newArticleRef = await articlesCollection.add(variablesWithTimestamp)
    const newArticleSnapshot = await newArticleRef.get()
    // Update client-side state
    setArticles([
      ...articles,
      docWithId(newArticleSnapshot)
    ])
    return newArticleRef
  }

  // updateArticle({ variables })
  const updateArticle = async ({ variables }) => {
    const { id, ...values } = variables
    await articleRef(id).update(values)
    const articleSnapshot = await articleRef(id).get()
    // Update client-side state
    setArticles(articles.map(article => article.id === id ? docWithId(articleSnapshot) : article))
    return docWithId(articleSnapshot)
  }

  // deleteArticle({ variables })
  const deleteArticle = async ({ variables }) => {
    const { id } = variables
    await articleRef(id).delete()
    // Update client-side state
    setArticles(articles.filter(article => article.id !== id))
    return variables
  }

  // Make the context object
  const articlesContext = { articles, addArticle, updateArticle, deleteArticle }
  // Pass the value in Provider and return
  return <ArticlesContext.Provider value={articlesContext}>{props.children}</ArticlesContext.Provider>
}

export const { Consumer: ArticlesContextConsumer } = ArticlesContext

export const useArticles = () => useContext(ArticlesContext)

// ----- One Article -----
/*

export const ArticleContext = createContext()

export const ArticleContextProvider = (props) => {
  // Use State to keep the values. Initial values are obtained from ArticleContextProvider’s props.
  const [article] = useState(props.article)

  // const { data, loading, error } = useGetArticle('slug-1')
  const getArticle = async (slugAndId) => {
  }

  // updateArticle({ variables })
  const updateArticle = async ({ variables }) => {
  }

  // deleteArticle({ variables })
  const deleteArticle = async ({ variables }) => {
  }

  // Make the context object
  const articleContext = { article, getArticle, updateArticle, deleteArticle }
  // Pass the value in Provider and return
  return <ArticleContext.Provider value={articleContext}>{props.children}</ArticleContext.Provider>
}

export const { Consumer: ArticleContextConsumer } = ArticleContext

export const useArticle = () => useContext(ArticleContext)
*/
