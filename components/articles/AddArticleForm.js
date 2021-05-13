import React, { useState } from 'react'

import showNotification from 'lib/showNotification'
import { useArticles } from 'hooks/articles'

const DEFAULT_INPUTS = { title: '' }

const useAddArticleForm = () => {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS)
  const { addArticle } = useArticles()
  const [inProgress, setInProgress] = useState(false)

  const handleInputChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value
    setInputs({ ...inputs, [target.name]: value })
  }

  const handleSubmit = async (event) => {
    if (event) event.preventDefault()
    setInProgress(true)
    const notificationId = showNotification('Creating new article...')
    await addArticle(inputs)
    // Clear input form when done
    setInputs(DEFAULT_INPUTS)
    setInProgress(false)
    showNotification('Article created', 'success', { notificationId })
  }

  return { inputs, inProgress, handleInputChange, handleSubmit }
}

const AddArticleForm = () => {
  const { inputs, inProgress, handleInputChange, handleSubmit } = useAddArticleForm()
  return (
    <form onSubmit={handleSubmit}>
      <input
        name='title'
        value={inputs.title}
        placeholder='Enter an article title'
        type='text'
        autoComplete='off'
        required
        onChange={handleInputChange}
        disabled={inProgress}
      />

      <button
        type='submit'
        className={'progress-animation' + (inProgress ? ' in-progress' : '')}
        disabled={inProgress}
      >
        Add article
      </button>

      <style jsx>{`
        form {
          margin-top: 1em;
        }
      `}
      </style>
    </form>
  )
}
export default AddArticleForm
