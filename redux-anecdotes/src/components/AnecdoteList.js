import { useSelector, useDispatch } from 'react-redux'
import { voteForId } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    const filterText = useSelector(state => state.filter.filterText)
    const dispatch = useDispatch()
    const vote = (id) => {

        dispatch(voteForId(id))
    }
    console.log('filterText - anecdoteList', filterText)

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



