import { combineReducers } from 'redux'
import user from './UserReducer'
import posts from './PostReducer'
import toggleDialog from './ToggleDialogReducer'

export default combineReducers({
  user,
  posts,
  toggleDialog
})