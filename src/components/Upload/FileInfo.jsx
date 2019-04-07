import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
	container: {
		display: 'flex',
		alignItems: 'center',
	},
	div: {
		display: 'flex',
		flexDirection: 'column'
	},
	separate: {
		marginRight: theme.spacing.unit * 1
	}
	
});

function FileInfo(props) {
	const { classes, file, handleDeleteFile } = props;
	
	return (
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={file.name}
          secondary={file.readableSize}
        />
        <IconButton aria-label="Delete" className={classes.separate} onClick={() => handleDeleteFile(file)}>
			<DeleteIcon />
		</IconButton>
      </ListItem>
	)
}

export default withStyles(styles)(FileInfo);