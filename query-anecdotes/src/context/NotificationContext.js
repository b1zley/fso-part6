import { createContext } from 'react'

import { useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE': {
        return action.payload
      }
      case 'CLEAR': {
        return null
      }

      default: {
        return state
      }
    }
  }

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {

    const [notification, dispatchNotification] = useReducer(notificationReducer, null)


    return (
        <NotificationContext.Provider value = {[notification, dispatchNotification]}>
            {props.children}
        </NotificationContext.Provider>
    )
}



export default NotificationContext