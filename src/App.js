import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuTop from './components/Header/Menu';
import MenuBottom from './components/Bottom/MenuBottom';
import PostList from './components/Post/PostList';
import ClassesList from './components/Classes/ClassesList';
import SemesterList from './components/Semester/SemestersList';
import DisciplineList from './components/Discipline/DisciplineList';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import api from './services/api';
import { getPosts } from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const styles = theme => ({
  chip: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
});

function App(props){

	const [search, setSearch] = useState('')
	const [loading, setLoading] = useState(true)
	const [posts, setPosts] = useState([])
	const [classesList, setClasses] = useState([])
	const [semesters, setSemesters] = useState([])
	const [disciplines, setDisciplines] = useState([])
	const [semester, setSemester] = useState('')
	const [discipline, setDiscipline] = useState('')
	const [selectedClass, setClass] = useState('')

	const { classes, getPosts, postsData } = props 

	const handleChange = e => {
		setSearch(e.target.value)
	}

	const handleSubmit = async e => {
		if (e.key === 'Enter' ) {
			setLoading(true)
			await getPosts(null, search)
			setLoading(false)
		}
	}

	useEffect( () => {
		getClasses()
		setLoading(false)
	}, [])

	useEffect( () => {
		setPosts(postsData)
	}, [postsData])

	async function getClasses(){
		var response = null;
		if(search){
			response = await api.get(`/classes`, {
			    params: {
			      search
			    }
			})
			const data = await response.data
			setClasses(data)
		}
		else{
			response = await api.get(`/classes`)
			const data = await response.data
			setClasses(data)
		}
	}

	async function getDisciplines(smt){
		setLoading(true)
		var response = null;
		response = await api.get(`/disciplines/semester/${smt._id}`)
		setDisciplines(response.data)
		setLoading(false)
	}

	const handleClassChange = (id) => {
		let Obj = classesList.filter(obj => { return obj._id === id })[0]
		if(Obj){
			setClass(Obj || '')
			setSemesters(Obj.semesters || [])	
		}else{
			setClass('')
			setSemesters([])
			setSemester('')
			setDiscipline('')
			setDisciplines([])
			setPosts([])
			setSearch('')
		}
	}

	const handleSemesterChange = (id) => {
		let Obj = semesters.filter(obj => { return obj._id === id })[0]
		if(Obj){
			setSemester(Obj || '')
			getDisciplines(Obj)
			
		}else{
			setSemester('')
			setDisciplines([])
			setDiscipline('')
			setSearch('')
			setPosts([])
		}
	}

	const handleDisciplineChange = async id => {
		let Obj = disciplines.filter(obj => { return obj._id === id })[0]
		if(Obj){
			setDiscipline(Obj || '')
			setLoading(true)
			await getPosts(Obj._id)
			setLoading(false)

		}else{
			setDiscipline('')
			setPosts([])
			setSearch('')
		}
	}
	
	return (
		<Grid container spacing={16}>
			<MenuTop/>
			<Grid item xs={12}>
				<Grid container justify="center" alignItems="center">
					<Grid item xs={12} md={12} style={{marginTop: 0}}>
						{ selectedClass && <Chip label={selectedClass.name} className={classes.chip} onDelete={handleClassChange} /> }
						{ semester && <Chip label={semester.name} className={classes.chip} onDelete={handleSemesterChange} /> }
						{ discipline && <Chip label={discipline.title} className={classes.chip} onDelete={handleDisciplineChange} /> }
					</Grid>
					<Grid item xs={12} md={6} style={{marginTop: 0}}>
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
				{loading && <Grid container justify="center" alignItems="center"><CircularProgress /></Grid> }
				{!loading && ( 
					<>
					{!selectedClass && !search && (
						<ClassesList classesList={classesList} handleClassChange={handleClassChange.bind(this)}/>
					)}
					{selectedClass && !semester && !search && (
						<>
						<Typography align="center" component="span" variant="overline" color="inherit" gutterBottom>Semesters</Typography>
						<SemesterList semesters={semesters} handleSemesterChange={handleSemesterChange.bind(this)} />
						</>
					)}
					{selectedClass && semester && !discipline && !search && (
						<>
						<Typography align="center" component="span" variant="overline" color="inherit">Disciplines</Typography>
						<DisciplineList disciplines={disciplines} handleDisciplineChange={handleDisciplineChange.bind(this)} />
						</>
					)}
					{selectedClass && semester && discipline && !search && (
						<PostList posts={posts}/>
					)}
					{search && <PostList posts={posts}/>}
				
				</>
			)}
			</Grid>
			{selectedClass && semester && discipline && (
				<MenuBottom discipline={discipline} disciplines={disciplines} classObj={selectedClass}/>
			)}
		</Grid>
	)
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    postsData: state.posts.posts,
});

const mapDispatchToProps = dispatch => bindActionCreators({ getPosts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
