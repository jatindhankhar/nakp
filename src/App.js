import React, { Component } from 'react';
import './App.css';
import GoogleMaps from './google_maps';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <GoogleMaps/>
      </div>
    );
  }
}

export default App;
