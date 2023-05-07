/**
 * articles module
 * @description Hooks for manipulating articles data

Two different hooks: 1) one for lists of articles, and 2) one for a specific article (commented out by default).

How to use the first:

Wrap your component/page with the ArticlesContextProvider.
NOTE: must be wrapped on higher level than where useArticles is used.

  import { ArticlesContextProvider } from 'hooks/useArticles'

  <ArticlesContextProvider
    articles={articles}
    onError={showErrorNotification}
  >
    ...
  </ArticlesContextProvider>

Then to use (“consume”) inside component or hook:

  import { useArticles } from 'hooks/useArticles'

  const { articles, addArticle } = useArticles()
  await addArticle(data)

 */

import React, { createContext, useContext, useState, useEffect } from 'react'

import { firebase, firebaseDB, docWithId, getCollectionItems } from 'lib/data/firebase'
import toSlug from 'lib/toSlug'
import makeRestRequest from 'lib/makeRestRequest'

// Tip: if you don’t need SSR, you can move these inside the ArticlesContextProvider and create “chains” of child Firebase collections that depend on their parents
// Collection/Item as Firebase references
export const articlesCollectionRef = () => firebaseDB.collection('articles')
export const articleRef = (articleId) => articlesCollectionRef().doc(articleId)

// Collection/Item as objects
export const articlesCollection = () => getCollectionItems(articlesCollectionRef()) // Add .orderBy('dateCreated') to sort by date but only rows where dateCreated exists

export const articleObject = async (articleId) => {
  const articleSnapshot = await articleRef(articleId).get()
  if (!articleSnapshot.exists) {
    const notFoundError = new Error(`Not found: ${articleId}`)
    notFoundError.code = 'ENOENT'
    throw notFoundError
  }
  return docWithId(articleSnapshot)
}

export const getArticleSlug = (article) => `${toSlug(article.title)}-${article.id}`

export const articlePath = (article) => {
  return {
    href: `/articles/${getArticleSlug(article)}`
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
    () => articlesCollectionRef().onSnapshot(snapshot => articlesCollection().then(setArticles)),
    []
  )

  // Refresh SSG cache
  const revalidateArticle = async (article) => {
    await makeRestRequest('/api/revalidate', { path: articlePath(article).href }, { method: 'POST' })
  }

  // addArticle(variables)
  const addArticle = async (variables) => {
    // if (props.onError) props.onError('An error happened!')
    const valuesWithTimestamp = { ...variables, dateCreated: firebase.firestore.FieldValue.serverTimestamp() }

    // Create new article with a generated key
    const newArticleRef = await articlesCollectionRef().add(valuesWithTimestamp)

    // // Create new article with a specified key
    // const articleId = toSlug(variables.title)
    // const newArticleRef = articleRef(articleId)
    // await newArticleRef.set(valuesWithTimestamp)

    // Update client-side state
    const newArticleSnapshot = await newArticleRef.get()
    const newArticleWithId = docWithId(newArticleSnapshot)
    setArticles([
      ...articles,
      newArticleWithId
    ])
    // Refresh SSG cache
    revalidateArticle(newArticleWithId)
    return newArticleWithId
  }

  // updateArticle(variables)
  const updateArticle = async (variables) => {
    const { id, dateCreated, ...values } = variables
    const valuesWithTimestamp = { ...values, dateUpdated: firebase.firestore.FieldValue.serverTimestamp() }
    await articleRef(id).update(valuesWithTimestamp) // will merge data – use set() to overwrite
    // Update client-side state
    const articleSnapshot = await articleRef(id).get()
    const articleWithId = docWithId(articleSnapshot)
    setArticles(articles.map(article => article.id === id ? articleWithId : article))
    // Refresh SSG cache
    revalidateArticle(articleWithId)
    return articleWithId
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
