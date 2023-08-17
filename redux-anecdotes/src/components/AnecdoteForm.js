import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'


const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const createNew = async (event) => {
        event.preventDefault()
        const anecdoteText = event.target.anecdote.value

        dispatch(createNewAnecdote(anecdoteText))
        const notificationToDispatch = 
            `you created an anecdote: ${anecdoteText}`
        dispatch(setNotificationWithTimeout(notificationToDispatch, 5))
        
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



