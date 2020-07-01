import React from 'react'

import { useGetArticles, useAddArticle } from '../../graphql/article/hooks'
import ArticleListItem from './ArticleListItem'

const useAddArticleForm = () => {
  const [inputs, setInputs] = React.useState({ title: '' })
  const addArticle = useAddArticle()

  const handleSubmit = async (event) => {
    if (event) event.preventDefault()
    if (!inputs.title) {
      window.alert('No title provided')
      return
    }
    await addArticle({ variables: inputs })
    // Clear input form when done
    setInputs({ title: '' })
  }

  const handleInputChange = (event) => {
    event.persist()
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }))
  }

  return { inputs, handleInputChange, handleSubmit }
}

const ArticleList = () => {
  const { inputs, handleInputChange, handleSubmit } = useAddArticleForm()

  const { data, loading, error } = useGetArticles()
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <>
      {data.articles && data.articles.map(article => (
        <ArticleListItem
          key={article.id}
          article={article}
        />
      ))}

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter an article title'
          name='title'
          value={inputs.title}
          onChange={handleInputChange}
        />
        <button type='submit'>Add article</button>
        <style jsx>{`
          form {
            margin-top: 1em
          }
        `}
        </style>
      </form>
    </>
  )
}
export default ArticleList
