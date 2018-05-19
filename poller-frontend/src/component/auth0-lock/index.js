
import React from 'react'
import Auth0Lock from 'auth0-lock'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import {
  profileFetch,
} from '../../action/profile-actions.js'
import {
    storageLoginAttempt,
} from '../../action/storage-login-attempt.js'
import {setAuthToken} from '../../action/auth0-actions.js'
import { login, logout } from '../../action/auth-actions.js'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton';

class AuthLockButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.logout = this.logout.bind(this)
    this.showLock = this.showLock.bind(this)
  }

  componentWillMount() {
    console.log('this.props ON BUTTON',this.props)
    const options = {
      sso: true,
      oidcConformant: true, //this determines METADATA is returned in scope...
      rememberLastLogin: true,
      auth: {
        audience: __AUTH0_AUDIENCE__,
        params: {
          scope: 'openid profile userId user_metadata update:users_app_metadata openid email profile read:clients write:clients update:users_app_metadata update:users update:current_user_metadata', //need to research the scope parameter...
        },
      },
      languageDictionary: {
        title: 'Poller',
      },
    }
    this.lock = new Auth0Lock(
        __AUTH0_CLIENT_ID__,
        __AUTH0_CLIENT_DOMAIN__,
      options
    )
    this.lock.on('authenticated', authResult => {
      if (!authResult) return new Error('failed to authenticate');
        console.log('this IS THE authresult',authResult)
        this.props.setAuthToken(authResult.accessToken)
        this.props.profileFetch()
        .then(profile=>{
            if (this.props.loggedIn && this.props.userProfile){
            this.props.history.push('/explore')
          } else {
            this.props.history.push('login')
          }
        })
      
    })

    this.lock.on('authorization_error', (error)=>{
    })



    // this.checkStorageLogin()
  }
  showLock() {
    this.lock.show()
  }

    logout() {
        localStorage.removeItem('loggedIn')
        localStorage.removeItem('poller_token')
        localStorage.removeItem('reduxPersist:auth')
        //might need these later... need to research redux persist
        localStorage.removeItem('reduxPersist:userId')
        localStorage.removeItem('reduxPersist:profile')
        localStorage.removeItem('reduxPersist:userInfo')
        this.props.logout()
        this.lock.logout()
      }

  render() {
      console.log('AUTH LOCK BUTTON', this.state, this.props)
    return (
      <div>
        <MuiThemeProvider>
           <RaisedButton
            onClick={this.props.loggedIn ? this.logout : this.showLock}
            label={this.props.loggedIn ? 'LOGOUT' : 'SIGNUP / LOGIN'}
            style={{ marginTop: '4px', marginRight: '10px', backgroundColor:'#9C27B0' }}
          /> 
        </MuiThemeProvider>

      </div>
    )
  }
}
export const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    userProfile: state.userProfile,
  })
  
  export const mapDispatchToProps = dispatch => ({
    setAuthToken:(token) => dispatch(setAuthToken(token)),
    logout: () => dispatch(logout()),
    profileFetch: () => dispatch(profileFetch()),
  })
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthLockButton))