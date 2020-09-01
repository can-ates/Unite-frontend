import React, { useState, useEffect } from 'react';

import moment from 'moment';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  commentInput: {
    border: '1px solid #FAFAFA',
    '&:hover': {
      border: '1px solid #6771A4',
    },
    borderRadius: '15px',
    paddingLeft: '1em',
    fontWeight: 500,
  },
  saveButton: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    '&:hover': {
      color: theme.palette.common.orange,
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

const Comments = ({ comment, user, editComment, deleteComment }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  const [showComment, setShowComment] = useState(false);
  const [newComment, setNewComment] = useState('')
  return (
    <Card >
      <Grid container direction='row'>
        <Grid
          xs={1}
          item
          style={{
            paddingTop: '0.7em',
            paddingLeft: matchesXS ? '0' : '1em',
          }}
        >
          <Avatar aria-label='user avatar' style={{ backgroundColor: 'grey' }}>
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
            {showComment ? (
              <InputBase
                value={newComment}
                placeholder={comment.text}
                type='text'
                fullWidth
                style={{
                  border: `1px solid ${theme.palette.primary.main}`,
                }}
                onChange={e => setNewComment(e.target.value)}
                className={classes.commentInput}
              />
            ) : (
              <Typography variant='subtitle2'>{comment.text}</Typography>
            )}
          </CardContent>

          <CardContent style={{ padding: '0' }}>
            {comment.user._id === user.id && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                {showComment && (
                  <Button
                    onClick={() => {editComment(comment._id, newComment); setShowComment(false)}}
                    className={classes.saveButton}
                    variant='contained'
                    disabled={!newComment}
                  >
                    Save
                  </Button>
                )}
                <Button onClick={() => setShowComment(pr => !pr)}>
                  <EditIcon style={{ color: 'orange' }} />
                </Button>
                <Button onClick={() => deleteComment(comment._id)} >
                  <DeleteIcon style={{ color: 'red' }} />
                </Button>
              </div>
            )}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Comments;
