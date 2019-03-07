import React, { Component } from 'react'
import { Provider } from 'react-redux'
import getRouter from './app/router'
import store from './app/store/'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
        store: store
    }
  }


  render() {
    return (
        <Provider store={this.state.store}>
            {getRouter()}
        </Provider>
    )
  }
}