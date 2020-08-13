import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import { makeStyles,useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from '@material-ui/core/Hidden';

import people from '../assets/people.jpg'
import ahoy from '../assets/Rainbow-Vortex.svg'

import SearchCommunity from './utils/search_community'
import Auth from '../hoc/Auth'
import CardCommunity from '../components/utils/card_community'
import Footer from '../components/ui/Footer'

const useStyles = makeStyles(theme => ({
    hero: {
        [theme.breakpoints.down("md")]: {
            backgroundColor: '#175177',
            height: '85vh',
            width: '100%',
            position: 'absolute',
            top: '0',
            zIndex: -1,
            boxShadow: '0px 12px 42px -13px rgba(3,1,0,1)',
          },
        [theme.breakpoints.up("md")]: {
            backgroundImage: `url(${people})`,
            backgroundPosition: 'center',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: '85vh',
            width: '100%',
            position: 'absolute',
            top: '0',
            zIndex: -1,
            boxShadow: '0px 12px 42px -13px rgba(3,1,0,1)',
        },
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
    uniteButton: {
        color: 'white',
        margin: '0 auto',
        backgroundColor: theme.palette.primary.main,
        minWidth: '15em',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
        fontFamily: 'Raleway',
        fontWeight: 600,
        fontSize: '1.25rem',
    },
    heroButton: {
        color: 'white',
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: '0.75rem'
          }
    },
    findCommunity: {
        [theme.breakpoints.down("xs")]: {
            marginTop: "1.5em",
            height: '200px',
          },
        backgroundImage: `url(${ahoy})`,
        backgroundPosition: 'center',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: '300px',
        boxShadow: '0px 0px 27px -5px rgba(3,1,0,1)',
        marginTop: '4em'
    },
}))
    




const Home = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));


    const [communities, setCommunities] = useState(null)

    useEffect(() => {
        axios.get('/api/allCommunities?limit=3&sortBy=members&order=desc', {withCredentials: true})
        .then((res) => {
            setCommunities(res.data.community)
        })
    }, [])

    

    return (
        <div className={classes.hero}>
            <div  style={{position: 'relative', height: '100%', display: 'flex'}}>
            <Grid container direction='row'  className={classes.sad}>
                <Grid item container md={3}> 
                    <Grid container direction='column' alignItems='center' justify={matchesXS ? 'center' : 'space-around'}>
                        <Grid item>
                            <Typography variant={matchesXS ? 'body2' : 'h5'} align='center' >
                                Build a great online community
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={matchesXS ? 'body2' : 'h5'} style={{margin: matchesXS && '1em 0'}} align='center'>
                                Unite enables you to create amazing and successful communities
                            </Typography>
                        </Grid>
                        <Grid item>
                        <Button
                            component={Link}
                            to="/create-community"
                            className={classes.heroButton}
                            variant="contained"
                            size={matchesXS ? 'small' : 'medium'}
                            onClick={() => props.setValue(3)}
                            
                            >
                            Create your community
                        </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Hidden smDown>
                    <Grid md={6} item container direction='column' alignItems='center' justify='space-between' >
                        <Grid item >
                            <Typography variant='h3' align='center'>
                                All communities in one place
                            </Typography>
                        </Grid>
                    </Grid>
                </Hidden>
                <Grid item container md={3}> 
                    <Grid container direction='column' alignItems='center' justify={matchesXS ? 'center' : 'space-around'}>
                        <Grid item>
                            <Typography variant={matchesXS ? 'body2' : 'h5'} align='center'>
                            Experience more
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={matchesXS ? 'body2' : 'h5'} style={{margin: matchesXS && '1em 0'}} align='center'>
                            Communities can be easily discovered 
                            </Typography>
                        </Grid>
                        <Grid>
                        <Button
                            component={Link}
                            to="/communities"
                            className={classes.heroButton}
                            variant="contained"
                            size={matchesXS ? 'small' : 'medium'}
                            onClick={() => props.setValue(1)}
                            
                            >
                            Explore communities
                        </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>  
            </div>
            <Grid container direction='column' style={{marginTop: '2.5em' ,backgroundColor: '#f9f9f9'}}>
                <Grid item style={{marginBottom: '3em'}}>
                    <Typography variant={matchesXS ? 'h6' : 'h4'} style={{textAlign: 'center',}}>Best Communities of UNITE</Typography>
                </Grid>
                <Grid item container direction='row' justify='space-around' >
                {communities ? communities.map((community, i) => (
                    <Grid item align='center' lg={4} style={{marginBottom: matchesSM ? '3em' : null}} key={community.title} >
                        <CardCommunity
                            members={community.members.length}
                            title={community.title}
                            description={community.description}
                            founder={community.founder}
                            id={community._id}
                            image={community.image}
                            buttonText='Join Community!'
                            isAuth={true}
                        />
                    </Grid>   
                )) : null}
                </Grid>
                <Grid item container direction='column' alignItems='center' className={classes.findCommunity}>
                    <Grid item>
                        <Typography variant={matchesXS ? 'h5' : 'h4'} style={{margin: '1em 0', color: 'white'}}>Find Communities</Typography>
                    </Grid>
                    <Grid item>
                        <SearchCommunity />
                    </Grid>
                </Grid>
                <Grid item>
                    <Footer       
                    />
                </Grid>
            </Grid>
            
        </div>
    )
}

export default Auth(Home, true)
