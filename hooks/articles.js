import React, { createContext, useState, useContext, useEffect } from 'react'

import { firebase, firebaseDB, docWithId, getCollectionItems } from 'lib/firebase'

export const articlesCollection = () => firebaseDB.collection('articles')
export const articleRef = (articleId) => articlesCollection().doc(articleId)

// Example: extending the database with Comments
// export const commentsCollection = (articleId) => articleRef(articleId).collection('comments')
// export const commentRef = (articleId, commentId) => commentsCollection(articleId).doc(commentId)

// ----- Articles collection -----

export const ArticlesContext = createContext()

export const ArticlesContextProvider = (props) => {
  // Use State to keep the values. Initial values are obtained from ArticlesContextProvider’s props.
  const [articles, setArticles] = useState(props.articles)

  // Real-time updates from Firebase
  useEffect(
    () => articlesCollection().onSnapshot(snapshot => getCollectionItems(articlesCollection()).then(setArticles)),
    []
  )

  // addArticle({ variables })
  const addArticle = async ({ variables }) => {
    const variablesWithTimestamp = { ...variables, dateCreated: firebase.firestore.FieldValue.serverTimestamp() }

    // Create new with a generated key
    const newArticleRef = await articlesCollection().add(variablesWithTimestamp)

    // // Create new with a specified key
    // const newArticleRef = articleRef(articleId)
    // await newArticleRef.set(variablesWithTimestamp)

    // Update client-side state
    const newArticleSnapshot = await newArticleRef.get()
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
