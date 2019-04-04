import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import MenuTop from './components/Header/Menu';
import MenuBottom from './components/Bottom/MenuBottom';
import PostList from './components/Post/PostList';
import TextField from '@material-ui/core/TextField';
import api from './services/api';
import Pusher from 'pusher-js';

function App(){

	const [search, setSearch] = useState('')
	const [enter, setEnter] = useState(false)
	const [posts, setPosts] = useState([])

	const handleChange = e => {
		setSearch(e.target.value)
	}

	const handleSubmit = e => {
		if (e.key === 'Enter' ) {
			getPosts()
		}
	}

	async function getPosts(){
		var data = ''
		var response = null;
		if(search){
			response = await api.get(`/posts`, {
			    params: {
			      search
			    }
			})
			data = await response.data
			setPosts(data)
		}
		else{
			response = await api.get(`/posts`)
			data = await response.data
			setPosts(data)
		}
	}

	useEffect(() => {
		const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
			cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
			encrypted: true,
		});
		const channel = pusher.subscribe('posts');
		channel.bind('bdchange', getPosts.bind(this));
		getPosts()
	}, [])

	return (
		<Grid container spacing={16}>
			<MenuTop/>
			<Grid item xs={12}>
				<Grid container justify="center" alignItems="center">
					<Grid item xs={12} md={6} style={{marginTop: 30}}>
						<TextField
						  type="search"
				          id="standard-helperText"
				          label="What do you need?"
				          margin="normal"
				          fullWidth
				          variant="outlined"
				          autoFocus
				          value={search}
				          onChange={handleChange}
				          onKeyDown={handleSubmit}
				        />
					</Grid>
				</Grid>
				<PostList posts={posts}/>
			</Grid>
			<MenuBottom/>
		</Grid>
	)
}

export default App;
