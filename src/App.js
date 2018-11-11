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
    this.setPlaces = this.setPlaces.bind(this);
    this.fetchPlaces = this.fetchPlaces.bind(this);
    this.syncMarkerLocations = this.syncMarkerLocations.bind(this);
    this.syncLocationIndex = this.syncLocationIndex.bind(this);
    /* Default Google Location */; 
    this.state = {location: {lat: 28.5274229, lng: 77.1389453}, zoomLevel: 12, sidebarOpened:false, markerLocations: [], places: [], isLoading: true, selectedIndex: undefined}
  }

  syncLocation(updatedLocation){
    this.setState({location: updatedLocation});
    this.fetchPlaces(updatedLocation);
  }

  syncMarkerLocations(markerLocations){
    this.setState({markerLocations: markerLocations});
  }

 

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(location => this.syncLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      }));
    }
  }

  fetchPlaces(location){
    this.setState({places: []})
    if(!this.state.isLoading) this.setState({isLoading: true})
    getPlacesInfo(location).then(this.setPlaces);    
  }

  setPlaces(response){
    this.setState({isLoading: false});
    if(response.query)
      this.setState({places: Object.values(response.query.pages)});
  }

  syncLocationIndex(idx){
    this.setState({selectedIndex: idx})
  }
  toggleSidebar(){
    this.setState({sidebarOpened: !this.state.sidebarOpened})
  }
  componentDidMount(){
    this.getUserLocation();
    this.fetchPlaces(this.state.location);
  }
  
  render() {
    return (
      <div>
      <div id="app-container" className={this.state.sidebarOpened ? "pushed" : "" }>
          <GoogleMaps location={this.state.location} 
                      zoomLevel={this.state.zoomLevel}
                      markerLocations={this.state.markerLocations}
                      selectedIndex={this.state.selectedIndex} />

          <div id="over-map"> 
             <Button color="info" id="toggle-sidebar" onClick={this.toggleSidebar}> <i className="fa fa-2x fa-bars"> </i> </Button> 
             <SearchBox syncLocation={this.syncLocation} />
          </div>  
      </div>
      <SideBar sidebarOpened={this.state.sidebarOpened} 
              toggleSidebar={this.toggleSidebar} 
              location={this.state.location} 
              isLoading={this.state.isLoading} 
              places={this.state.places}
              syncMarkerLocations={this.syncMarkerLocations}
              syncLocationIndex={this.syncLocationIndex}
              />

      </div>
      
    );
  }
}

export default App;
