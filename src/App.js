import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import MenuTop from './components/Header/Menu';
import MenuBottom from './components/Bottom/MenuBottom';
import PostList from './components/Post/PostList';
import TextField from '@material-ui/core/TextField';
import api from './services/api';

function App(){

	const [search, setSearch] = useState('')
	const [enter, setEnter] = useState(false)

	const handleChange = e => {
		setSearch(e.target.value)
		setEnter(false)
	}

	const handleSubmit = e => {
		if (e.key === 'Enter' && search.length > 2 ) {
			setEnter(true)
		}
	}

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
				<PostList search={enter && search}/>
			</Grid>
			<MenuBottom/>
		</Grid>
	)
}

export default App;
