import React, { useEffect } from 'react';
import Post from './Post';
import Grid from '@material-ui/core/Grid';
import socket from '../../services/io';

export default function PostList(props){
	const { posts } = props

	useEffect(() => {
		return function cleanup() {
			posts && posts.map(post => {
				socket.emit('disconnectPost', post.id)
			})
		}
	})

	return (
		<Grid container spacing={16} style={{marginTop:30, marginBottom: 80}}>
			{posts && posts.map(post => (
				<Post key={post._id} data={post} />
			))}
		</Grid>
	)
}
