import api from '../services/api';

export const login = (email, password) => async dispatch => {
	await api.post('/authenticate', {
      email,
      password
    }).then((res) => {
      	const { user, token } = res.data
	    dispatch({
			type: 'SIGNIN',
			user,
			token
		})
    }).catch(err => {
      alert('Invalid password or email')
    })
}

export const register = (name, email, password) => async dispatch => {
	let type = 'user'
	await api.post('/register', {
      name,
      email,
      password,
      type
    }).then((res) => {
      	const { user, token } = res.data
       	dispatch({
			type: 'SIGNIN',
			user,
			token
		})
    }).catch(err => {
      alert('Invalid data')
    })
}

export const logout = () => async dispatch => {
	dispatch({
		type: 'LOGOUT'
	})
}

export const toggleDialog = () => async dispatch => {
	dispatch({
		type: 'TOGGLE_DIALOG'
	})
}

export const deletePost = (post, token) => async dispatch => {
	try{
		await api.delete(`/posts/${post}`,  { headers: { Authorization: `Bearer ${token}` }})
		dispatch({
			type: 'POST_DELETED'
		})
	}catch(err){
		console.log(err)
	}
}

