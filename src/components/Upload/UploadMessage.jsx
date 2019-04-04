import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '30px 0'
	},
	success: {
		color: '#78e5d5'
	},
	error: {
		color: '#e57878'
	},
	default:{
		color: '#999'
	}
});

function UploadMessage(props) {
	const { classes, children, type } = props;
	return (
		<p className={`${classes.container} ${classes[type]} `}>
			{children}
		</p> 
	)
}

export default withStyles(styles)(UploadMessage);