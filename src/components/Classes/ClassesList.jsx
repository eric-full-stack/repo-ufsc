import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Class from './Class';

const styles = {
  root: {
    marginTop: 10,
    flexGrow: 1
  },
};

function ClassesList(props) {
  const { classes, classesList, handleClassChange } = props;
  return (
  	<Grid container className={classes.root} alignItems={'center'} spacing={16}  alignContent={'center'} direction={'row'} justify={'center'} >
  		{ classesList.map(classObj => (
		  	<Grid item xs={12} sm={6} md={4} lg={3} key={classObj._id}>
		  		<Class image={classObj.image} name={classObj.name} id={classObj._id} handleClassChange={handleClassChange} />
		    </Grid>
  		))}
	    
    </Grid>
  );
}

ClassesList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClassesList);
