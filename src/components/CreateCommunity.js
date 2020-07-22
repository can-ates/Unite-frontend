import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {useDropzone} from 'react-dropzone'

import { makeStyles,useTheme } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from "@material-ui/core/Button";

import CircularProgress from '@material-ui/core/CircularProgress';

import Auth from '../hoc/Auth'
import sunTornado from '../assets/Sun-Tornado.svg'



const useStyles = makeStyles(theme => ({
    container: {
        backgroundImage: `url(${sunTornado})`,
        backgroundPosition: 'center',
        backgroundSize: "cover",
        height: '100vh',
        width: '100%',
        position: 'absolute',
        top: '0',
        zIndex: -10,
        overflow: 'auto',
        
        
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
        backgroundColor: 'transparent',
        marginTop: '3em',
        minWidth: '50em',
        boxShadow: '0px 0px 1px 3px rgb(255, 186, 96, 0.75)'
    },
    coverPhoto: {
        width: '20em',
        height: '7em',
        backgroundColor: theme.palette.secondary.dark,
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
    }
}))

const CreateCommunity = (props) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const classes = useStyles()
    const theme = useTheme()

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
        axios.post('/api/community/uploadimage', formData, config)
        .then(res => {
            console.log(res.data)
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

        axios.post('/api/community/add-community', dataToSubmit)
        .then(res => {
            console.log(res.data)
        })
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
                                    variant="outlined"
                                    margin='normal'
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    label="Describe it in 200 characters or less"
                                    fullWidth
                                    type='text'
                                    id="description"
                                    required
                                    name="description"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item>
                                <CardActions>
                                    <Button
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

export default Auth(CreateCommunity, true)
