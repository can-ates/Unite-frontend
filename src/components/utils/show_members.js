import React from 'react'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { useTheme } from "@material-ui/core/styles";

const ShowMembers = React.memo(props => {
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
                            <ListItemText disableTypography primary={member.name} style={{...theme.typography.body1, color: 'black'}} />
                            <ListItemText disableTypography primary={member.lastname} style={{...theme.typography.body1, color: 'black', textAlign: 'end'}} />
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
})

export default ShowMembers
