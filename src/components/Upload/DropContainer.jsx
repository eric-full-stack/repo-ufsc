import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	container: {
		border: '1px dashed #ddd',
		borderRadius: '4px',
		cursor: 'pointer',
		transition: 'height 0.2s ease'
	},
	dragActive: {
		borderColor: '#78e5d5'
	},
	dragReject: {
		borderColor: '#e57878'
	}
});

function DropContainer(props) {
	const { classes, children, isDragActive, isDragReject, ...other } = props;
	return (
		<div className={`${classes.container} ${isDragReject && classes.dragReject} ${isDragActive && classes.dragActive} `} 
			{...other}
		>
			{children}
		</div> 
	)
}

export default withStyles(styles)(DropContainer);