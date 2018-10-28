import React, { Component } from 'react';
import './App.css';
import GoogleMaps from './google_maps';
import SearchBox from './search_box';
import SideBar from './sidebar';
import {getPlacesInfo} from './wikipedia_client';
import { Button } from 'reactstrap';

class App extends Component {
  constructor(props){
    super(props);
    this.syncLocation = this.syncLocation.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    /* Default Google Location */; 
    this.state = {location: {lat: 28.5274229, lng: 77.1389453}, zoomLevel: 12, sidebarOpened:false}
  }

  syncLocation(updatedLocation){
    this.setState({location: updatedLocation})
    getPlacesInfo(updatedLocation.lat,updatedLocation.lng).then(res => console.log(res));
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(location => this.syncLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      }));
    }
  }

  toggleSidebar(){
    this.setState({sidebarOpened: !this.state.sidebarOpened})
  }
  componentDidMount(){
    this.getUserLocation();
  }
  render() {
    return (
      <div>
      <div id="app-container" className={this.state.sidebarOpened ? "pushed" : "" }>
          <GoogleMaps location={this.state.location} zoomLevel={this.state.zoomLevel} />
          <div id="over-map"> 
             <Button color="info" id="toggle-sidebar" onClick={this.toggleSidebar}> <i className="fa fa-2x fa-bars "> </i> </Button> 
             <SearchBox syncLocation={this.syncLocation} />
          </div>  
      </div>
      <SideBar sidebarOpened={this.state.sidebarOpened} toggleSidebar={this.toggleSidebar}/>       

      </div>
      
    );
  }
}

export default App;
