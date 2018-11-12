import React,{ Component } from 'react';
import {loadGoogleMap} from './utils'
import InfoWindow from './infoWindow'
import ReactDOMServer from 'react-dom/server';

class GoogleMaps extends Component {
    
    constructor(props){
      super(props);
      this.markers = [];
      this.locationMarker = null;
      this.makeMarkers = this.makeMarkers.bind(this);
      this.setLocation = this.setLocation.bind(this);
      this.presentLocations = [];
      this.prevWindow = null;
    }
    componentWillMount(){
        loadGoogleMap();
      }
    
   
      
    componentWillReceiveProps(newProps){ 
      if(this.map === undefined) return;

      if(newProps.location !== this.props.location) {
          this.setLocation(newProps.location);
      }
      else if(newProps.markerLocations !== this.props.markerLocations){
        this.markLocations(newProps.markerLocations);
      }
      else if(newProps.selectedIndex !== this.props.selectedIndex){
        this.showInfoWindow(newProps.selectedIndex);
      }
    }

    showInfoWindow(idx){
       this.google.maps.event.trigger(this.markers[idx], 'click');
    }
    setLocation(newLocation){
      this.setState({location:newLocation});
      let location = new this.google.maps.LatLng(newLocation.lat,newLocation.lng)
      this.map.panTo(location);
      if(this.locationMarker) {this.locationMarker.setMap(null)}
      this.locationMarker = new this.google.maps.Marker({
        map: this.map,
        animation: this.google.maps.Animation.DROP,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        },
        position: location
      });
    }
    
    markLocations(markerLocations){
      this.presentLocations = markerLocations;
      this.clearMarkers();
      this.markers = this.makeMarkers(markerLocations);
      this.addMarkers();
    }

    makeMarkers(markerLocations){   
      return markerLocations.map( (location,idx) => this.makeMarker(location,idx));
    }

    makeMarker(location,idx){
      let marker = new this.google.maps.Marker({ 
        position: location.coordinates,
        animation: this.google.maps.Animation.DROP,
        map: this.map,
        label: {
         text: idx+1 + "",
         fontWeight: "bold"
        }
      });

      let infoWindow = new this.google.maps.InfoWindow({
        content: ReactDOMServer.renderToString(<InfoWindow title={location.title}
                                                           wikiUrl={location.wikiUrl} 
                                                           thumbnail={location.thumbnail}/>)
      }); 

    marker.addListener('click', () => {
      if (this.prevWindow)
        this.prevWindow.close();
      this.prevWindow = infoWindow;
      infoWindow.open(this.map, marker)
    });


      return marker;
  
    }

    addMarkers(){
      this.markers.forEach(marker => marker.setMap(this.map));
    }

    clearMarkers(){
      this.markers.forEach(marker => marker.setMap(null));
      this.markers = [];
    }

    componentDidMount(){
        loadGoogleMap().then((google) => {
           this.google = google; 
           this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: this.props.zoomLevel,
            center: this.props.location,
            fullscreenControl: false
          });
        });
      }


    render(){
        return (<div id="map"></div>)
    }
}

export default GoogleMaps;