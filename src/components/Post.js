import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import moment from 'moment'

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography'
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import CardCommunity from './utils/card_community'
import ShowMembers from './utils/show_members'
import Auth from '../hoc/Auth'


const useStyles = makeStyles(theme => ({
    back : { 
            backgroundColor: "#FAFAFA",
            width: '100%',
            position: 'absolute',
            top: '0',
            zIndex: -1,
            boxShadow: '0px 12px 42px -13px rgba(3,1,0,1)',
            overflow: 'hidden',
            height: '100%'
            
    },
    postContainer: {
        padding: '0 2em',
        marginTop: '6em',
        [theme.breakpoints.down("md")]: {
          marginBottom: "2em"
        },
        [theme.breakpoints.down("xs")]: {
          marginBottom: "1.5em"
        },
        
    },
    posts: {
        padding: '0 0 0 2em',
        height: '100vh',
        "overflow-y": 'scroll',
        
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
        borderRadius: '0',
        borderTop: '1px solid #FAFAFA',  
    },
    comment : {
        display: 'flex',
        alignItems: 'center',
        
         
    },
    commentInput : {
        border: '1px solid #FAFAFA',
        '&:hover': {
            border: '1px solid #6771A4',
        },
        borderRadius: '15px', 
        paddingLeft: '1em',
        fontWeight: 500
    },
    commentButton : {
        margin: '0 1em',
        borderRadius: '20px', 
        color: 'white', 
        backgroundColor: theme.palette.secondary.main,
        '&:hover' : {
            backgroundColor: theme.palette.secondary.light,
        }   
    },
    
}))

const Post = (props) => {
    const classes = useStyles()
    const theme = useTheme()

    const [member, setMember] = useState(null)
    const [community, setCommunity] = useState(null)
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')



    useEffect(() => {
        axios.get(`/api/community/auth/${props.match.params.id}`)
        .then(res => {
            console.log(res.data)
            setMember(res.data)
        })
    }, [])

    //For community
    useEffect(() => {
        props.setValue(1)
        
        axios.get(`/api/community/${props.match.params.id}`)
        .then(res => {
            setCommunity(res.data.community)
            
        })
    }, [])

    

    //For Post
    useEffect(() => {
        
        axios.get(`/api/post/${props.match.params.postId}`)
        .then(res => {
            console.log(res.data)
            setComments(res.data.post.comments)
            setPost(res.data.post)
        })
    }, [])

    const handleMember = () => {
        axios.post(`/api/community/${props.match.params.id}/beMember`)
        .then(res => {
            console.log(res.data)
        })
    }

    const handleComment = () => {
        let dataToSubmit = {
            text: comment
        }

        axios.post(`/api/${props.match.params.id}/post/${props.match.params.postId}/add-comment`, dataToSubmit)
        .then(res => {
            console.log(res.data)
        })
    }

    const showComments = () => (
        comments ? (
            comments.map((comment, i) => (
                
                <Card key={`${comment._id}-${i}`} className={classes.commentCard}>
                    <Grid container direction='row' >
                        <Grid lg={1} item style={{paddingTop: '0.7em', paddingLeft: '1em'}}>
                            <Avatar aria-label="user avatar"  style={{backgroundColor: 'grey'}}>
                                {comment.name.charAt(0)}
                            </Avatar>
                        </Grid>
                        <Grid lg={11} item>
                                
                            <CardHeader
                                title={<Typography variant='caption' display='inline'>{`${comment.user.name} ${comment.user.lastname} · `}</Typography>}
                                subheader={<Typography style={{fontSize: '0.850rem', fontWeight: 900, color: '#6771A4'}} display='inline' >{moment(comment.createdAt).fromNow()}</Typography>}
                                disableTypography
                            />
                    
                    
                            <CardContent style={{paddingTop: '0', paddingBottom: '0'}}>
                                <Typography className={classes.description} variant='subtitle2' >{comment.text}</Typography>
                            </CardContent>
                    
                    
                            <CardContent style={{paddingBottom: '0'}}>
                                
                            </CardContent> 

                        </Grid>
                    </Grid>
                </Card>
            )))
            : null
    )

    return (
        <div className={classes.back}>
        <Grid container direction='row' className={classes.postContainer}>
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
                            isMember={member ? member.isMember : null}
                        /> : null }
                    </Grid>
                    <Grid item style={{marginTop: '2.5em', width: '90%'}}>
                    {   
                        community ? <ShowMembers
                                       community={community}
                                       /> : null
                       }
                    </Grid>         
                </Grid>
            </Grid>
            <Grid item lg={8} className={classes.posts} >
                <Grid item container direction='column'  >
                    <Grid item >
                        {post ? <Card className={classes.postCard} >
                            <Grid container direction='column' >
                                <Grid item style={{paddingTop: '0.7em', paddingLeft: '1em'}}>
                                    <Grid container direction='row' alignItems='center'>
                                        <Grid item>
                                            <Avatar aria-label="user avatar"  style={{backgroundColor: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)}}>
                                                {post.author.name.charAt(0)}
                                            </Avatar>
                                        </Grid>
                                        <Grid item>
                                            <CardHeader
                                                title={<Typography variant='caption' display='inline'>{`${post.author.name} ${post.author.lastname}`}</Typography>}
                                                disableTypography
                                            />
                                        </Grid>
                                    </Grid>          
                                </Grid>
                                <Grid item>
                                   <CardContent style={{paddingTop: '0'}}>
                                        <Typography variant='h3' style={{color: 'black'}} >{post.title}</Typography>
                                        <Typography style={{fontSize: '1rem', fontWeight: 900, color: '#6771A4', margin:'1em 0'}} >{moment(post.createdAt).fromNow()}</Typography>
                                        <Typography align='left' variant='caption' style={{fontWeight: 500}} >{post.description}</Typography>
                                    </CardContent>
                                </Grid>
                            </Grid>
                        </Card> : null}
                    </Grid>
                    
                    <Grid item style={{paddingBottom: '6em'}}>
                       {
                           showComments()
                       }
                    </Grid>
                    <Grid item style={{position: 'sticky', bottom: '6em'}}>
                        
                            { member ? member.isMember && <Paper className={classes.comment}>
                                <IconButton aria-label="user">
                                    <AccountCircleIcon color='secondary' fontSize='large'/>
                                </IconButton>
                                <InputBase
                                    value={comment}
                                    placeholder="Your comment here"
                                    type='text'
                                    fullWidth
                                    onChange={(e) => setComment(e.target.value)}
                                    className={classes.commentInput}
                                />
                                                
                                <Button 
                                    type="submit"
                                    variant='outlined' 
                                    aria-label="comment"
                                    className={classes.commentButton}
                                    onClick={handleComment}
                                >
                                Send
                                </Button>
                            </Paper> : null  } 

                        
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        
        
    </div>
    )
}

export default Post
