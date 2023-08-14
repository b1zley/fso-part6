export const updateFilter = (filterText) => {
    return ({
        type: 'UPDATE',
        payload: {
          filterText
        }
    })
}


const initialState = {
  filterText: ''
}

const filterReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)



  switch (action.type) {
    case 'UPDATE': {
        console.log(action.type)
        console.log(action.payload)
        const filterText = action.payload

        return filterText
    }



    default:
      return state
  }

}



export default filterReducer



