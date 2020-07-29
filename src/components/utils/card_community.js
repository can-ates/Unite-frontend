import React, {useEffect} from 'react'
import {withRouter} from 'react-router-dom'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';

import PeopleIcon from '@material-ui/icons/People';

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: '20em',
        maxWidth: '25em',
        boxShadow: '0px 0px 25px -16px rgba(11,114,185,1)',
        '&:hover' :{
            boxShadow: '0px 0px 25px 1px rgba(255,186,96,0.75)'
        },
        backgroundColor: '#f9f9f9',
        
        
    },
    content: {
        textAlign: 'left'
    },
    visit: {
        margin: '0 auto',
        marginBottom: '1em',
        borderRadius: '10px',
        backgroundColor: theme.palette.common.blue,
        color: 'white',
        letterSpacing: '1px',
        padding: '0.6em 0.8em',
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
        fontSize: '0.90rem'
    },
}))



const CardCommunity = React.memo(props => {
    const classes = useStyles()
    const theme = useTheme()

    const handleVisit = () => {
        props.history.push(`/community/${props.id}`)
    }

    const goToLogin = () => {
        props.history.push('/joinus')
    }
    
    return (
        <Card className={classes.root} style={{maxWidth: props.width ? props.width : '25em' }}>
            <CardActionArea>
                <CardMedia
                    style={{height: props.height ? props.height : 125, width: '100%'}}
                    image={props.image}
                    title="community image"
                />
            </CardActionArea>
            <CardContent className={classes.content}>
                <Typography variant='h6' style={{color: theme.palette.common.blue}}>
                    {props.title}
                </Typography>
                <Typography variant='subtitle2' >
                    {props.description}
                </Typography>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <PeopleIcon size='small' color='secondary' style={{marginRight: '2px'}} />
                    <Typography display='inline' variant='subtitle1'>
                        {props.members} Members
                    </Typography>
                </div> 
            </CardContent>
            <CardActions>
                {props.isMember ? null : <Button onClick={props.isAuth ? (props.beMember ? props.beMember : handleVisit) : goToLogin} fullWidth size="small" variant='contained' className={classes.visit}>{props.buttonText}</Button>}
                
            </CardActions>
        </Card>
    )
})

export default withRouter(CardCommunity)
