import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DraftsIcon from '@material-ui/icons/Drafts';

const styles = theme => ({
  root: {
    marginTop: 10,
    flexGrow: 1,
    
  },
  card: {
    backgroundColor: 'white',   
  },
});

function DisciplineList(props) {
  const { classes, disciplines, handleDisciplineChange } = props; 
 
  return (
  	<Grid container className={classes.root} alignItems={'center'} spacing={16}  alignContent={'center'} direction={'row'} justify={'center'} >
      <div className={classes.card}>
      <List dense={false} component="nav">
  		{ disciplines.map(discipline => (
        <ListItem button key={discipline._id} onClick={() => handleDisciplineChange(discipline._id)}>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText
            primary={discipline.title}
          />
        </ListItem>
  		))}
      </List>
      </div>
    </Grid>
  );
}

DisciplineList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DisciplineList);
