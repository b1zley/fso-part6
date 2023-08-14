const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

export const getId = () => (100000 * Math.random()).toFixed(0)



const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sortByVotes = (anecdotes) => {
  console.log('in sort by votes')
  let sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  return sortedAnecdotes
}

const initialState = anecdotesAtStart.map(asObject)

export const createNewAnecdote = (anecdoteText) => {
  return {
    type: 'CREATE',
    payload: {
      content: anecdoteText,
      id: getId(),
      votes: 0
    }
  }
}

export const voteForId = (id) => {
  return ({
    type: 'VOTE',
    payload: { id }
  })
}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)



  switch (action.type) {
    case 'VOTE': {
      const idToVote = action.payload.id
      console.log('idToVote', idToVote)
      const anecdotes = state
      const indexAnecdoteToVote = anecdotes.findIndex((anecdote) => {
        return anecdote.id === idToVote
      })
      console.log(anecdotes[indexAnecdoteToVote])
      const newAnecdote = {
        ...anecdotes[indexAnecdoteToVote],
        votes: anecdotes[indexAnecdoteToVote].votes + 1
      }


      //define replacement anecdote from find method
      const replacementAnecdote = newAnecdote

      const indexToReplace = anecdotes.findIndex((anecdote) => {
        return anecdote.id === replacementAnecdote.id
      })


      let replacementAnecdotes = [...anecdotes]
      replacementAnecdotes[indexToReplace] = replacementAnecdote
      return sortByVotes(replacementAnecdotes)

    }

    case 'CREATE': {
      const newAnecdote = action.payload

      const anecdotes = state

      const newAnecdotes = anecdotes.concat(newAnecdote)
      console.log(newAnecdotes)

      return (sortByVotes(newAnecdotes))
    }




    default:
      return state
  }

}



export default reducer