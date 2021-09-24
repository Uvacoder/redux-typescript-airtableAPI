import React, { Component, PureComponent } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

// Pages
import Login from './pages/Login'

// Assets & Style
import './App.css'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div id="route-container">
            <Login></Login>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
