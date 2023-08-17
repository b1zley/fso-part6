import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote, voteForId } from '../reducers/anecdoteReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'
const AnecdoteList = () => {
    const state = useSelector(state => state)
    const anecdotes = useSelector(state => state.anecdotes)
    const filterText = useSelector(state => state.filter)
    const dispatch = useDispatch()
    const vote = (id) => {

        dispatch(voteForId(id))
        const anecdoteVotedForArray = anecdotes.filter((anecdote) => {
            return anecdote.id === id
        })
        const anecdoteToVoteFor = anecdoteVotedForArray[0]
        dispatch(voteForAnecdote(anecdoteToVoteFor))
        const anecdoteContent = anecdoteToVoteFor.content
        const notificationToDispatch = `you voted for ${anecdoteContent}`
        dispatch(setNotificationWithTimeout(notificationToDispatch, 5))
        
    }
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



