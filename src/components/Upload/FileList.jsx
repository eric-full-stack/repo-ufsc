import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import FileInfo from './FileInfo';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    alignItems: 'center',
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});

function FileList (props) {
	const { classes, files, handleDeleteFile } = props;

    return (
      <div className={classes.root}>
        <Grid item xs={12} md={12}>
            <div className={classes.demo}>
              <List>
                {
                	files.map(file => (
                		<FileInfo file={file} handleDeleteFile={handleDeleteFile} key={file.id}/>
                	))
            	}
              </List>
            </div>
        </Grid>
      </div>
    );
}

FileList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FileList);
