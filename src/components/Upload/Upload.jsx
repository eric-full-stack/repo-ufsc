import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';
import CheckIcon from '@material-ui/icons/CheckCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import ChipInput from 'material-ui-chip-input'
import Dropzone from 'react-dropzone';
import DropContainer from './DropContainer';
import UploadMessage from './UploadMessage';
import FileList from './FileList';
import { uniqueId } from 'lodash';
import filesize from 'filesize';
import SelectInput from '../Select/SelectInput';
import api from '../../services/api';
import { getPosts } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const styles = {
  appBar: {
    position: 'fixed',
  },
  flex: {
    flex: 1,
  },
  root: {
    marginTop: 10,
    flexGrow: 1
  },
  marginTop: {
    marginTop: 80
  },
  margins: {
    marginTop: 20,
    marginBottom: 20,
  },
  '@keyframes2 jump': {
    '0%': {transform:' translate3d(0,0,0) scale3d(1,1,1)'},
    '40%': {transform: 'translate3d(0,30%,0) scale3d(.7,1.5,1)'},
    '100%': {transform: 'translate3d(0,100%,0) scale3d(1.5,.7,1)'},
  },
  'jump': {
    transformOrigin: '50% 50%',
    animation: 'jump .5s linear alternate infinite'
  },
  pulse: {
    boxShadow: '0 0 0 rgba(204,169,44, 0.4)',
    animation: 'pulse 2s infinite',
  },

  '@keyframes pulse': {
    '0%': {
      '-webkit-box-shadow':' 0 0 0 0 rgba(204,169,44, 0.4)',
    },
    '70%': {
      '-webkit-box-shadow': '0 0 0 10px rgba(204,169,44, 0)',
    },
    '100%': {
      '-webkit-box-shadow': '0 0 0 0 rgba(204,169,44, 0)',
    }
  },
  '@keyframes3 pulse': {
    '0%': {
      '-moz-box-shadow': '0 0 0 0 rgba(204,169,44, 0.4)',
      'box-shadow': '0 0 0 0 rgba(204,169,44, 0.4)',
    },
    '70%': {
        '-moz-box-shadow': '0 0 0 10px rgba(204,169,44, 0)',
        'box-shadow': '0 0 0 10px rgba(204,169,44, 0)',
    },
    '100%': {
        '-moz-box-shadow': '0 0 0 0 rgba(204,169,44, 0)',
        'box-shadow': '0 0 0 0 rgba(204,169,44, 0)',
    }
  }

};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function FullScreenDialog(props) {
  const { open: isOpen, classes, handleOpen, disciplinesData, discipline, user, getPosts } = props
  
  const [files, setUploadedFiles] = useState([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [description, setDescription] = useState('')
  const [teacher, setTeacher] = useState('')
  const [teachers, setTeachers] = useState([])
  const [disciplineSelect, setDiscipline] = useState('')
  const [disciplines, setDisciplines] = useState([])
  const [tags, setTags] = useState([])
  
  useEffect( () => {
    async function fetchTeachers(){
      const response = await api.get(`/teachers`)
      const data = await response.data
      let newData = data.map( teacher => {
        return {value: teacher.name, label: teacher.name, obj: teacher}
      })
      setTeachers(newData)
    }
    
    let newData = disciplinesData.map( discipline => {
      return {value: discipline.title, label: discipline.title}
    })
    setDisciplines(newData)
    
    fetchTeachers()
  }, [])

  useEffect( () => {
    let newData = disciplinesData.map( discipline => {
      return {value: discipline.title, label: discipline.title, obj: discipline}
    })
    setDisciplines(newData)
  }, [disciplinesData])

  useEffect( () => {
    setDiscipline({value: discipline.title, label: discipline.title, obj: discipline})
  }, [discipline])

  const handleUpload = fileslist => {
    const uploadedFiles = fileslist.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      uploaded: false,
      error: false,
      url: null,
    }))
    
    setUploadedFiles(files.concat(uploadedFiles))
  
  };

  async function processUpload(){
    setLoading(true)
    const data = new FormData() 

    data.append('title', title)
    data.append('description', description)
    data.append('teacher', JSON.stringify(teacher.obj) || null)
    data.append('discipline', JSON.stringify(disciplineSelect.obj) || null)
    data.append('user', JSON.stringify(user.user) || null)

    for (let i = 0; i < tags.length; i++) {
        data.append('tags[]', tags[i])
    }

    for (let i = 0; i < files.length; i++) {
      data.append('files[]', files[i].file)
    }

    await api.post('posts', data, { headers: { Authorization: `Bearer ${user.token}` }}).then( (res) => {
      setUploadedFiles([])
      setTitle('')
      setDescription('')
      setTags([])
    })
    await getPosts(disciplineSelect.obj._id)
    setDone(true)
    setLoading(false)
    setTimeout(()=> handleOpen(false), 1000)
  }

  const handleDeleteFile = file => {
    setUploadedFiles(files.filter(_file => {
      return file !== _file
    }))
  }

  const handleChange = name => event => {
    switch(name) {
      case 'title':
        if(event.target.value.length <= 40)
          setTitle(event.target.value)
        break
      case 'description':
        if(event.target.value.length <= 150)
          setDescription(event.target.value)
        break
      case 'teacher':
        setTeacher(event)
        break
      case 'discipline':
        setDiscipline(event)
        break
      default:
        return null
    }
  };

  const handleAddChip = chip => {
    if(tags.length < 5)
      setTags(tags.concat(chip))
  }

  const handleDeleteChip = (chip, index) => {
    setTags(tags.filter(tag => {
      return tag !== chip
    }))
  }
  
  function renderDragMessage(isDragActive, isDragReject){
    if(!isDragActive){
      return <UploadMessage>Drag your files here...</UploadMessage>
    }

    if(isDragReject){
      return <UploadMessage type="error">Archive not suported</UploadMessage>
    }

    return <UploadMessage type="success">Drop your files here</UploadMessage>
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={handleOpen}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={handleOpen} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Upload files
            </Typography>
            { title && description && tags.length > 0 && files.length > 0 && !loading && (
              <Tooltip title={"Salvar"}>
                <IconButton aria-label="Delete" className={classes.pulse} color="inherit" onClick={processUpload}>
                  <SaveIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            )}
            
          </Toolbar>
        </AppBar>
        { !loading && !done && (
          <Grid container  alignItems={'center'} alignContent={'center'} className={classes.marginTop} >
            <Grid item lg={3} />
            <Grid item xs={12} lg={6} >

              <TextField
                id="outlined-title"
                label="Title"
                value={title}
                onChange={handleChange('title')}
                margin="normal"
                variant="outlined"
                fullWidth
                required
              />

              <TextField
                id="outlined-description"
                label="Description"
                value={description}
                onChange={handleChange('description')}
                margin="normal"
                variant="outlined"
                multiline
                rows="2"
                required
                rowsMax="4"
                fullWidth
              />

              <SelectInput name={'teacher'} handleChange={handleChange.bind(this)} label={'Teacher'} value={teacher} options={teachers} />
              
              <SelectInput name={'discipline'} handleChange={handleChange.bind(this)} label={'Discipline'} value={disciplineSelect} options={disciplines} />

              <ChipInput
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip, index) => handleDeleteChip(chip, index)}
                fullWidthInput
                fullWidth
                label={"Tags"}
                required
                variant="outlined"
              />
              <Divider className={classes.margins} />
              <Dropzone accept="application/pdf,image/*" onDropAccepted={handleUpload}>
                { ({ getRootProps, getInputProps, isDragActive, isDragReject}) => (
                  <DropContainer
                    {...getRootProps()}
                    isDragActive={isDragActive}
                    isDragReject={isDragReject}
                  >
                    <input {... getInputProps()} required/>
                    {renderDragMessage(isDragActive, isDragReject)}
                  </DropContainer>
                )}
              </Dropzone>
              { !!files.length && (
                <FileList files={files} handleDeleteFile={handleDeleteFile}/>
              )}          
            </Grid>
            <Grid item lg={3} />
          </Grid>
        )}
        {loading && (
          <Grid container className={classes.root} alignItems={'center'}  alignContent={'center'} direction={'row'} justify={'center'} >
            
             <CircularProgress size={200} style={{marginRight: '10px'}}/> 
              
          </Grid>
        )}
        {done && (
          <Grid container className={classes.root} alignItems={'center'}  alignContent={'center'} direction={'row'} justify={'center'} >
            
            <CheckIcon style={{ fontSize: 200 }} color="primary" className={classes.jump}/>
              
          </Grid>
        )}
      </Dialog>
    </div>
  );
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({ getPosts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FullScreenDialog));
