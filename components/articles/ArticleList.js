import React, { useState } from 'react'

import { useArticles } from '../../hooks/articles'
import ArticleListItem from './ArticleListItem'

const useAddArticleForm = () => {
  const [inputs, setInputs] = useState({ title: '' })
  const { addArticle } = useArticles()
  const [inProgress, setInProgress] = useState(false)

  const handleSubmit = async (event) => {
    if (event) event.preventDefault()
    if (!inputs.title) {
      window.alert('No title provided')
      return
    }
    setInProgress(true)
    await addArticle({ variables: inputs })
    // Clear input form when done
    setInputs({ title: '' })
    setInProgress(false)
  }

  const handleInputChange = (event) => {
    event.persist()
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }))
  }

  return { inputs, inProgress, handleInputChange, handleSubmit }
}

const ArticleList = () => {
  const { articles } = useArticles()
  const { inputs, inProgress, handleInputChange, handleSubmit } = useAddArticleForm()

  if (!articles) return 'Loading...'

  return (
    <>
      {articles && articles.map(article => (
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
          required
          value={inputs.title}
          onChange={handleInputChange}
          disabled={inProgress}
        />

        <button type='submit' disabled={inProgress}>Add article</button>

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
