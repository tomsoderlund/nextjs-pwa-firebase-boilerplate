import { toast } from 'react-toastify'

const defaultOptions = {
  autoClose: 3 * 1000,
  hideProgressBar: true,
  closeButton: false,
  position: toast.POSITION.BOTTOM_LEFT
}

// Type: info, success, warning, error. Returns a notificationId that you can use for follow-up notifications.
const showNotification = (message, type = 'info', options = {}) => {
  if (options.notificationId) {
    // Update existing notification
    return toast.update(options.notificationId, { ...defaultOptions, render: message, type, hideProgressBar: true, ...options })
  } else {
    // Create new notification
    toast.dismiss()
    return toast[type](message, { ...defaultOptions, ...options })
  }
}

export default showNotification

// Commonly used notifications
export const showErrorNotification = (error) => {
  console.error(error)
  showNotification(error.message || error, 'error')
}
