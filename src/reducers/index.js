import { combineReducers } from 'redux'
import user from './UserReducer'
import toggleDialog from './ToggleDialogReducer'

export default combineReducers({
  user,
  toggleDialog
})