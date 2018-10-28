import React,{ Component } from 'react';
import {loadGoogleMap} from './utils'
class GoogleMaps extends Component {
    
  
    componentWillMount(){
        loadGoogleMap();
      }
    
    componentWillReceiveProps(newProps){ 
      if(this.map !== undefined && newProps.location) {
          this.setState({location: newProps.location});
          let location = new this.google.maps.LatLng(newProps.location.lat,newProps.location.lng)
          this.map.panTo(location);
      }
    }  
    componentDidMount(){
        loadGoogleMap().then((google) => {
           this.google = google; 
           this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: this.props.zoomLevel,
            center: this.props.location
          });
        });
    
      }

    render(){
        return (<div id="map"></div>)
    }
}

export default GoogleMaps;