import { createSlice } from '@reduxjs/toolkit'
import anecdoteServices from '../services/anecdotes'


const initialState = []

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const getId = () => (100000 * Math.random()).toFixed(0)

const sortByVotes = (anecdotes) => {
  console.log('in sort by votes')
  let sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  return sortedAnecdotes
}

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createNewAnecdote(state, action) {
      
      state.push(action.payload)
    },
    voteForId(state, action) {
      const idToVote = action.payload
      console.log(idToVote)
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



    },

    setAnecdotes(state, action) {
      let newAnecdotes = action.payload
      return newAnecdotes
    }

    

  }
})




export const {  createNewAnecdote , voteForId , setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    console.log('anecdotes from initialize',anecdotes)
    dispatch(setAnecdotes(anecdotes))
  }
}



export default anecdoteSlice.reducer