import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import {useDropzone} from 'react-dropzone'

import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from "@material-ui/core/Button";

import CircularProgress from '@material-ui/core/CircularProgress';

import Auth from '../hoc/Auth'


const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: "#FAFAFA",
        width: '100%',
        position: 'absolute',
        top: '0',
        zIndex: -10,
        overflow: 'auto',
        height: '100%'
        
    },
    sad: {
        marginTop: '6em',
        padding: '0 1em',
        [theme.breakpoints.down("md")]: {
          marginBottom: "2em"
        },
        [theme.breakpoints.down("xs")]: {
          marginBottom: "1.5em"
        }
    },
    card: {
        padding: '1.5em 2em 0 2em',
        backgroundColor: '#0C7C8A',
        marginTop: '3em',
        minWidth: '50em',
        boxShadow: '0px 0px 3px 2px rgba(0,0,0,0.75)',
        [theme.breakpoints.down("sm")]: {
            minWidth: "25em"
          },
          [theme.breakpoints.down("xs")]: {
            minWidth: "8em",
            padding: '0'
          }
    },
    coverPhoto: {
        width: '20em',
        height: '7em',
        backgroundColor: theme.palette.primary.main,
        borderRadius: '10px',
        marginBottom: '2em'
    },
    input: {
        display: 'none'
    },
    coverButton : {
        color: 'white',
        borderRadius: '10px',
        border: '1px solid white',
    },
}))

const CreateCommunity = (props) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const classes = useStyles()

    useEffect(() => {
        props.setValue(1)
    })

    

    const onDrop = useCallback(acceptedFile => {
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append('file', acceptedFile[0])
        setLoading(true)
        axios.post('/api/community/uploadimage', formData, config , {withCredentials: true})
        .then(res => {
            setFile(res.data)
            setLoading(false)
        })

      }, [])
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        multiple: false,
    })

    const handleSubmit = () => {
        const dataToSubmit = {
            title,
            description,
            image: file.url
        }

        if(props.user.isAuth) {
            axios.post('/api/community/add-community', dataToSubmit, {withCredentials: true})
            .then(res => {
                props.history.push(`/community/${res.data.doc._id}`)
            })
        } else props.history.push('/joinus')
        
    }
    

    return (
        <div className={classes.container}>
            <Grid  container  direction='column' alignContent='center' className={classes.sad}>
                <Grid item>
                    <Typography
                        variant='h2'
                        align='center'
                        style={{letterSpacing: 1.5}}
                    >
                        Create a Community
                    </Typography>
                </Grid>
                <Grid item>
                    <Card className={classes.card}  >
                    <CardContent>
                        <Grid item container direction='column' >
                            <Grid item>
                                <Card className={classes.coverPhoto} style={{backgroundImage: file ? `url(${file.url})` : null, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                                    <CardActions style={{height: '100%'}}>      
                                        <section {...getRootProps()} style={{margin: 'auto'}}>
                                            <input {...getInputProps()} />
                                            {
                                                isDragActive ?
                                                <p>Drop the image here...</p> :
                                                (loading ? <CircularProgress /> : (<Button  
                                                    variant="outlined" 
                                                    className={classes.coverButton}   
                                                    component="span">
                                                Add Cover Photo
                                                </Button>))

                                            }
                                        </section>                                
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item>
                                <TextField
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    label="What will be your community's title"
                                    fullWidth
                                    type='text'
                                    id="title"
                                    required
                                    name="title"
                                />
                            </Grid>
                            <Grid item style={{marginTop : '2em'}}>
                                <TextField
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    label="Describe it in 200 characters or less"
                                    fullWidth
                                    type='text'
                                    id="description"
                                    required
                                    name="description"
                                />
                            </Grid>
                            <Grid item>
                                <CardActions>
                                    <Button
                                        style={{marginTop : '3em'}}
                                        onClick={handleSubmit}
                                        disabled={(file && title && description) ? false : true}
                                    >
                                    Create Community
                                    </Button>
                                </CardActions>
                            </Grid>
                        </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default Auth(CreateCommunity, false)
