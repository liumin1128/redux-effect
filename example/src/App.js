import React, { Component } from 'react';
import {connect} from 'react-redux'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  test = () => {
    const {dispatch} = this.props
    dispatch({ type: 'test/fetch' })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            hello world
          <button onClick={this.test}>test</button>
        </header>
      </div>
    );
  }
}

export default connect()(App);
