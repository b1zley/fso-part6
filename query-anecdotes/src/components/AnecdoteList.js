import { useQuery, useMutation, useQueryClient } from 'react-query'
import anecdoteService from '../services/anecdotes'
import { updateAnecdote } from '../services/anecdotes'

const AnecdoteList = () => {

    const queryClient = useQueryClient()

    const updateAnecdoteMutation = useMutation({
        mutationFn: (newAnecdote) => {
            return updateAnecdote(newAnecdote)
            
        },
        onSuccess: () => {
            queryClient.invalidateQueries('anecdotes')
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