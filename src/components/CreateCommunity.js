import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import { makeStyles,useTheme } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from "@material-ui/core/Button";


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
    }
}))

const CreateCommunity = (props) => {
    const classes = useStyles()
    const theme = useTheme()

    useEffect(() => {
        props.setValue(1)
    })


    return (
        <div className={classes.container}>
            <Grid  container  direction='column' alignContent='center' className={classes.sad}>
                <Grid item>
                    <Typography
                        variant='h2'
                        align='center'
                        style={{letterSpacing: 1.5}}
                    >
                        New Community
                    </Typography>
                </Grid>
                <Grid item>
                    <Card className={classes.card}  >
                    <CardContent>
                        <Grid item container direction='column' >
                            <Grid item>
                                <Card className={classes.coverPhoto}>
                                    <CardActions style={{height: '100%'}}>
                                        
                                        
                                        <Button />
                                        
                                       
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item>
                                <TextField
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
                                    label="Describe it"
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
                                    >
                                    Login</Button>
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

export default Auth(CreateCommunity,)
