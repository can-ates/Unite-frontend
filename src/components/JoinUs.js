import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { Typography } from "@material-ui/core";

import {validateForm} from "../utils/FormActions"
import gradient from '../assets/Bullseye-Gradient.svg'
//background-color: #517147;

//background-attachment: fixed;
//background-size: cover;



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
        }
    },
    root: {
        marginTop: '2em',
        background: 'transparent',
        minWidth: '25em',
        boxShadow: '0px 0px 17px 10px rgba(0,0,0,0.75);',
    },
    loginFields: {
        padding: '0 3em'
    },
    
}))


const JoinUs = (props) => {
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("")

    const [email, setEmail] = useState("");
    const [emailHelper, setEmailHelper] = useState("");
  
    const [password, setPassword] = useState("");
    const [passwordHelper, setPasswordHelper] = useState("");


    const classes = useStyles();
    const theme = useTheme();


    const handleSubmit = () => {
        validateForm({name, lastname, email, password}, (data) =>{
            
            
            data.registerSuccess ? props.history.push('/') : data.errors.map((dt) => {
                if(dt.param === 'email') setEmailHelper(dt.msg)
                if(dt.param === 'password') setPasswordHelper(dt.msg)

                
            }) 
        })
    }
    

    return (
        <div className={classes.hero}>
            <div  style={{position: 'relative', height: '100%'}}>
                <Grid  container direction='row' >
                    <Grid lg={6} item container direction='column' alignItems='center' className={classes.sad}>
                        <Grid item>
                            <Typography
                                variant='h2'
                                align='center'
                                style={{letterSpacing: 2}}
                            >
                                Register
                            </Typography>
                        </Grid>
                        <Card className={classes.root}>
                            <CardContent>
                                <Grid item direction='column' className={classes.loginFields}>
                                    <Grid item>
                                        <Typography
                                            variant='body2'
                                            align='center'
                                        >
                                            :)
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            label="Name"
                                            fullWidth
                                            required
                                            type='text'
                                            error={false}
                                            helperText='anan'
                                            id="name"
                                            name="name"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            style={{ marginBottom: "0.5em", marginTop: '0.5em' }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            label="Last name"                                    
                                            fullWidth
                                            type='text'
                                            required
                                            error={false}
                                            helperText='anan'
                                            id="lastname"
                                            name="lastname"
                                            value={lastname}
                                            onChange={e => setLastName(e.target.value)}
                                            style={{ marginBottom: "0.5em" }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            label="Email"
                                            fullWidth
                                            type='email'
                                            error={emailHelper ? true : false}
                                            helperText={emailHelper ? emailHelper : null}
                                            id="email"
                                            required
                                            name="email"
                                            value={email}
                                            onChange={e => {setEmail(e.target.value); setEmailHelper('')}}
                                            style={{ marginBottom: "0.5em" }}
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
                                            id="password"
                                            name="password"
                                            value={password}
                                            onChange={e => {setPassword(e.target.value); setPasswordHelper('')}}
                                            style={{ marginBottom: "0.5em" }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <CardActions>
                                            <Button
                                                onClick={() => handleSubmit()} 
                                                color='primary' 
                                                variant='contained' 
                                                style={{margin: '1em auto 0 auto', minWidth: '12em', color: 'white'}} 
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
                    <Grid lg={6} item container direction='column' className={classes.sad}>
                        <Grid item>
                            <Typography
                                variant='h2'
                                align='center'
                                style={{letterSpacing: 1.5}}
                            >
                                Login
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default JoinUs
