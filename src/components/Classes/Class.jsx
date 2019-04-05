import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
  card: {
    maxWidth: 300,
  },
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