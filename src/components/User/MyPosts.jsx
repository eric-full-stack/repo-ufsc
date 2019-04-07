import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import Slide from '@material-ui/core/Slide';
import { deletePost } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import api from '../../services/api';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function MyPosts(props){
  const { classes, isOpen, handleOpenMyPosts, user, deletePost} = props;
  const [open, setOpen] = useState(isOpen)
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  useEffect(() => {
    async function fetchMyPosts(){
      const res = await api.get('posts/byUser', { headers: { Authorization: `Bearer ${user.token}` }})
      setPosts(res.data.posts)
    }
    if(user)
      fetchMyPosts()
  }, [user])

  const handleClose = () => {
    setOpen(!open)
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleOpenMyPosts}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={handleOpenMyPosts} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              My uploaded files
            </Typography>
            <Button color="inherit" onClick={handleOpenMyPosts}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {posts.map(post => (
            <div key={post.id}>
              <ListItem button >
                <Avatar>
                  <ImageIcon />
                </Avatar>
                <ListItemText primary={post.title} secondary={`Description: ${post.description}  - Discipline: ${post.discipline.title}  -   Likes: ${post.likes}`}/>
                <ListItemSecondaryAction>
                  <IconButton aria-label="Delete" onClick={() => deletePost(post.id, user.token)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Dialog>
    </div>
  );
  
}

MyPosts.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({ deletePost }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyPosts));
