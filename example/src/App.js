import React, { Component } from 'react';
import {connect} from 'react-redux'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  fetch = () => {
    const { dispatch } = this.props
    dispatch({ type: 'text/fetch' })
  }
  reset = () => {
    const {dispatch} = this.props
    dispatch({ type: 'counter/save', payload :{ number: 0 } })
  }
  add = () => {
    const {dispatch} = this.props
    dispatch({ type: 'counter/add' })
  }
  reduce = () => {
    const {dispatch} = this.props
    dispatch({ type: 'counter/reduce' })
  }
  render() {
    const {text,counter} = this.props
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            {text.text}
          <button className="button" onClick={this.fetch}>Click</button>
          <br/>
          {counter.number}
          <div className="flex">
          <button className="button" onClick={this.add}>+</button>
          <button className="button" onClick={this.reduce}>-</button>
          <button className="button" onClick={this.reset}>reset</button>
          </div>

        </header>
      </div>
    );
  }
}

export default connect(({ text, counter }) => ({ text, counter }))(App);
