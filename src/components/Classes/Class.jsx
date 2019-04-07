import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
  
  media: {
    height: 350,
  },
}
function Class(props){
	const { classes, image, name, handleClassChange, id } = props;
	return (
		<Card color="primary" className={classes.card} raised>
	      <CardActionArea onClick={() => handleClassChange(id)}>
	        <CardMedia
	          className={classes.media}
	          image={image.url || ''}
	          title={name}
	        />
	      </CardActionArea>
	      
	    </Card>
	)
}

Class.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Class);