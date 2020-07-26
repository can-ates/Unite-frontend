import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import moment from 'moment'

import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";

import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CommentIcon from '@material-ui/icons/Comment';
import { makeStyles, useTheme } from "@material-ui/core/styles";

import CardCommunity from './utils/card_community'
import Auth from '../hoc/Auth'


import ShowMembers from "./utils/show_members";

const useStyles = makeStyles(theme => ({
    back : { 
            backgroundColor: "#FAFAFA",
            width: '100%',
            position: 'absolute',
            top: '0',
            zIndex: -100,
            boxShadow: '0px 12px 42px -13px rgba(3,1,0,1)',
            overflow: 'hidden',
            height: '100%'
            
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
        padding: '0 0 0 2em',
        "&::-webkit-scrollbar" :{
            width: '0px',
            background: 'transparent',
        },
        height: '100vh',
        "overflow-y": 'scroll',
        paddingBottom: '6em',
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
        paddingBottom: '6em'
    },
    postCard : {
        '&:hover' : {
            cursor: 'pointer',
            backgroundColor :'#FAFAFA'
        },
        borderRadius: '0',
        borderTop: '1px solid #FAFAFA',  
    },
    description:{
        display: "-webkit-box",
        "-webkit-line-clamp": '3',
        "-webkit-box-orient": "vertical",
        "overflow": "hidden",
    }
}))

const Community = React.memo(props => {
    const classes = useStyles()
    const theme = useTheme()

    const [member, setMember] = useState([])
    const [community, setCommunity] = useState(null)
    const [posts, setPosts] = useState(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [hideDescription, setHideDescription] = useState(true)
    const [refresh, setRefresh] = useState(null)

    useEffect(() => {
        props.setValue(1)
        
        axios.get(`/api/community/${props.match.params.id}`)
        .then(res => {
            setCommunity(res.data.community)
            setPosts(res.data.community.posts)
        })
    }, [refresh])

    useEffect(() => {
        axios.get(`/api/community/auth/${props.match.params.id}`)
        .then(res => {
            console.log(res.data)
            setMember(res.data)
        })
    }, [])

    const handleMember = () => {
        axios.post(`/api/community/${props.match.params.id}/beMember`)
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const dataToSubmit = {
            title: title,
            description: description
        }

        axios.post(`/api/post/${props.match.params.id}/create-post`, dataToSubmit)
        .then(res => {
            setRefresh(res.data)
            setHideDescription(true)
            setTitle('')
            setDescription('')
        })
    }

    const showPosts = () => (
        posts ? (
            posts.map((post, i) => (
                
                <Card key={`${post._id}-${i}`} className={classes.postCard} style={{borderLeft: post.comments.length > 0 ? '5px solid #FFBA60' : null}} onClick={() => goToComments(post._id)}>
                    <Grid container direction='row' >
                        <Grid lg={1} item style={{paddingTop: '0.7em', paddingLeft: '1em'}}>
                            <Avatar aria-label="user avatar"  style={{backgroundColor: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)}}>
                                {post.author.name.charAt(0)}
                            </Avatar>
                        </Grid>
                        <Grid lg={11} item>
                                
                            <CardHeader
                                title={<Typography variant='caption' display='inline'>{`${post.author.name} ${post.author.lastname} · `}</Typography>}
                                subheader={<Typography style={{fontSize: '0.850rem', fontWeight: 900, color: '#6771A4'}} display='inline' >{moment(post.createdAt).fromNow()}</Typography>}
                                disableTypography
                            />
                    
                    
                            <CardContent style={{paddingTop: '0', paddingBottom: '0'}}>
                                <Typography variant='subtitle1' >{post.title}</Typography>
                                <Typography className={classes.description} variant='subtitle2' >{post.description}</Typography>
                            </CardContent>
                    
                    
                            <CardContent style={{paddingBottom: '0'}}>
                                <CommentIcon fontSize='small' style={{marginRight: '4px'}} />
                                <span style={{marginBottom: '1em'}}>{post.comments.length}</span>
                            </CardContent> 

                        </Grid>
                    </Grid>
                </Card>
            )))
            : null
    )

    

    const goToComments = (a) => {
        props.history.push(`/community/${props.match.params.id}/post/${a}`)
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
                            isAuth={props.user.isAuth ? true : false}
                            height={150}
                            isMember={member ? member.isMember : null}
                        /> : null }
                    </Grid>
                    <Grid item style={{marginTop: '2.5em', width: '90%'}}>
                        {
                           <ShowMembers 
                            community={community}
                           />
                        }
                    </Grid>         
                </Grid>
            </Grid>
            <Grid item lg={8} className={classes.posts} >
                <Grid item container direction='column'>
                    <Grid item>
                        <Card style={{borderRadius: '0'}}>
                            <CardContent>
                                <Paper className={classes.postTitle} style={{display: member.isMember ? null : 'none'}}>
                                    <IconButton aria-label="user">
                                        <AccountCircleIcon color='secondary' fontSize='large'/>
                                    </IconButton>
                                    <InputBase
                                        value={title} 
                                        placeholder="What's on your mind ?"
                                        type='text'
                                        fullWidth
                                        onChange={(e) => setTitle(e.target.value)}
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
                                                value={description}
                                                style={{paddingLeft: '1em'}}
                                                multiline={true}
                                                rows={3}
                                                placeholder="Add details"
                                                type='text'
                                                onChange={(e) => setDescription(e.target.value)}
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
                                                onClick={handleSubmit}
                                                >
                                                Post
                                            </Button>
                                        </div> 
                                    </React.Fragment>
                                }
                                
                            </CardContent>
                        </Card>  
                    </Grid>
                    <Grid item >
                    {   
                        showPosts()
                    }
                        
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </div>
    )
})

export default Auth(Community, false)
