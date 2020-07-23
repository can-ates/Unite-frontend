import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles, useTheme } from "@material-ui/core/styles";

import CardCommunity from './utils/card_community'
import Auth from '../hoc/Auth'

import bermuda from '../assets/Bermuda-Circle.svg'

const useStyles = makeStyles(theme => ({
    back : { 
            backgroundImage: `url(${bermuda})`,
            backgroundPosition: 'center',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: '100%',
            position: 'absolute',
            top: '0',
            zIndex: -1,
            boxShadow: '0px 12px 42px -13px rgba(3,1,0,1)',
            overflow: 'auto'
    },
    communityContainer: {
        padding: '0 2em',
        marginTop: '6em',
        [theme.breakpoints.down("md")]: {
          marginBottom: "2em"
        },
        [theme.breakpoints.down("xs")]: {
          marginBottom: "1.5em"
        },
    },
    postDescription : {
        marginTop : '0.75em',
    },
    posts: {
        padding: '0 0 0 2em'
    },
    postTitle: {
        display: 'flex',
        alignItems: 'center',
        '&:hover' : {
            cursor: 'pointer'
        }
    },
    postButton : {
        marginRight: '1em',
        borderRadius: '20px', 
        color: 'white', 
        backgroundColor: theme.palette.secondary.main,
        '&:hover' : {
            backgroundColor: theme.palette.secondary.light,
        }   
    },
    Info : {
        "&::-webkit-scrollbar" :{
            width: '0px',
            background: 'transparent',
        },
        overflow: 'auto',
        height: '100vh', 
        paddingBottom: '2em'
    }
}))

const Community = (props) => {
    const classes = useStyles()
    const theme = useTheme()

    const [community, setCommunity] = useState(null)
    const [hideDescription, setHideDescription] = useState(true)

    useEffect(() => {
        props.setValue(1)
        
        axios.get(`/api/community/${props.match.params.id}`)
        .then(res => {
            setCommunity(res.data.community)
            console.log(res.data.community.members)
        })
    }, [])

    const handleMember = () => {
        axios.post(`/api/community/${props.match.params.id}/beMember`)
        .then(res => {
            console.log(res.data)
        })
    }


    return (
    <div className={classes.back}>
        <Grid container direction='row' className={classes.communityContainer}>
            <Grid item lg={4} className={classes.Info}>
                <Grid item container direction='column'>
                    <Grid item>
                        { community ? <CardCommunity
                            members={community.members.length}
                            title={community.title}
                            description={community.description}
                            founder={community.founder}
                            id={community._id}
                            image={community.image}
                            buttonText='Be a member'
                            beMember={handleMember}
                            width='90%'
                            height={150}
                        /> : null }
                    </Grid>
                    <Grid item style={{marginTop: '2.5em', width: '90%'}}>
                        <Card>
                            <CardContent>
                                <List>
                                        <ListItem>
                                            <ListItemText disableTypography primary='Members' style={{...theme.typography.h6}}/>
                                        </ListItem>
                                {
                                    community ? community.members.map((member, i) => (
                                    <React.Fragment key={`${member}-${i}`}>
                                        <ListItem>
                                            <ListItemText disableTypography primary={member.name} style={{...theme.typography.subtitle1}} />
                                            <ListItemText disableTypography primary={member.lastname} style={{...theme.typography.subtitle1}} />
                                        </ListItem>
                                        <Divider light={true} />
                                    </React.Fragment>                             
                                    ))
                                    : null 
                                }
                                </List>
                            </CardContent>
                        </Card>   
                    </Grid>         
                </Grid>
            </Grid>
            <Grid item lg={8} className={classes.posts} >
                <Grid item container direction='column'>
                    <Grid item>
                        <Card>
                            <CardContent>
                                <Paper className={classes.postTitle}>
                                    <IconButton aria-label="user">
                                        <AccountCircleIcon color='secondary' fontSize='large'/>
                                    </IconButton>
                                    <InputBase 
                                        placeholder="What's on your mind ?"
                                        type='text'
                                        fullWidth
                                        onClick={() => setHideDescription(false)}
                                        
                                    />
                                    { hideDescription ?
                                        <Button 
                                            type="submit"
                                            variant='outlined' 
                                            aria-label="post"
                                            className={classes.postButton}
                                            >
                                            Post
                                        </Button>
                                        : null
                                    }
                                </Paper>
                                {
                                    hideDescription ? null : 
                                    <React.Fragment>
                                        <Paper className={classes.postDescription}>
                                            <InputBase
                                                style={{paddingLeft: '1em'}}
                                                multiline={true}
                                                rows={3}
                                                placeholder="Add details"
                                                type='text'
                                                fullWidth        
                                            />
                                        </Paper>
                                        <div style={{textAlign: 'end', marginTop: '1em'}}>
                                            <Button 
                                                variant='text' 
                                                onClick={() => setHideDescription(true)}>Cancel</Button>
                                            <Button 
                                                type="submit"
                                                variant='outlined' 
                                                aria-label="post"
                                                className={classes.postButton}
                                                >
                                                Post
                                            </Button>
                                        </div> 
                                    </React.Fragment>
                                }
                                
                            </CardContent>
                        </Card>
                        
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </div>
    )
}

export default Auth(Community, true)
