import { useQuery, useMutation, useQueryClient } from 'react-query'
import anecdoteService from '../services/anecdotes'
import { updateAnecdote } from '../services/anecdotes'

import NotificationContext from '../context/NotificationContext'
import { useContext } from 'react'

const AnecdoteList = () => {
    const [notification, notificationDispatch] = useContext(NotificationContext)

    const queryClient = useQueryClient()


    const votingDispatchAndClear = (anecdote) => {
        notificationDispatch({
            type: 'UPDATE',
            payload: {
                isError: false,
                displayText: `voted for ${anecdote.content}`
            }
        })

        setTimeout(() => {
            notificationDispatch({
                type: 'CLEAR'
            })
        }, 5000)
    }
    
    const failedVotingDispatchAndClear = (anecdote) => {
        notificationDispatch({
            type: 'UPDATE',
            payload: {
                isError: true,
                displayText: `failed to vote for ${anecdote.content}`
            }
        }
        )
        setTimeout(() => {
            notificationDispatch({
                type: 'CLEAR'
            })
        }, 5000)
    }

    const updateAnecdoteMutation = useMutation({
        mutationFn: (newAnecdote) => {
            return updateAnecdote(newAnecdote)
            
        },
        onSuccess: (newAnecdote) => {
            queryClient.invalidateQueries('anecdotes')
            
            votingDispatchAndClear(newAnecdote.data)
        },
        onError:(newAnecdote) => {
            failedVotingDispatchAndClear(newAnecdote)
        }
    })




    const result = useQuery(
        'anecdotes',
        anecdoteService.getAllAnecdotes,
        {
            retry: false,
            refetchOnWindowFocus: false
        }
    )

    if (result.isLoading === true) {
        return (
            <div>
                loading data...
            </div>
        )
    } else if (result.isError === true) {
        return (
            <div>
                anecdote service not available due to problems in server
            </div>
        )

    } else {

        const handleVote = async (anecdote) => {
            
            const newAnecdote = {
                ...anecdote,
                votes: anecdote.votes + 1
            }
            updateAnecdoteMutation.mutate(newAnecdote)
            
            

        
        
        }

        const anecdotes = result.data




        return (
            <div>
                {anecdotes.map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => handleVote(anecdote)}>vote</button>
                        </div>
                    </div>
                )}
            </div>

        )


    }




}

export default AnecdoteList