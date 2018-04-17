
import React from 'react'
import NavBar from '../nav-bar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Auth0Lock from 'auth0-lock'
import {
    profileFetch,
} from '../../action/profile-actions.js'
import {
    storageLoginAttempt,
} from '../../action/storage-login-attempt.js'


import LoginPage from '../login'


class LandingContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.logout = this.logout.bind(this)
    this.checkStorageLogin = this.checkStorageLogin.bind(this)
    this.showLock = this.showLock.bind(this)
  }

  componentWillMount() {
    console.log(this.props.history)
    const options = {
      sso: true,
      oidcConformant: true, //this determines METADATA is returned in scope...
      rememberLastLogin: true,
      auth: {
        audience: __AUTH0_AUDIENCE__,
        params: {
          scope: 'openid profile userId update:users_app_metadata openid email profile read:clients write:clients update:users_app_metadata update:users update:current_user_metadata', //need to research the scope parameter...
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
        console.log('this IS THE accesstoken',authResult.accessToken)
        this.props.setAuthToken(authResult.accessToken)
        this.props.profileFetch()
        .then((profile)=>{
          this.props.history.push('/settings');
        })
        .catch(err=>console.log('ERROR, failure to create or retrieve profile...',err))
    })

    // this.checkStorageLogin()
  }



  logout() {
    console.log('LOGGING OUT')
    localStorage.removeItem('loggedIn')
    localStorage.removeItem('poller_token')
    localStorage.removeItem('reduxPersist:auth')
    //might need these later... need to research redux persist
    localStorage.removeItem('reduxPersist:userId')
    localStorage.removeItem('reduxPersist:profile')
    localStorage.removeItem('reduxPersist:userInfo')
    this.lock.logout()
  }

  showLock() {
    this.lock.show()
  }

  checkStorageLogin(){
    if (localStorage.poller_token && !this.props.storageLoginAttempt && !this.props.loggedIn) {
        this.props.profileFetch()
        .then((profile)=>{
          if (!profile) throw new Error()

        })
        .catch(err=> {
          console.log('hitting the catch block for loginPage')
          return <LoginPage props={this.showLock}/>
        })

    } else {
      return <LoginPage props={this.showLock}/>
    }
  }

  render() {
    console.log('this is the state and props on LANDINGCONTAINER', this.state, this.props)
    return (
      <div>
      <NavBar/>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
    loggedIn: state.loggedIn
  })
  
  export const mapDispatchToProps = dispatch => ({

    profileFetch: () => dispatch(profileFetch()),
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer)