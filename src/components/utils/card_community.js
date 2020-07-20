import React from 'react'


import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: '20em',
        maxWidth: '25em',
        boxShadow: '0px 12px 42px -16px rgba(11,114,185,1)',
        '&:hover' :{
            boxShadow: '0px 12px 42px 1px rgba(255,186,96,1)'
        },
        backgroundColor: '#f9f9f9',
        
        
    },
    content: {
        textAlign: 'center'
    },
    visit: {
        margin: '0 auto',
        marginBottom: '1.5em',
        backgroundColor: theme.palette.common.blue,
        color: 'white',
        letterSpacing: '1px',
        padding: '0.6em 0.8em',
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        }
    }
}))

const CardCommunity = (props) => {
    const classes = useStyles()
    const theme = useTheme()

    
    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <Typography variant='h6' style={{marginBottom: '1em'}}>
                    {props.title}
                </Typography>
                <Typography variant='subtitle1'>
                    {props.members} Members
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant='contained' className={classes.visit}>Visit Community!</Button>
            </CardActions>
        </Card>
    )
}

export default CardCommunity
