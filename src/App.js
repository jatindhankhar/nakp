import React, { Component } from 'react';
import './App.css';
import GoogleMaps from './google_maps';
import SearchBox from './search_box';

class App extends Component {
  
  render() {
    return (
      <div className="App" id="app-container">
        <GoogleMaps/>
        <div id="over-map"> 
        <SearchBox />
        </div>
      </div>
    );
  }
}

export default App;
