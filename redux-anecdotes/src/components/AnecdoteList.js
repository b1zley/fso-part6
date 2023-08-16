import { useSelector, useDispatch } from 'react-redux'
import { voteForId } from '../reducers/anecdoteReducer'
import { updateNotification, removeNotification } from '../reducers/notificationReducer'
const AnecdoteList = () => {
    const state = useSelector(state => state)
    const anecdotes = useSelector(state => state.anecdotes)
    const filterText = useSelector(state => state.filter)
    const dispatch = useDispatch()
    const vote = (id) => {

        dispatch(voteForId(id))
        const anecdoteVotedFor = anecdotes.filter((anecdote) => {
            return anecdote.id === id
        })
        const anecdoteContent = anecdoteVotedFor[0].content
        const notificationToDispatch = `you voted for ${anecdoteContent}`
        dispatch(updateNotification(notificationToDispatch))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }
    // console.log('filterText - anecdoteList', filterText)
    console.log('state', state)
    console.log('filterText',filterText)
    let shownAnecdotes = anecdotes.filter((anecdote) => anecdote.content.toUpperCase().includes(filterText.toUpperCase()))
    
    console.log(shownAnecdotes)
    return (
        <>  
            {   
                shownAnecdotes
                    .map(anecdote =>
                        <div key={anecdote.id}>
                            <div>
                                {anecdote.content}
                            </div>
                            <div>
                                has {anecdote.votes}
                                <button onClick={() => vote(anecdote.id)}>vote</button>
                            </div>
                        </div>
                    )
                    
            }
        </>


    )
}

export default AnecdoteList



