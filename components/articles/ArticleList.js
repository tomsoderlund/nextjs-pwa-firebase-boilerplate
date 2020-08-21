import React, { useState } from 'react'

import createNotification from 'lib/createNotification'
import { useArticles } from 'hooks/articles'

import ArticleListItem from './ArticleListItem'

const DEFAULT_INPUTS = { title: '' }

const useAddArticleForm = () => {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS)
  const { addArticle } = useArticles()
  const [inProgress, setInProgress] = useState(false)

  const handleSubmit = async (event) => {
    if (event) event.preventDefault()
    setInProgress(true)
    createNotification('Creating new article...')
    await addArticle({ variables: { ...inputs, content: 'This is the article content.' } })
    // Clear input form when done
    setInputs(DEFAULT_INPUTS)
    setInProgress(false)
  }

  const handleInputChange = (event) => {
    event.persist()
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }))
  }

  return { inputs, inProgress, handleInputChange, handleSubmit }
}

const AddArticleForm = () => {
  const { inputs, inProgress, handleInputChange, handleSubmit } = useAddArticleForm()
  return (
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

      <button
        type='submit'
        className='primary'
        disabled={inProgress}
      >
        Add article
      </button>

      <style jsx>{`
        form {
          margin-top: 1em
        }
      `}
      </style>
    </form>
  )
}

const ArticleList = () => {
  const { articles } = useArticles()

  if (!articles) return 'Loading...'

  return (
    <>
      {articles && articles.map(article => (
        <ArticleListItem
          key={article.id}
          article={article}
        />
      ))}

      <AddArticleForm />
    </>
  )
}
export default ArticleList
