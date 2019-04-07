import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Login from '../User/Login';
import { logout, toggleDialog } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  paper: {
    index: 2
  }
});

function MenuTop(props) {
  const { classes, user, logout, toggleDialog, toggleDialogAction } = props
  const [open, setOpen] = useState(false)
  const [userPanel, setUserPanel] = useState(false)
  const [anchorEl, setAnchor] = useState({})

  const handleClose = () => {
    toggleDialogAction()
  }
  const handleLogout = () => {
    logout()
    setUserPanel(false)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            RepoUFSC
          </Typography>
          {!user && <Button onClick={handleClose} color="inherit">Login</Button> }
          {user && <Button onClick={() => setUserPanel(true)} color="inherit" buttonRef={node => {
              setAnchor(node)
            }}
            aria-owns={userPanel ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            >{user.user.name}</Button> }
            <Popper open={userPanel} anchorEl={anchorEl} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper className={classes.paper}>
                    <ClickAwayListener onClickAway={() => setUserPanel(false)}>
                      <MenuList>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
        </Toolbar>
      </AppBar>
      <Login isOpen={open} handleClose={() => setOpen(!open)}/>
    </div>
  );
}

MenuTop.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
    toggleDialog: state.toggleDialog
});

const mapDispatchToProps = dispatch => bindActionCreators({ logout, toggleDialogAction: toggleDialog }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MenuTop));
