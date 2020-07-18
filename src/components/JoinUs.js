import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {connect} from 'react-redux'

import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { Typography } from "@material-ui/core";


import gradient from '../assets/shattered-island.gif'
import * as actions from '../actions/user'

import Auth from '../hoc/Auth'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles(theme => ({
    hero: {
        backgroundImage: `url(${gradient})`,
        backgroundPosition: 'center',
        backgroundSize: "cover",
        height: '100vh',
        width: '100%',
        position: 'absolute',
        top: '0',
        zIndex: -10,
        overflow: 'auto'
        
    },
    sad: {
        marginTop: '6.5em',
        [theme.breakpoints.down("md")]: {
          marginTop: '6em'
        },
        [theme.breakpoints.down("xs")]: {
          marginTop: "6em"
        },
    },
    root: {
        marginTop: '2em',
        background: 'transparent',
        minWidth: '25em',
        boxShadow: '0px 0px 5px 2px rgba(255,255,255,0.75);',
        '&:hover' : {
            boxShadow: '0px 0px 5px 5px rgb(255, 186, 96, 0.75)'
        }
    },
    root1: {    
        marginTop: '2em',
        minWidth: '25em',
        background: 'transparent',
        boxShadow: '0px 0px 5px 2px rgba(255,255,255,0.75);',
        '&:hover' : {
            boxShadow: '0px 0px 5px 5px rgb(255, 186, 96, 0.75)'
        }
    },
    Fields: {
        padding: '0 3.5em 2em 3.5em'
    },
    errorMessage: {
        position: 'relative',
        minWidth: '14em',
        padding: '0',
        marginTop: '5em',
    }
    
}))


const JoinUs = (props) => {

    const [open, setOpen] = useState(false);

    const handleMessage = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    //REGISTER CREDENTIALS
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("")

    const [email, setEmail] = useState("");
    const [emailHelper, setEmailHelper] = useState("");
  
    const [password, setPassword] = useState("");
    const [passwordHelper, setPasswordHelper] = useState("");

    //LOGIN CREDENTIALS
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [loginError, setLoginError] = useState('')


    const classes = useStyles();
    const theme = useTheme();


    const handleRegister =  () => {
        props.registerUser({name, lastname, email, password}, (data) => {
            if(data.errors) {
               
                data.errors.map((err) => {
                    if(err.param === 'email') setEmailHelper(err.msg)
                    if(err.param === 'password') setPasswordHelper(err.msg)
                })
            } else props.history.push('/')
        })
    }

    const handleLogin =  () => {
        props.loginUser({email: loginEmail, password: loginPassword}, (data) => {
            if(data.loginSuccess === false){
                setLoginError(data.message)
                handleMessage()
            } 
        })
     }

    return (
        <div className={classes.hero}>
            <div  style={{position: 'relative', height: '100%'}}>
                <Grid  container direction='row' >
                    <Grid  item container direction='column' alignItems='center' className={classes.sad} lg={6}>
                        <Grid item>
                            <Typography
                                variant='h2'
                                align='center'
                                style={{letterSpacing: 2}}
                            >
                                Register
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Card className={classes.root}  >
                                <CardContent>
                                    <Grid item container direction='column' className={classes.Fields}>
                                        <Grid item>
                                            <Typography
                                                variant='body2'
                                                align='center'
                                                style={{marginTop: '1.5em'}}
                                            >
                                                xd
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                label="Name"
                                                fullWidth
                                                required
                                                type='text'
                                                id="name"
                                                name="name"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                style={{ marginBottom: "1.5em", marginTop: '2em' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                label="Last name"                                    
                                                fullWidth
                                                type='text'
                                                required
                                                id="lastname"
                                                name="lastname"
                                                value={lastname}
                                                onChange={e => setLastName(e.target.value)}
                                                style={{ marginBottom: "1.5em" }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                label="Email"
                                                fullWidth
                                                type='email'
                                                error={emailHelper ? true : false}
                                                helperText={emailHelper ? emailHelper : null}
                                                id="emailRegister"
                                                required
                                                name="email"
                                                value={email}
                                                onChange={e => {setEmail(e.target.value); setEmailHelper('')}}
                                                style={{ marginBottom: "1.5em" }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                label="Password"
                                                fullWidth
                                                type='password'
                                                error={passwordHelper ? true : false}
                                                helperText={passwordHelper ? passwordHelper : null}
                                                required
                                                id="passwordRegister"
                                                name="password"
                                                value={password}
                                                onChange={e => {setPassword(e.target.value); setPasswordHelper('')}}
                                                style={{ marginBottom: "1em" }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <CardActions>
                                                <Button
                                                    onClick={() => handleRegister()}
                                                    color='primary' 
                                                    variant='contained' 
                                                    style={{margin: '2em auto 0 auto', minWidth: '15em', color: 'white'}} 
                                                    size="large"
                                                    disabled={(name && lastname && password && email) ? false : true}
                                                >
                                                Register</Button>
                                            </CardActions>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>  
                    </Grid>
                    <Grid  item container  direction='column' alignItems='center' className={classes.sad} lg={6}>
                        <Grid item>
                            <Typography
                                variant='h2'
                                align='center'
                                style={{letterSpacing: 1.5}}
                            >
                                Login
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Card className={classes.root1}  >
                            <CardContent>
                                <Grid item container direction='column' className={classes.Fields}>
                                    <Grid item>
                                        <Typography
                                            variant='body2'
                                            align='center'
                                            style={{marginTop: '1.5em'}}
                                        >
                                            Already have an account ?
                                        </Typography>
                                    </Grid>
                                    <Grid item >
                                        <Snackbar className={classes.errorMessage} open={open} autoHideDuration={6000} onClose={handleClose}>
                                            <Alert onClose={handleClose} severity="error">
                                            {loginError}
                                            </Alert>
                                        </Snackbar>
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            label="Email"
                                            fullWidth
                                            type='email'
                                            id="emailLogin"
                                            required
                                            name="email"
                                            value={loginEmail}
                                            onChange={e => setLoginEmail(e.target.value)}
                                            style={{ marginBottom: "1.5em", marginTop: '2em' }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            label="Password"
                                            fullWidth
                                            type='password'
                                            required
                                            id="passwordLogin"
                                            name="password"
                                            value={loginPassword}
                                            onChange={e => setLoginPassword(e.target.value)}
                                            style={{ marginBottom: "1em" }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <CardActions>
                                            <Button
                                                onClick={() => handleLogin()}
                                                color='primary' 
                                                variant='contained' 
                                                style={{margin: '2em auto 0 auto', minWidth: '15em', color: 'white'}} 
                                                size="large"
                                                disabled={(loginPassword && loginEmail) ? false : true}
                                            >
                                            Login</Button>
                                        </CardActions>
                                    </Grid>
                                </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
    }

    function mapStateToProps (state) {
        return {
            user: state.user
        }
    }

export default Auth(connect(mapStateToProps, actions)(JoinUs), true)
