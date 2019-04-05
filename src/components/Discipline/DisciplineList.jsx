import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    marginTop: 10,
    flexGrow: 1
  },
  card: {
    
    textAlign: 'center',
    justifyContent: 'center',
    padding: '5px'
  },
};

function DisciplineList(props) {
  const { classes, disciplines, handleDisciplineChange } = props; 
 
  return (
  	<Grid container className={classes.root} alignItems={'center'} spacing={16}  alignContent={'center'} direction={'row'} justify={'center'} >
  		{ disciplines.map(discipline => (
		  	<Grid item xs={12} sm={3} md={3} lg={3} key={discipline._id}>
        <CardActionArea onClick={() => handleDisciplineChange(discipline._id)}>
		  		<Card color="primary" className={classes.card} raised>
            
              <Typography component="span" variant="overline" color="inherit">{discipline.title}</Typography>
            
          </Card>
          </CardActionArea>
		    </Grid>
  		))}
    </Grid>
  );
}

DisciplineList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DisciplineList);
