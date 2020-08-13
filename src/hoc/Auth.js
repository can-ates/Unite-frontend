import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';
import * as actions from '../actions/user';

export default function (WrappedComponent, shouldAccess) {
  class Auth extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: true,
      };
    }

    componentDidMount() {
      this.props.dispatch(actions.authUser()).then(response => {
        if (!response.payload.isAuth && !shouldAccess) {
          this.props.history.push('/joinus');
        } else if (response.payload.isAuth && shouldAccess === null) {
          this.props.history.push('/');
        }

        this.setState({ loading: false });
      });
    }

    render() {
      if (this.state.loading) {
        return <CircularProgress />;
      }

      return (
        <div>
          <WrappedComponent {...this.props} user={this.props.user} />
        </div>
      );
    }
  }

  function mapStateToProps(state) {
    return {
      user: state.user.userData,
    };
  }

  return connect(mapStateToProps)(withRouter(Auth));
}
