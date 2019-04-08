import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import Description from '@material-ui/icons/Description';
import CloudDownload from '@material-ui/icons/CloudDownload';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import downloadfunction from './downloadfunction.js';
import api from '../../services/api';
import Lightbox from 'react-images';
import { toggleDialog } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const styles = theme => ({
	grow: {
		flexGrow: 1,
	},
	margin: {
	    margin: theme.spacing.unit *0.5,
    },
    chipRoot:{
    	marginTop: theme.spacing.unit *2
    },
    chip: {
    	margin: theme.spacing.unit *0.5
    },
    textWrap: {
    	overflowWrap: 'break-word'
    }

});

function Post(props) {
	const { classes, data: post, user, toggleDialog } = props;

	const [like, setLike] = useState(false)
	const [likes, setLikes] = useState(post.likes)
	const [lightboxIsOpen, setLightboxOpen] = useState(false)
	const [currentFile, setCurrentFile] = useState(0)

	useEffect(() => {
		if(user)
			setLike( user.user.likes && user.user.likes.includes(post.id))
	}, [user])

	useEffect(() => {
		if(user)
			setLike( user.user.likes && user.user.likes.includes(post.id))
	}, [])

	async function handleLike(id){
		try{
			if(user){
				if(like){
					const response = await api.post(`/posts/${id}/unlike`, {}, { headers: { Authorization: `Bearer ${user.token}` } })
					let { likes } = response.data
					setLikes(likes)
				}
				else{
					const response = await api.post(`/posts/${id}/like`, {}, { headers: { Authorization: `Bearer ${user.token}` } })
					let { likes } = response.data
					setLikes(likes)
				}
				setLike(!like)
			}else{
				toggleDialog()
			}
		}catch(err){
			console.log(err)
		}
		
	}

	async function handleDownload(id){
		await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}/download`).then(resp => {
			return resp.blob()
		}).then(blob => {
			downloadfunction(blob,"download.zip",'application/zip')
		})
	}

	function handleDetail(id){
		setLightboxOpen(!lightboxIsOpen)
	}

	const handleNextFile = () => {
		let page = currentFile+1
		setCurrentFile(page)
	}

	const handlePrevFile = () => {
		let page = currentFile-1
		setCurrentFile(page)
	}

	return (
		<Grid item xs={12} sm={6} md={4} lg={3}>
			<Lightbox
			  images={post.files.map(file => { return {src: file.url} })}
			  isOpen={lightboxIsOpen}
			  onClose={handleDetail}
			  currentImage={currentFile}
			  onClickNext={handleNextFile}
			  onClickPrev={handlePrevFile}
			  backdropClosesModal={true}
			/>
		    <Card className={classes.card} raised >
		    	<CardHeader 
		    	title={post.title}
          		subheader={post.createdAt}  />
			    <CardContent>
					<Typography component="p" className={classes.textWrap} align="justify">
						{post.description}
					</Typography>
					<Grid item xs={12} className={classes.chipRoot}>
						{post.tags.map((tag,key) => (
							<Chip label={tag} className={classes.chip} key={key}/>
						))}
					</Grid>
			    </CardContent>
				<CardActions>
					<Tooltip title={'Download'}>
					    <IconButton aria-label="Download files" onClick={() => handleDownload(post._id)} >
					      <CloudDownload /> 
					    </IconButton>
					</Tooltip>
					
					<Tooltip title={'Details'}>
					    <IconButton aria-label="Details" onClick={handleDetail}>
					    	<Description /> 
					    </IconButton>
					</Tooltip>
					
					<div className={classes.grow}/>
					<Tooltip title={'Like'}>
					    <IconButton aria-label="Like" onClick={() => handleLike(post._id)}>
					    	<Badge className={classes.margin} badgeContent={likes || 0} color="primary">
					    		{like ? <Favorite color="secondary"/> : <FavoriteBorder /> }
				    		</Badge>
					    </IconButton>
					</Tooltip>
				</CardActions>
		    </Card>
		</Grid>
	);
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({ toggleDialog }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Post));
