
import {  useMutation, useQueryClient } from 'react-query'
import { addNewAnecdote } from '../services/anecdotes'

import { useContext } from 'react'

import NotificationContext from '../context/NotificationContext'





const AnecdoteForm = () => {
  
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(NotificationContext)


  const errorDispatchAndClear = (errorMessage) => {
    notificationDispatch({
      type: 'UPDATE',
      payload: {
          isError: true,
          displayText: `failed to create - ${errorMessage}`
      }
  })

  setTimeout(() => {
      notificationDispatch({
          type: 'CLEAR'
      })
  }, 5000)
  }

  const createDispatchAndClear = (anecdote) => {
    notificationDispatch({
      type: 'UPDATE',
      payload: {
          isError: false,
          displayText: `successfully created ${anecdote.content}`
      }
  })

  setTimeout(() => {
      notificationDispatch({
          type: 'CLEAR'
      })
  }, 5000)
  }
  



  const newAnecdoteMutation = useMutation({
    mutationFn: (anecdote) => {
      return addNewAnecdote(anecdote)
    },
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries('anecdotes')
      
      createDispatchAndClear(anecdote)
    },
    onError: (errorMessage) => {
      errorDispatchAndClear(errorMessage.message)
      
    }
  })



  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    const newAnecdote = {
      content: content,
      votes: 0
    }

    newAnecdoteMutation.mutate(newAnecdote)



    event.target.anecdote.value = ''

  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
  }

export default AnecdoteForm
