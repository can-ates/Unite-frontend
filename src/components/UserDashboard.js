import React, { useState, useEffect } from "react";

import { makeStyles,useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from "@material-ui/core/CardHeader";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import useMediaQuery from "@material-ui/core/useMediaQuery";



import Auth from '../hoc/Auth'



const useStyles = makeStyles(theme => ({
    dashboardWrapper: {
        backgroundColor: '#FAFAFA',
        overflow: 'hidden',
        height: '100vh'     
    },
    dashboard: {
        width: '80%',
        margin: 'auto',
        marginTop: '2em', 
    },
    dashboard__right : {
        overflowY: 'auto',
        overFlowX: 'hidden',
        height: '70vh',
        "&::-webkit-scrollbar" : {
            width: '0.35em'
        },
        "&::-webkit-scrollbar-track" : {
            width: '0.35em'
        },
        "&::-webkit-scrollbar-thumb" : {
            backgroundColor: "rgb(255, 186, 96)",
            outline: '1px solid slategrey'
        },
        [theme.breakpoints.down("sm")]: {
            marginTop: '2em',
          },
    },
    dashboard__left : {
        paddingRight: '2em',
        [theme.breakpoints.down("sm")]: {
            padding: '0',
          },
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
    },
    userCard : {
        padding: '1em'
    },
    avatar : {
        fontSize: '2rem',
        height : '2em',
        width: '2em'
    }
}))
    

const UserDashboard = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

    const [followed, setFollowed] = useState([])

    useEffect(() => {
        setFollowed(props.user.memberships)
    }, [])

    const handleRoute = (id) => {
        props.history.push(`/community/${id}`)
    }

    return (
        <div className={classes.dashboardWrapper}>
            <Grid container direction={matchesSM ? 'column' : 'row'} justify={matchesSM && 'center'} className={classes.dashboard}>
                <Grid md={7} item container direction='column'  className={classes.dashboard__left} >
                    <Grid item>
                        <Card className={classes.userCard} >

                            <CardHeader
                                avatar={
                                <Avatar aria-label="user avatar" className={classes.avatar}>
                                    {props.user.name[0]}
                                </Avatar>
                                }
                                title={<Typography variant='h6' style={{margin: '0 0.75em'}} display='inline'>{props.user.name.toUpperCase()}</Typography>}
                                subheader={<Typography  variant='h6'  display='inline' >{props.user.lastname.toUpperCase()}</Typography>}
                                disableTypography
                            />
                            
                        
                            <CardContent >
                                <Typography variant='h6' >Email : {props.user.email}</Typography>
                                <Typography className={classes.description} variant='subtitle2' >{}</Typography>
                            </CardContent>

                        </Card>
                    </Grid>
                </Grid>
                <Grid md={5} item container direction='column' className={classes.dashboard__right}>
                    <Grid item>
                        <Card>
                            <CardContent>
                                <List>
                                        <ListItem>
                                            <ListItemText disableTypography primary={`Followed Communities(${followed.length})`} style={{...theme.typography.h6, textAlign:'center'}}/>
                                        </ListItem>
                                
                                    { 
                                    followed ?
                
                                    followed.map((follow, i) => (
                                    <React.Fragment key={`${follow}-${i}`}>
                                        <ListItem className={classes.dashboard__followed} onClick={() => handleRoute(follow._id)}>
                                            <ListItemAvatar style={{display: matchesSM && 'none'}} >
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
