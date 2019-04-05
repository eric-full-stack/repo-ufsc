import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Semester from './Semester';

const styles = {
  root: {
    marginTop: 10,
    flexGrow: 1
  },
};

function SemesterList(props) {
  const { classes, semesters, handleSemesterChange } = props; 
 
  return (
  	<Grid container className={classes.root} alignItems={'center'} spacing={16}  alignContent={'center'} direction={'row'} justify={'center'} >
  		{ semesters.map(semester => (
		  	<Grid item xs={12} sm={1} md={1} lg={1} key={semester.name}>
		  		<Semester name={semester.name} handleSemesterChange={handleSemesterChange} id={semester._id}/>
		    </Grid>
  		))}
	    
    </Grid>
  );
}

SemesterList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SemesterList);
