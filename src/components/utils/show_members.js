import React from 'react'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { makeStyles, useTheme } from "@material-ui/core/styles";

const ShowMembers = (props) => {
    const theme = useTheme()

    return (
        <Card>
            <CardContent>
                <List>
                        <ListItem>
                            <ListItemText disableTypography primary='Members' style={{...theme.typography.h6}}/>
                        </ListItem>
                
                    { 
                    props.community ?

                    props.community.members.map((member, i) => (
                    <React.Fragment key={`${member}-${i}`}>
                        <ListItem>
                            <ListItemText disableTypography primary={member.name} style={{...theme.typography.subtitle1}} />
                            <ListItemText disableTypography primary={member.lastname} style={{...theme.typography.subtitle1}} />
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
    )
}

export default ShowMembers
