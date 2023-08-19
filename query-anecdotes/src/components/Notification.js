import { useContext } from "react"
import NotificationContext from "../context/NotificationContext"

const Notification = () => {

  const notificationStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const errorStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    color: 'red'
  }

  const [notification, dispatchNotification] = useContext(NotificationContext)
  

  if (notification === null) {
    return (
      null
    )
  } else if (notification.isError === true) {
    const displayText = notification.displayText

    return (
      <div style={errorStyle}>
        {displayText}
      </div>
    )
  } else if (notification.isError === false) {
    const displayText = notification.displayText
    return (
      <div style={notificationStyle}>
        {displayText}
      </div>
    )
  } else { return null}



}


export default Notification
