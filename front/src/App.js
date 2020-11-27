import React, { Component } from 'react';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Brands from './Brands.js';


class App extends Component {

    render() {
      
      return (
        <div className="App">

            <Brands />

        </div>
      );
    }
}

export default App;
