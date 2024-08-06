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

  const { articles, createArticle } = useArticles()
  await createArticle(data)

 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

import firebase from 'firebase/app'
import { firebaseDB, docWithId, getCollectionItems, FirestoreDoc } from 'lib/data/firebase'
import toSlug from 'lib/toSlug'
import makeRestRequest from 'lib/makeRestRequest'

export interface Article extends FirestoreDoc {
  title: string
  content?: string
  dateCreated: firebase.firestore.Timestamp
  dateUpdated?: firebase.firestore.Timestamp
}

// Tip: if you don’t need SSR, you can move these inside the ArticlesContextProvider and create “chains” of child Firebase collections that depend on their parents
// Collection/Item as Firebase references
export const articlesCollectionRef = () => firebaseDB.collection('articles')
export const articleRef = (articleId: string) => articlesCollectionRef().doc(articleId)

// Collection/Item as objects
export const articlesCollection = async (): Promise<Article[]> => await getCollectionItems(articlesCollectionRef()) as Article[] // Add .orderBy('dateCreated') to sort by date but only rows where dateCreated exists

export const articleObject = async (articleId: string) => {
  const articleSnapshot = await articleRef(articleId).get()
  if (!articleSnapshot.exists) {
    const notFoundError = new Error(`Not found: ${articleId}`);
    (notFoundError as any).code = 'ENOENT'
    throw notFoundError
  }
  return docWithId(articleSnapshot)
}

export const getArticleSlug = (article: Article) => `${toSlug(article.title)}-${article.id}`

export const articlePath = (article: Article) => {
  return {
    href: `/articles/${getArticleSlug(article)}`
  }
}

// Example: extending the database with Comments
// export const commentsCollectionRef = (articleId: string) => articleRef(articleId).collection('comments')
// export const commentRef = (articleId: string, commentId: string) => commentsCollection(articleId).doc(commentId)

// ----- Articles collection -----

interface ArticlesInputProps {
  articles: Article[]
  onError?: (error: string) => void
  children: ReactNode
}

interface ArticlesReturnProps {
  articles?: Article[]
  getArticles: () => Promise<void>
  createArticle: (variables: Partial<Article>) => Promise<Article>
  updateArticle: (variables: Partial<Article>) => Promise<Article>
  deleteArticle: (articleId: string) => Promise<void>
}

const ArticlesContext = createContext<Partial<ArticlesReturnProps>>({})

export const ArticlesContextProvider = (props: ArticlesInputProps) => {
  const [articles, setArticles] = useState<Article[]>(props.articles ?? [])

  useEffect(() => {
    const unsubscribe = articlesCollectionRef().onSnapshot(() => {
      articlesCollection().then((articles) => setArticles(articles))
    })
    return () => unsubscribe()
  }, [])

  const revalidateArticle = async (article: Article) => {
    await makeRestRequest('POST', '/api/revalidate', { path: articlePath(article).href })
  }

  const createArticle = async (variables: Partial<Article>) => {
    const valuesWithTimestamp = { ...variables, dateCreated: firebase.firestore.FieldValue.serverTimestamp() }

    const articleId = getArticleSlug(variables as Article)
    const newArticleRef = articleRef(articleId)
    await newArticleRef.set(valuesWithTimestamp)

    const newArticleSnapshot = await newArticleRef.get()
    const newArticleWithId: Article = docWithId(newArticleSnapshot) as Article
    setArticles([...articles, newArticleWithId])
    revalidateArticle(newArticleWithId)
    return newArticleWithId
  }

  const updateArticle = async (variables: Partial<Article>) => {
    const { id, dateCreated, ...values } = variables
    const valuesWithTimestamp = { ...values, dateUpdated: firebase.firestore.FieldValue.serverTimestamp() }
    await articleRef(id as string).update(valuesWithTimestamp)
    const articleSnapshot = await articleRef(id as string).get()
    const articleWithId: Article = docWithId(articleSnapshot) as Article
    setArticles(articles?.map((article) => (article.id === id ? articleWithId : article)))
    revalidateArticle(articleWithId)
    return articleWithId
  }

  const deleteArticle = async (articleId: string) => {
    await articleRef(articleId).delete()
    setArticles(articles?.filter(article => article.id !== articleId))
  }

  const articlesContext = {
    articles,
    createArticle,
    updateArticle,
    deleteArticle
  }

  return <ArticlesContext.Provider value={articlesContext}>{props.children}</ArticlesContext.Provider>
}

export const useArticles = () => {
  const context = useContext(ArticlesContext)
  if (context == null) {
    throw new Error('useArticles must be used within an ArticlesContextProvider')
  }
  return context
}

// ----- One Article -----
/*

  export const ArticleContext = createContext<{
    article: any;
    updateArticle: (variables: Partial<Article>) => Promise<void>;
    deleteArticle: (variables: Partial<Article>) => Promise<void>;
  } | undefined>(undefined);

  interface ArticleContextProviderProps {
    article: any;
    children: ReactNode;
  }

  export const ArticleContextProvider = (props: ArticleContextProviderProps) => {
    const [article, setArticle] = useState(props.article);

    const thisArticleRef = useMemo(() => articleRef(props.article.id), [props.article.id]);

    useEffect(() => {
      const unsubscribe = thisArticleRef.onSnapshot(snapshot => {
        setArticle(docWithId(snapshot));
      });
      return () => unsubscribe();
    }, [thisArticleRef]);

    const updateArticle = async (variables: Partial<Article>) => {
      // implement update logic here
    };

    const deleteArticle = async (variables: Partial<Article>) => {
      // implement delete logic here
    };

    const articleContext = {
      article,
      updateArticle,
      deleteArticle
    };

    return <ArticleContext.Provider value={articleContext}>{props.children}</ArticleContext.Provider>;
  };

  export const useArticle = () => {
    const context = useContext(ArticleContext);
    if (!context) {
      throw new Error('useArticle must be used within an ArticleContextProvider');
    }
    return context;
  };
  */
