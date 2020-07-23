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
        zIndex: '0',
        borderRadius: '15px',
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
    },
    showButton: {
        color: 'white',
        minWidth: '30em',
        padding: '0.7em 0',
        borderRadius: '15px',
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
    },
    communityContainer : {
        backgroundColor: '#FAFAFA',
    }
}))
    

const Communities = (props) => {
    const classes = useStyles()
    const theme = useTheme()


    const [communities, setCommunities] = useState([])
    const [skip, setSkip] = useState(0)
    

    useEffect(() => {
        axios.get('/api/allCommunities?limit=9&skip=0&sortBy=members&order=desc').then((res) => {
            setCommunities(res.data.community)
            console.log(res.data.community)
        })
    }, [])

    const showCards = (a) => {
        let sk = skip + a 

        axios.get(`/api/allCommunities?limit=9&skip=${sk}&sortBy=members&order=desc`).then((res) => {
            setCommunities(res.data.community)
            setSkip(sk)
        })
    }



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
                                size='large'
                                onClick={() => props.setValue(3)}
                                
                                >
                                Create a community
                            </Button>
                                           
                    </Grid>
                </Grid>
            </div>
            <Grid container direction='column' className={classes.communityContainer}>
                    <Grid item>
                        <Typography variant='h4' style={{textAlign: 'center', margin: '2.5em 0'}}>Communities of UNITE</Typography>
                    </Grid>
                    <Grid item container direction='row' justify='space-between' >
                    {communities ? communities.map((community, i) => (
                        <Grid align='center' lg={4} item key={community.title} style={{marginBottom: '4em'}} >
                            <CardCommunity
                                members={community.members.length}
                                title={community.title}
                                description={community.description}
                                founder={community.founder}
                                id={community._id}
                                image={community.image}
                                buttonText='Join Community!'
                            />
                        </Grid>   
                    )) : null}
                    </Grid>
                        <Grid item container direction='row' justify='space-between'>
                            <Grid item align='center' lg={4}>
                                <Button disabled={skip === 0 ? true  : false} onClick={() => showCards(-9)} variant='outlined' className={classes.showButton}>Show Less</Button>
                            </Grid>
                            <Grid item align='center' lg={4}>
                                
                            </Grid>
                            <Grid item align='center' lg={4}>
                                <Button disabled={communities.length < 6 ? true : false} onClick={() => showCards(9)} variant='outlined' className={classes.showButton}>Show More</Button>
                            </Grid>            
                        </Grid>
                    </Grid>
        </div>
    )
}

export default Communities
