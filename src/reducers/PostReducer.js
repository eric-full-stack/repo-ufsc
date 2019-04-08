const posts = (state = [], action) => {
  switch (action.type) {
    case 'POST_FETCHED':
      console.log(action.posts)
      return {
        posts: action.posts
      }
     
    default:
      return state
  }
}

export default posts