import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import CardCommunity from './utils/card_community';
import ShowMembers from './utils/show_members';

import Auth from '../hoc/Auth';

const useStyles = makeStyles(theme => ({
  back: {
    backgroundColor: '#FAFAFA',
    width: '100%',
    position: 'absolute',
    top: '0',
    zIndex: -1,
    boxShadow: '0px 12px 42px -13px rgba(3,1,0,1)',
    overflow: 'hidden',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      overflow: 'auto',
    },
  },
  postContainer: {
    padding: '0 2em',
    marginTop: '6em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0',
      marginTop: '4em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.5em',
    },
  },
  posts: {
    padding: '0 0 0 2em',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0',
      order: '1',
    },
    height: '100vh',
    'overflow-y': 'scroll',

    '&::-webkit-scrollbar': {
      width: '0.35em',
    },
    '&::-webkit-scrollbar-track': {
      width: '0.35em',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgb(255, 186, 96)',
      outline: '1px solid slategrey',
    },
  },
  Info: {
    '&::-webkit-scrollbar': {
      width: '0px',
      background: 'transparent',
    },
    overflow: 'auto',
    height: '100vh',
    paddingBottom: '6em',
    [theme.breakpoints.down('sm')]: {
      height: '60vh',
      order: '2',
    },
  },
  postCard: {
    borderRadius: '0',
    borderTop: '1px solid #FAFAFA',
  },
  comment: {
    display: 'flex',
    alignItems: 'center',
  },
  commentInput: {
    border: '1px solid #FAFAFA',
    '&:hover': {
      border: '1px solid #6771A4',
    },
    borderRadius: '15px',
    paddingLeft: '1em',
    fontWeight: 500,
  },
  commentButton: {
    margin: '0 1em',
    borderRadius: '20px',
    color: 'white',
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  members: {
    marginTop: '2.5em',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  saveButton: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    '&:hover': {
      color: theme.palette.common.orange,
      backgroundColor: theme.palette.common.blue,
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.common.blue}`,
    borderRadius: '10px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    '&:focus': {
      outline: 'none',
    },
  },
}));

const Post = props => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const [member, setMember] = useState(null);
  const [community, setCommunity] = useState(null);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [refresh, setRefresh] = useState('');
  const [open, setOpen] = useState(false);


  const handleClose = () => {
    setOpen(false);
  };

  //CHECK IF THE CURRENT USER IS MEMBER OF COMMUNITY AND GET DETAILS
  useEffect(() => {
    axios
      .get(`/api/community/auth/${props.match.params.id}`, {
        withCredentials: true,
      })
      .then(res => {
        setMember(res.data);
      });
  }, [refresh, props.match.params.id]);

  //GET COMMUNITY
  useEffect(() => {
    props.setValue(1);

    axios
      .get(`/api/community/${props.match.params.id}`, { withCredentials: true })
      .then(res => {
        setCommunity(res.data.community);
      });
  }, [refresh, props.match.params.id]);

  //GET PARTICULAR POST
  useEffect(() => {
    axios
      .get(`/api/post/${props.match.params.postId}`, { withCredentials: true })
      .then(res => {
        setComments(res.data.post.comments);
        setPost(res.data.post);
      });
  }, [refresh, props.match.params.postId]);

  //HANDLE BEING MEMBER OF COMMUNITY
  const handleMember = () => {
    axios
      .post(`/api/community/${props.match.params.id}/beMember`, {
        withCredentials: true,
      })
      .then(res => {
        setRefresh(res.data);
      });
  };

  //HANDLE COMMENT ROUTE
  const handleComment = () => {
    let dataToSubmit = {
      text: comment,
    };

    axios
      .post(
        `/api/${props.match.params.id}/post/${props.match.params.postId}/add-comment`,
        dataToSubmit,
        { withCredentials: true }
      )
      .then(res => {
        setRefresh(res.data);
        setComment('');
      });
  };

  //UPDATE POST
  const editPost = () => {
    let dataToSubmit = {
      title: newTitle,
      description: newDescription,
    };

    axios
      .put(
        `/api/post/${props.match.params.postId}`,
        {
          dataToSubmit,
        },
        {
          withCredentials: true,
        }
      )
      .then(res => {
        setShowForm(false);
        setRefresh(res.data);
      });
  };

  //DELETE POST
  const deletePost = () => {
    axios
      .delete(`/api/post/${props.match.params.postId}`, {
        withCredentials: true,
      })
      .then(res => {
        if (res.data.success) {
          setOpen(false);
          props.history.push(`/community/${props.match.params.id}`);
          setRefresh(true);
        }
      });
  };

  //DELETE COMMUNITY
  const deleteCommunity = () => {
    axios
    .delete(`/api/community/${props.match.params.id}`, { withCredentials: true })
    .then(res => {
      res.data.success && props.history.push('/')
    });
  }

  //RENDER COMMENTS
  const showComments = () =>
    comments
      ? comments.map((comment, i) => (
          <Card key={`${comment._id}-${i}`} className={classes.commentCard}>
            <Grid container direction='row'>
              <Grid
                xs={1}
                item
                style={{
                  paddingTop: '0.7em',
                  paddingLeft: matchesXS ? '0' : '1em',
                }}
              >
                <Avatar
                  aria-label='user avatar'
                  style={{ backgroundColor: 'grey' }}
                >
                  {comment.name.charAt(0)}
                </Avatar>
              </Grid>
              <Grid xs={11} item>
                <CardHeader
                  title={
                    <Typography
                      variant='caption'
                      display='inline'
                    >{`${comment.user.name} ${comment.user.lastname} · `}</Typography>
                  }
                  subheader={
                    <Typography
                      style={{
                        fontSize: '0.850rem',
                        fontWeight: 900,
                        color: '#6771A4',
                      }}
                      display='inline'
                    >
                      {moment(comment.createdAt).fromNow()}
                    </Typography>
                  }
                  disableTypography
                />

                <CardContent style={{ paddingTop: '0', paddingBottom: '0' }}>
                  <Typography
                    className={classes.description}
                    variant='subtitle2'
                  >
                    {comment.text}
                  </Typography>
                </CardContent>

                <CardContent style={{ paddingBottom: '0' }}></CardContent>
              </Grid>
            </Grid>
          </Card>
        ))
      : null;

  return (
    <div className={classes.back}>
      <Grid container direction='row' className={classes.postContainer}>
        {/* CARD OF COMMUNITY DETAILS AND MEMBERS */}
        <Grid item md={4} xs={12} className={classes.Info}>
          <Grid
            item
            container
            direction='column'
            alignContent={matchesSM ? 'center' : null}
          >
            <Grid item>
              {community ? (
                <CardCommunity
                  members={community.members.length}
                  title={community.title}
                  isFounder={community.founder === props.user.id}
                  description={community.description}
                  founder={community.founder}
                  id={community._id}
                  image={community.image}
                  buttonText='Be a member'
                  beMember={handleMember}
                  deleteCommunity={deleteCommunity}
                  isAuth={props.user.isAuth ? true : false}
                  width='100%'
                  height={150}
                  isMember={member ? member.isMember : null}
                />
              ) : null}
            </Grid>
            <Grid item className={classes.members}>
              {community ? <ShowMembers community={community} /> : null}
            </Grid>
          </Grid>
        </Grid>
        {/* POST */}
        <Grid item md={8} className={classes.posts}>
          <Grid item container direction='column'>
            <Grid item>
              {post && (
                <Card className={classes.postCard}>
                  <Grid container direction='column'>
                    <Grid
                      item
                      style={{ paddingTop: '0.7em', paddingLeft: '1em' }}
                    >
                      <Grid container direction='row' alignItems='center'>
                        <Grid item>
                          <Avatar
                            aria-label='user avatar'
                            style={{ backgroundColor: 'grey' }}
                          >
                            {post.author.name.charAt(0)}
                          </Avatar>
                        </Grid>
                        <Grid item>
                          <CardHeader
                            title={
                              <Typography
                                variant='caption'
                                display='inline-block'
                              >
                                {`${post.author.name} ${post.author.lastname}`}
                              </Typography>
                            }
                            disableTypography
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <CardContent style={{ paddingTop: '0' }}>
                        {showForm ? (
                          <InputBase
                            value={newTitle}
                            placeholder={post.title}
                            type='text'
                            fullWidth
                            style={{
                              border: `1px solid ${theme.palette.primary.main}`,
                            }}
                            onChange={e => setNewTitle(e.target.value)}
                            className={classes.commentInput}
                          />
                        ) : (
                          <Typography variant='h3' style={{ color: 'black' }}>
                            {post.title}
                          </Typography>
                        )}

                        <Typography
                          style={{
                            fontSize: '1rem',
                            fontWeight: 900,
                            color: '#6771A4',
                            margin: '1em 0',
                          }}
                        >
                          {moment(post.createdAt).fromNow()}
                        </Typography>
                        {showForm ? (
                          <InputBase
                            value={newDescription}
                            placeholder={post.description}
                            type='text'
                            fullWidth
                            multiline={true}
                            rows='2'
                            style={{
                              border: `1px solid ${theme.palette.primary.main}`,
                            }}
                            rowsMax='10'
                            onChange={e => setNewDescription(e.target.value)}
                            className={classes.commentInput}
                          />
                        ) : (
                          <Typography
                            align='left'
                            variant='caption'
                            style={{ fontWeight: 500 }}
                          >
                            {post.description}
                          </Typography>
                        )}
                      </CardContent>
                    </Grid>
                    <Grid item>
                      {post.author._id === props.user.id && (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                          }}
                        >
                          {showForm && (
                            <Button
                              onClick={editPost}
                              className={classes.saveButton}
                              variant='contained'
                              disabled={!newTitle || !newDescription}
                            >
                              Save
                            </Button>
                          )}
                          <Button onClick={() => setShowForm(pr => !pr)}>
                            <EditIcon style={{ color: 'orange' }} />
                          </Button>
                          <Button onClick={() => setOpen(true)}>
                            <DeleteIcon style={{ color: 'red' }} />
                          </Button>
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </Card>
              )}
            </Grid>

            <Grid item>{showComments()}</Grid>
            <Grid
              item
              style={{ position: 'sticky', bottom: matchesSM ? '4em' : '6em' }}
            >
              {member
                ? member.isMember && (
                    <Paper className={classes.comment}>
                      <IconButton aria-label='user'>
                        <AccountCircleIcon color='secondary' fontSize='large' />
                      </IconButton>
                      <InputBase
                        value={comment}
                        placeholder='Your comment here'
                        type='text'
                        fullWidth
                        onChange={e => setComment(e.target.value)}
                        className={classes.commentInput}
                      />

                      <Button
                        type='submit'
                        variant='outlined'
                        aria-label='comment'
                        className={classes.commentButton}
                        onClick={handleComment}
                      >
                        Send
                      </Button>
                    </Paper>
                  )
                : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography style={{ marginBottom: '2em' }} color='secondary'>
              Post will be deleted permanently
            </Typography>

            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <Button
                onClick={() => setOpen(false)}
                style={{ backgroundColor: 'grey', color: 'white' }}
              >
                Cancel
              </Button>
              <Button
                onClick={deletePost}
                style={{ backgroundColor: 'red', color: 'white' }}
              >
                Delete
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Auth(React.memo(Post), false);
