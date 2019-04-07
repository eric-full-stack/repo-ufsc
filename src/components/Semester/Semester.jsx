import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  card: {
    maxWidth: 300,
  },
}
function Semester(props){
	const { name, handleSemesterChange, id } = props;
	return (
		<Button fullWidth onClick={() => handleSemesterChange(id)} size="large" color="primary" variant="contained">
	      	{`${name}`}
	     </Button>
	)
}

Semester.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Semester);