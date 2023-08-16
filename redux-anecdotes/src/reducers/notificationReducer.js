import { createSlice } from '@reduxjs/toolkit'

let initialState = null


const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        updateNotification(state, action) {
            const notification = action.payload
            return notification
        },
        removeNotification(state,action){
            const notification = null
            return notification
        }
    }
})


export const { updateNotification , removeNotification } = notificationSlice.actions

export default notificationSlice.reducer