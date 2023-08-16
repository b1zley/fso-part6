import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, updateNotification } from '../reducers/notificationReducer'


import anecdoteServices from '../services/anecdotes'


const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const createNew = async (event) => {
        event.preventDefault()
        const anecdoteText = event.target.anecdote.value

        const newAnecdote = await anecdoteServices.createNewAnecdote(anecdoteText)

        dispatch(createNewAnecdote(newAnecdote))
        const notificationToDispatch = 
            `you created an anecdote: ${anecdoteText}`
        dispatch(updateNotification(notificationToDispatch))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
        
            event.target.anecdote.value = ''
    
      }


    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createNew}>
                <div>
                    <input name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </div >
    )

}

export default AnecdoteForm



