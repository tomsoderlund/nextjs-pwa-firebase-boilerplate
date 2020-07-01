import { firebaseDB } from '../lib/firebase'

// { data, loading, error } = useGetArticles()
export const useGetArticles = () => {
}

// const { data, loading, error } = useGetArticle('slug-1')
export const useGetArticle = (slugAndId) => {
}

// addArticle({ variables })
export const useAddArticle = () => {
  const addArticle = async ({ variables }) => {
    console.log('useAddArticle', { variables })
    const newArticleRef = await firebaseDB.collection('articles').add(variables)
    return newArticleRef
  }
  return addArticle
}

// updateArticle({ variables })
export const useUpdateArticle = () => {
}

// deleteArticle({ variables })
export const useDeleteArticle = () => {
}
