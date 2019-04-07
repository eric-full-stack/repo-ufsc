const user = (state = null, action) => {
  switch (action.type) {
    case 'SIGNIN':
      return {
        user: action.user,
        token: action.token
      }

    case 'LOGOUT':
      return null
     
    default:
      return state
  }
}

export default user