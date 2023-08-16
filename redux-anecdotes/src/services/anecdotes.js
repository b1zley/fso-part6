import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'


const getAll = async () => {
    const response = await axios.get(baseUrl)
    // let response
    console.log('response.data',response.data)
    return response.data
}


const createNewAnecdote = async (content) => {
    const object = {
        content: content,
        votes: 0
    }

    const response = await axios.post(baseUrl, object)
    return response.data
}

const anecdoteServices = { getAll , createNewAnecdote }

export default anecdoteServices