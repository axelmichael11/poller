
import React from 'react'
import ReactDom from 'react-dom'
import App from './component/app'
import { Provider } from 'react-redux'
import storeCreate from './lib/store-create'
import { persistStore } from 'redux-persist'
import * as authActions from './action/auth-actions.js'

const store = storeCreate()
persistStore(store)

class Main extends React.Component {
  componentWillUpdate() {
    persistStore(store)
  }

  componentWillMount() {
    // load the token
    if (localStorage.poller_token) {
      store.dispatch(authActions.login(localStorage.poller_token))
    }
  }

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

ReactDom.render(<Main />, document.getElementById('root'))