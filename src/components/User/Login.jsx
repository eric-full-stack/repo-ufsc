import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import { login, register, toggleDialog } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const styles = theme => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  dialog: {
    padding: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 2,
  },
   textRight: {
    textAlign: 'left',
    [theme.breakpoints.up('md')]: {
      textAlign: 'right',
    },
  },
  margin: {
    margin: theme.spacing.unit * 1,
  },
  logginBtn: {
    textAlign: 'right',
    margin: theme.spacing.unit * 1,
  },
  marginTop: {
    marginTop: theme.spacing.unit * 2,
  },
});

function Login (props){
  
  const { classes, handleClose, toggleDialog, toggleDialogAction } = props;

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [errorName, setNameError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [confirm, setConfirm] = useState('')
  const [signup, setSignUp] = useState(false)
  

  useEffect( () => {
      if(password !== confirm && signup)
        setPasswordError(true)
    }, [password, confirm])

  const handleSignUp = () => {
    setSignUp(!signup)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if(e.target.value.length < 6){
      setPasswordError(true)
    }else{
      setPasswordError(false)
      if(e.key === "Enter"){
        handleLogin()
      }
    }
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
    if(e.target.value.length < 4){
      setNameError(true)
    }else{
      setNameError(false)
    }
  }

  const handlePasswordConfirmChange = (e) => {
    setConfirm(e.target.value)
    if(e.target.value.length < 6){
      setPasswordError(true)
    }else{
      setPasswordError(false)
      if(e.key === "Enter"){
        handleLogin()
      }
    }
  }

  async function handleLogin() {
    if(!errorName && !passwordError && email && password){
      if(signup){
        setLoading(true)
        await props.register(name, email, password)
        setLoading(false)
        toggleDialogAction()
      }else{
        setLoading(true)
        await props.login(email, password)
        setLoading(false)
        toggleDialogAction()
      }
    }else{
      alert('Invalid data')
      setPasswordError(true)
    }
  }

  return (
    <Dialog fullWidth  onClose={toggleDialogAction} aria-labelledby="simple-dialog-title" open={toggleDialog} >
      <DialogTitle disableTypography className={classes.title} >
        <Grid container alignItems={'center'}  alignContent={'center'}>
          <Grid item xs={12} md={4}>
            <Typography component="span" variant="overline" inline>{signup ? "Sign up" : "Sign in"}</Typography>
          </Grid>
          <Grid item xs={12} md={8} className={classes.textRight}>
            <Typography component="span" variant="overline" inline>{!signup ? "Don't have an account?" : "Already have an account?" }   </Typography>
            <Button variant="outlined" color="inherit" onClick={handleSignUp}>{!signup ? "Sign up" : "Sign in"}</Button>
          </Grid>
          <Grid item xs={12} className={classes.marginTop}><Divider /></Grid>
        </Grid>
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <Grid container alignItems={'center'}  alignContent={'center'}>
          {signup && (
            <Grid item xs={12} md={6}>
              <FormControl fullWidth >
                <InputLabel htmlFor="name" error={errorName} >Full Name</InputLabel>
                <Input
                  id="name"
                  className={classes.margin}
                  value={name}
                  error={errorName} 
                  onChange={handleNameChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  }
                />
                {errorName && (<FormHelperText >at least 4 characters</FormHelperText>)}
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth >
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                type="email"
                className={classes.margin}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} className={ signup ? classes.marginTop : '' }>
            <FormControl fullWidth >
              <InputLabel htmlFor="password" error={passwordError}>Password</InputLabel>
              <Input
                id="password"
                type="password"
                error={passwordError}
                className={classes.margin}
                value={password}
                onChange={handlePasswordChange}
                onKeyDown={handlePasswordChange}
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                }
              />
              {passwordError && (<FormHelperText >At least 6 characters</FormHelperText>)}
            </FormControl>
          </Grid>
          {signup && (
            <Grid item xs={12} md={6}>
              <FormControl fullWidth >
                <InputLabel htmlFor="confirm" error={passwordError}>Confirm Password</InputLabel>
                <Input
                  id="confirm"
                  type="password"
                  error={passwordError}
                  className={classes.margin}
                  value={confirm}
                  onChange={handlePasswordConfirmChange}
                  onKeyDown={handlePasswordConfirmChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  }
                />
                {passwordError && (<FormHelperText >At least 6 characters</FormHelperText>)}
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12} md={12} className={classes.logginBtn}>
              
              <Button color="primary" variant="contained" size="medium" disabled={loading} onClick={handleLogin}>{ loading && <CircularProgress size={24} style={{marginRight: '10px'}}/> } {signup ? "Sign up" : "Login"}</Button>
            </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
  
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  handleClose: PropTypes.func,
  isOpen: PropTypes.bool,
};


const mapStateToProps = state => ({
    user: state.user,
    toggleDialog: state.toggleDialog
});

const mapDispatchToProps = dispatch => bindActionCreators({ login, register, toggleDialogAction: toggleDialog }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
