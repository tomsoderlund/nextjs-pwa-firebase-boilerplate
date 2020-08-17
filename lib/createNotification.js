import { toast } from 'react-toastify'

const defaultOptions = {
  autoClose: 3 * 1000,
  hideProgressBar: true,
  closeButton: false,
  position: toast.POSITION.BOTTOM_LEFT
}

// Type: info, success, warning, error. Returns a notificationId that you can use for follow-up notifications.
const createNotification = (message, type = 'info', options = {}) => {
  if (options.notificationId) {
    // Update existing notification
    return toast.update(options.notificationId, Object.assign({}, defaultOptions, { render: message, type, hideProgressBar: true }, options))
  } else {
    // Create new notification
    toast.dismiss()
    return toast[type](message, Object.assign({}, defaultOptions, options))
  }
}

export default createNotification

// Commonly used notifications
// export const createWarningNotification = () => createNotification(`This is a warning`, 'warning')
