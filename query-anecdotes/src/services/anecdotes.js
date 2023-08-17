import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'


const getAllAnecdotes = async () => {

    const response = await axios.get('http://localhost:3001/anecdotes')
    return response.data


}

export const addNewAnecdote = async (anecdoteToAdd) => {

    // axios.post(baseUrl, anecdoteToAdd).then(res => res.data)
    const response =
        await axios.post(baseUrl, anecdoteToAdd)
    
    return response.data
}

export const updateAnecdote = async (newAnecdote) => {

    const id = newAnecdote.id
    const response =
        await axios.put(`${baseUrl}/${id}`, newAnecdote)
    return response
}


const anecdoteService = {
    getAllAnecdotes
}

export default anecdoteService