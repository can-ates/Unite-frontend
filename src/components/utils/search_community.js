import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import { makeStyles,useTheme } from "@material-ui/core/styles";
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';




const useStyles = makeStyles(theme => ({
    searchBar:{
        padding: '0.3em',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0px 12px 30px -5px rgba(3,1,0,1)',
        position: 'relative',
        borderRadius: '10px',
        [theme.breakpoints.down('xs')]: {
            minWidth: '8em',
            height: '40px'
        }
        
    },
    search: {
        color: theme.palette.common.blue,
        fontWeight: '700',
        minWidth: '25em',
        [theme.breakpoints.down('sm')]: {
            minWidth: '16em',
        },
        [theme.breakpoints.down('xs')]: {
            minWidth: '12em',
        }
    },
    resultList: {
        position: 'absolute',
        backgroundColor: 'white',
        marginTop: '0.2em',
        borderRadius: '10px',
        minWidth: '35em',
        zIndex: '10'
    },
}))   

function ListItemLink(props) {
    return <ListItem button component={Link} {...props} />;
  }


const SearchCommunity = () => {
    const classes = useStyles();
    const theme = useTheme()

    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState('')
    const [loading, setLoading] = useState(false)
    

    const handleSearch = (e) => {
        setSearch(e.target.value)

        if(e.target.value != ''){
            setLoading(true)
            axios.get(`/api/searchCommunities?limit=5&sortBy=${e.target.value}&order=desc`)
            .then((res) => {
                setSearchResult(res.data.community)
                setLoading(res.data ? false : true)
                console.log(res.data.community)
                
            })
        } else setLoading(false); setSearchResult('')
    }

    return (
        <div>
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
                <React.Fragment key={`${result}-${i}`}>
                    <ListItemLink  to={`/community/${result._id}`}>
                        <ListItemText disableTypography primary={result.title} style={{...theme.typography.h6}} />
                        <ListItemText disableTypography primary={`${result.members.length} members`} style={{textAlign: 'end', color: theme.palette.common.grey}} />
                    </ListItemLink>
                    <Divider />
                </React.Fragment>
            ))
            }       </List> : null}   
        </div>
    )
}

export default SearchCommunity
