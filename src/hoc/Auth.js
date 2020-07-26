import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import CircularProgress from '@material-ui/core/CircularProgress';
import * as actions from '../actions/user'


export default function(WrappedComponent, isRestricted){
    class Auth extends React.Component {
        constructor(props) {
          super(props)
        
          this.state = {
            loading: true
          }
        }
        
    
        componentDidMount() {
        
        this.props.dispatch(actions.authUser()).then(response => {


            this.setState({loading: false})

            if(!this.props.user.isAuth && isRestricted) {
                this.props.history.push('/joinus')
            }
            else if (this.props.user.isAuth && isRestricted === null) {
                this.props.history.push('/')
            }
        })
        
            
            
            
        
    }

    render() {

        if(this.state.loading) {
        
            return (
                <CircularProgress />
            )
        }


        return (
            <div>
                <WrappedComponent  {...this.props} user={this.props.user} />
            </div>
        )
    }  
        
    }

    function mapStateToProps (state) {
        return {
            user: state.user.userData
        }
    }
    
    return  connect(mapStateToProps)(withRouter(Auth))
}


