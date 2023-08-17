// import addNewAnecdote  from '../services/anecdotes'
import anecdoteService from '../services/anecdotes'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { addNewAnecdote } from '../services/anecdotes'

import axios from 'axios'




const AnecdoteForm = () => {
  const queryClient = useQueryClient()



  const newAnecdoteMutation = useMutation({
    mutationFn: (anecdote) => {
      return addNewAnecdote(anecdote)
    },
    onSuccess: () => {
      return queryClient.invalidateQueries('anecdotes')
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
