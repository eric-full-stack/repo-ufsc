import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Description from '@material-ui/icons/Description';
import SendIcon from '@material-ui/icons/Backup';
import StarIcon from '@material-ui/icons/Star';
import Upload from '../Upload/Upload';

const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing.unit * 2,
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
});

function BottomAppBar(props) {
  const { classes, disciplines, classObj } = props;
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(!open)
  }

  return (
    <React.Fragment>
      <Upload disciplinesData={disciplines} classObj={classObj} open={open} handleOpen={handleClickOpen.bind(this)}/>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div />
          <Fab color="secondary" aria-label="Add" className={classes.fabButton} onClick={handleClickOpen}>
            <SendIcon />
          </Fab>
          <div>
            <Tooltip title={'Meus arquivos'}>
              <IconButton color="inherit">
                <Description />
              </IconButton>
            </Tooltip>
            <Tooltip title={'Meus favoritos'}>
              <IconButton color="inherit">
                <StarIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

BottomAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomAppBar);
