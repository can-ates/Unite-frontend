import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import useMediaQuery from "@material-ui/core/useMediaQuery";


import passion from '../assets/passion.jpg'
import ahoy from '../assets/Rainbow-Vortex.svg'


import Auth from '../hoc/Auth'
import CardCommunity from '../components/utils/card_community'

const useStyles = makeStyles(theme => ({
    hero: {
        backgroundImage: `url(${passion})`,
        backgroundPosition: 'center bottom',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: '85vh',
        width: '100%',
        position: 'absolute',
        top: '0',
        zIndex: -1,
        boxShadow: '0px 12px 42px -13px rgba(3,1,0,1)'
    },
    sad: {
        marginTop: '10.5em',
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
        marginTop: '5em',
        backgroundColor: theme.palette.common.orange,
        minWidth: '10em',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        }
    },
    findCommunity: {
        marginTop: '2.5em',
        backgroundImage: `url(${ahoy})`,
        backgroundPosition: 'center',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: '30vh',
        boxShadow: '0px 0px 27px -5px rgba(3,1,0,1)',
        marginTop: '4em'
    },
    searchBar:{
        padding: '0.3em',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0px 12px 30px -5px rgba(3,1,0,1)',
        position: 'relative',
        borderRadius: '10px'
        
    },
    search: {
        minWidth: '25em',
        color: theme.palette.common.blue,
        fontWeight: '700'
    },
    resultList: {
        position: 'absolute',
        backgroundColor: 'white',
        marginTop: '0.2em',
        borderRadius: '10px',
        minWidth: '35em'
    }
}))

function ListItemLink(props) {
    return <ListItem button component={Link} {...props} />;
  }

const Home = (props) => {
    const [communities, setCommunities] = useState(null)
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState('')
    const [loading, setLoading] = useState(false)
    

    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {
        axios.get('/api/allCommunities?limit=3&sortBy=members&order=desc').then((res) => {
            setCommunities(res.data.community)
            console.log(res.data.community)
        })
    }, [])

    const handleSearch = (e) => {
        setSearch(e.target.value)

        if(e.target.value != ''){
            setLoading(true)
            axios.get(`/api/searchCommunities?limit=5&sortBy=${e.target.value}&order=desc`)
            .then((res) => {
                setSearchResult(res.data.community)
                setLoading(res.data ? false : true)
                
            })
        } else setLoading(false); setSearchResult('')
    }

    return (
        <div className={classes.hero}>
            <div  style={{position: 'relative', height: '100%', display: 'flex', alignItems: 'center'}}>
                <Grid container direction='column' alignItems='center' className={classes.sad}>
                    <Grid item>
                        <Typography variant='h1' align='center'>
                            All communities in one place
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            component={Link}
                            to="/joinus"
                            className={classes.uniteButton}
                            variant="contained"
                            size='medium'
                            onClick={() => props.setValue(3)}
                            
                        >
                        Unite NOW!
                        </Button>
                    </Grid>
                </Grid>
            </div>
            <Grid container direction='column' style={{marginTop: '2.5em' ,backgroundColor: '#f9f9f9'}}>
                <Grid item style={{marginBottom: '2.5em'}}>
                    <Typography variant='h4' style={{textAlign: 'center'}}>Best Communities of UNITE</Typography>
                </Grid>
                <Grid item container direction='row' justify='space-around' >
                {communities ? communities.map((community, i) => (
                    <Grid item key={community.title} >
                        <CardCommunity
                            members={community.members.length}
                            title={community.title}
                            founder={community.founder}
                            id={community._id}
                        />
                    </Grid>   
                )) : null}
                </Grid>
                <Grid item container direction='column' alignItems='center' className={classes.findCommunity}>
                    <Grid item>
                        <Typography variant='h4' style={{margin: '1em 0', color: 'white'}}>Find Communities</Typography>
                    </Grid>
                    <Grid item>
                        <Paper className={classes.searchBar}>
                            <IconButton disabled type="submit" className={classes.iconButton} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                            <InputBase
                                className={classes.search}
                                placeholder='Search for community'
                                type='text'
                                value={search}
                                onChange={handleSearch}
                            />
                            {loading ? <CircularProgress variant='indeterminate' style={{color: theme.palette.common.blue, paddingTop: 'auto'}} size={23} /> : null}
                        </Paper>
                        {searchResult ? <List className={classes.resultList}>
                            {searchResult.map((result, i) => (
                                <React.Fragment>
                                    <ListItemLink key={`${result}-${i}`}>
                                        <ListItemText disableTypography primary={result.title} style={{...theme.typography.h6}} />
                                        <ListItemText disableTypography primary={`${result.members.length} members`} style={{textAlign: 'end', color: theme.palette.common.grey}} />
                                    </ListItemLink>
                                    <Divider />
                                </React.Fragment>
                            ))
                            }       </List> : null}    
                    </Grid>
                </Grid>
            </Grid>
            
        </div>
    )
}

export default Auth(Home, false)
