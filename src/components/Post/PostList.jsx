import React from 'react';
import Post from './Post';
import Grid from '@material-ui/core/Grid';

export default function PostList(props){
	const { posts } = props
	return (
		<Grid container spacing={16} style={{marginTop:30, marginBottom: 80}}>
			{posts.map(post => (
				<Post key={post._id} data={post} />
			))}
		</Grid>
	)
}
