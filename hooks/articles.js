import React, { createContext, useContext, useState, useEffect } from 'react'

import { firebase, firebaseDB, docWithId, getCollectionItems } from 'lib/firebase'
import toSlug from 'lib/toSlug'

// Tip: if you don’t need SSR, you can move these inside the ArticlesContextProvider and create “chains” of child Firebase collections that depend on their parents
export const articlesCollection = () => firebaseDB.collection('articles')
export const articleRef = (articleId) => articlesCollection().doc(articleId)

const getArticleSlug = (article) => `${toSlug(article.title)}-${article.id}`

export const articlePath = (article) => {
  return {
    href: `/articles/[slug]?slug=${getArticleSlug(article)}`,
    as: `/articles/${getArticleSlug(article)}`
  }
}

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

  // addArticle(variables)
  const addArticle = async (variables) => {
    // if (props.onError) props.onError('An error happened!')
    const valuesWithTimestamp = { ...variables, dateCreated: firebase.firestore.FieldValue.serverTimestamp() }

    // Create new article with a generated key
    const newArticleRef = await articlesCollection().add(valuesWithTimestamp)

    // // Create new article with a specified key
    // const newArticleRef = articleRef(articleId)
    // await newArticleRef.set(valuesWithTimestamp)

    // Update client-side state
    const newArticleSnapshot = await newArticleRef.get()
    setArticles([
      ...articles,
      docWithId(newArticleSnapshot)
    ])
    return docWithId(newArticleSnapshot)
  }

  // updateArticle(variables)
  const updateArticle = async (variables) => {
    const { id, ...values } = variables
    const valuesWithTimestamp = { ...values, dateUpdated: firebase.firestore.FieldValue.serverTimestamp() }
    await articleRef(id).update(valuesWithTimestamp)
    // Update client-side state
    const articleSnapshot = await articleRef(id).get()
    setArticles(articles.map(article => article.id === id ? docWithId(articleSnapshot) : article))
    return docWithId(articleSnapshot)
  }

  // deleteArticle(variables)
  const deleteArticle = async (variables) => {
    const { id } = variables
    await articleRef(id).delete()
    // Update client-side state
    setArticles(articles.filter(article => article.id !== id))
    return variables
  }

  // Make the context object (i.e. the “API” for Articles)
  const articlesContext = {
    articles,
    addArticle,
    updateArticle,
    deleteArticle
  }
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
  const [article, setArticle] = useState(props.article)

  const thisArticleRef = useMemo(
    () => articleRef(props.article.id),
    [props.article.id]
  )

  // Real-time updates from Firebase
  useEffect(
    () => thisArticleRef && thisArticleRef.onSnapshot(snapshot => setArticle(docWithId(snapshot))),
    [thisArticleRef]
  )

  // updateArticle(variables)
  const updateArticle = async (variables) => {
  }

  // deleteArticle(variables)
  const deleteArticle = async (variables) => {
  }

  // Make the context object (i.e. the “API” for Article)
  const articleContext = {
    article,
    updateArticle,
    deleteArticle
  }
  // Pass the value in Provider and return
  return <ArticleContext.Provider value={articleContext}>{props.children}</ArticleContext.Provider>
}

export const { Consumer: ArticleContextConsumer } = ArticleContext

export const useArticle = () => useContext(ArticleContext)
*/
