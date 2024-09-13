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

import { collection, doc, getDoc, setDoc, updateDoc, deleteDoc, Timestamp, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { firebaseDB, docWithId, getDocumentItem, getCollectionItems, FirestoreDoc } from 'lib/data/firebase'
import toSlug from 'lib/toSlug'
import makeRestRequest from 'lib/makeRestRequest'

export interface Article extends FirestoreDoc {
  id?: string
  name: string
  dateCreated: Timestamp
  dateUpdated?: Timestamp
}

// Tip: if you don’t need SSR, you can move these inside the ArticlesContextProvider and create “chains” of child Firebase collections that depend on their parents
// Collection/Item as Firebase references
export const articlesCollectionRef = () => collection(firebaseDB, 'articles')
export const articleRef = (articleId: string) => doc(firebaseDB, 'articles', articleId)

// Collection/Item as objects
export const articlesCollection = async (): Promise<Article[]> => await getCollectionItems(articlesCollectionRef()) as Article[] // Add .orderBy('dateCreated') to sort by date but only rows where dateCreated exists

export const articleObject = async (articleId: string) => {
  const projRef = await articleRef(articleId)
  return await getDocumentItem(projRef)
}

export const getArticleSlug = (article: Article) => article.id

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
    const unsubscribe = onSnapshot(collection(firebaseDB, 'articles'), (snapshot) => {
      const filteredArticles = snapshot.docs
        .map(docWithId)
        // .filter((article) => (article.ownerUserId === user?.uid) || isAdmin)
      setArticles(filteredArticles as Article[])
    })
    return () => unsubscribe()
  }, [])

  const revalidateArticle = async (article: Article) => {
    await makeRestRequest('POST', '/api/revalidate', { path: articlePath(article).href })
  }

  const createArticle = async (variables: Partial<Article>) => {
    const valuesWithTimestamp = { ...variables, dateCreated: serverTimestamp() }

    const articleId = toSlug(variables.title)
    const newArticleRef = articleRef(articleId)
    await setDoc(newArticleRef, valuesWithTimestamp)

    const newArticleSnapshot = await getDoc(newArticleRef)
    const newArticleWithId: Article = docWithId(newArticleSnapshot) as Article
    setArticles([...articles, newArticleWithId])
    revalidateArticle(newArticleWithId)
    return newArticleWithId
  }

  const updateArticle = async (variables: Partial<Article>) => {
    const { id, dateCreated, ...values } = variables
    const valuesWithTimestamp = { ...values, dateUpdated: serverTimestamp() }
    await updateDoc(articleRef(id as string), valuesWithTimestamp)
    const articleSnapshot = await getDoc(articleRef(id as string))
    const articleWithId: Article = docWithId(articleSnapshot) as Article
    setArticles(articles?.map((article) => (article.id === id ? articleWithId : article)))
    revalidateArticle(articleWithId)
    return articleWithId
  }

  const deleteArticle = async (articleId: string) => {
    await deleteDoc(articleRef(articleId))
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
