const posts = (state = [], action) => {
  switch (action.type) {
    case 'POST_FETCHED':
      return {
        posts: action.posts
      }
     
    default:
      return state
  }
}

export default posts