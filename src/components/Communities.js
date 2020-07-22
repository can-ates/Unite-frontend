import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import { makeStyles,useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


import ahoy1 from '../assets/Sun-Tornado1.svg'

import SearchCommunity from './utils/search_community'
import Auth from '../hoc/Auth'
import CardCommunity from '../components/utils/card_community'

const useStyles = makeStyles(theme => ({
    searchContent: {
        backgroundImage: `url(${ahoy1})`,
        backgroundPosition: 'center',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: '60vh',
        width: '100%',
        position: 'absolute',
        top: '0',
        zIndex: -1,
        boxShadow: '0px 12px 42px -13px rgba(3,1,0,1)'
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
    createContent: {
        marginTop: '3em',
    },
    heroButton: {
        color: 'white',
        textAlign: 'center',
        zIndex: '-1',
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
    },
}))
    

const Communities = (props) => {
    const classes = useStyles()
    const theme = useTheme()


    return (
        <div className={classes.searchContent}>
            <div style={{position: 'relative', height: '100%', display: 'flex'}}>
                <Grid container direction='column' alignItems='center' className={classes.sad}>
                    <Grid item>
                        <Typography variant='h4' style={{margin: '1em 0', color: 'white'}}>Find Communities</Typography>
                    </Grid>
                    <Grid item>
                        <SearchCommunity />
                    </Grid>
                    <Grid align='center' item className={classes.createContent}>
                        <Typography variant='body2'>If you could not find what you're looking for</Typography>
                        <Typography style={{marginBottom: '1em'}} variant='body1' align='center'>Create your own community</Typography>
                        
                            <Button
                                component={Link}
                                to="/create-community"
                                className={classes.heroButton}
                                variant="contained"
                                size='medium'
                                onClick={() => props.setValue(3)}
                                
                                >
                                Create a community
                            </Button>
                                           
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Communities
