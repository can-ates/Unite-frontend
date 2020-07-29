import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import { makeStyles,useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import useMediaQuery from "@material-ui/core/useMediaQuery";


import SearchCommunity from './utils/search_community'
import Auth from '../hoc/Auth'
import CardCommunity from './utils/card_community'
import Footer from './ui/Footer'


const useStyles = makeStyles(theme => ({
    dashboardWrapper: {
        backgroundColor: '#FAFAFA',
             
    },
    dashboard: {
        width: '90%'
    },
    dashboard__followed : {
        '&:hover': {
            cursor : 'pointer',
            backgroundColor: '#FAFAFA'
        }
    },
    followed__title : {
        fontWeight: 700,
        marginLeft: '2em',
        fontSize: '1.1rem',
        color: theme.palette.secondary.main
    },
    followed__members : {
        fontWeight: 500,
        marginLeft: '3em',
        fontSize: '0.90rem',
        textAlign: 'end',
        color: theme.palette.secondary.main
    },  
    dashboard__followed_icon : {
        objectFit: 'cover',
        height: '100px',
        width: '100%'
    }
}))
    

const UserDashboard = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

    const [followed, setFollowed] = useState([])

    useEffect(() => {
        setFollowed(props.user.memberships)
    }, [])

    const handleRoute = (id) => {
        props.history.push(`/community/${id}`)
    }

    return (
        <div className={classes.dashboardWrapper}>
            <Grid container direction='row' className={classes.dashboard}>
                <Grid sm={7} item container direction='column' className={classes.dashboard__left}>
                </Grid>
                <Grid sm={5} item container direction='column' className={classes.dashboard__right}>
                    <Grid item>
                        <Card>
                            <CardContent>
                                <List>
                                        <ListItem>
                                            <ListItemText disableTypography primary='Followed Communities' style={{...theme.typography.h6, textAlign:'center'}}/>
                                        </ListItem>
                                
                                    { 
                                    followed ?
                
                                    followed.map((follow, i) => (
                                    <React.Fragment key={`${follow}-${i}`}>
                                        <ListItem className={classes.dashboard__followed} onClick={() => handleRoute(follow._id)}>
                                            <ListItemAvatar >
                                                <Avatar style={{height: '100px', width: '150px'}}>
                                                    <img className={classes.dashboard__followed_icon} src={follow.image} alt=""/>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText disableTypography primary={follow.title} className={classes.followed__title} />
                                            <ListItemText disableTypography primary={`${follow.members.length} members`} className={classes.followed__members} />
                                        </ListItem>
                                        <Divider light={true} />
                                    </React.Fragment>                             
                                    )) 
                                                    : 
                                    null
                                }
                            
                                
                                </List>
                            </CardContent>
                        </Card>   
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Auth(UserDashboard,true)
