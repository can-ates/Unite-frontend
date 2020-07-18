import React from 'react'
import {connect} from 'react-redux'

import CircularProgress from '@material-ui/core/CircularProgress';
import * as actions from '../actions/user'

export default function(WrappedComponent, isRestricted){
    class Auth extends React.Component {

    state = {
        loading: false
    }
    
    componentDidMount() {
        console.log(this.props)
        this.props.authUser((cb) => {
            
            let user = this.props.user.userData
                 console.log(cb)
            // if(!user.isAuth && isRestricted){
            //     this.props.history.push('/joinus')
            // } else if(user.isAuth && typeof isRestricted === 'undefined'){
            //     this.props.history.push('/')
            // }

            this.setState({loading: false})
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
                <WrappedComponent  {...this.props} user={this.props.user}/>
            </div>
        )
    }

    
        
    }

    function mapStateToProps (state) {
        return {
            user: state.user
        }
    }
    
    return  connect(mapStateToProps, actions)(Auth)
}


