import React, { useState, useEffect } from 'react';
import Post from './Post';
import Grid from '@material-ui/core/Grid';
import api from '../../services/api';

export default function PostList(props){
	const [posts, setPosts] = useState([])
	const { search } = props

	useEffect(() => {
		async function fetchData(){
			const response = await api.get(`/posts`, {
			    params: {
			      search
			    }
			})
			const data = await response.data
			setPosts(data)
		}
		fetchData()
	}, [search])



	return (
		<Grid container spacing={16} style={{marginTop:30, marginBottom: 80}}>
			{posts.map(post => (
				<Post key={post._id} data={post} />
			))}
		</Grid>
	)
}
