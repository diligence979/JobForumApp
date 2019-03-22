import React, { Component } from 'react'
import { Provider } from 'react-redux'
import getRouter from './app/router'
import store from './app/store/'

export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
            {getRouter()}
        </Provider>
    )
  }
}