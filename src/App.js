import React, { Component } from 'react';
import './App.css';
import GoogleMaps from './google_maps';
import SearchBox from './search_box';

class App extends Component {
  constructor(props){
    super(props);
    this.syncLocation = this.syncLocation.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
    /* Default Google Location */; 
    this.state = {location: {lat: 28.5274229, lng: 77.1389453}, zoomLevel: 12}
  }

  syncLocation(updatedLocation){
    this.setState({location: updatedLocation})
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(location => this.syncLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      }));
    }
  }

  componentDidMount(){
    this.getUserLocation();
  }
  render() {
    return (
      <div className="App" id="app-container">
        <GoogleMaps location={this.state.location} zoomLevel={this.state.zoomLevel} />
        <div id="over-map"> 
        <SearchBox syncLocation={this.syncLocation} />
        </div>
      </div>
    );
  }
}

export default App;
