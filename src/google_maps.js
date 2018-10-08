import React,{ Component } from 'react';
import {loadGoogleMap} from './utils'
class GoogleMaps extends Component {
    static defaultProps = {
        center: {
          lat: 28.5,
          lng: 76.9
        },
        zoom: 8
      };

      
    componentWillMount(){
        loadGoogleMap();
      }

    componentDidMount(){
        loadGoogleMap().then((google) => {
          const map = new google.maps.Map(document.getElementById('map'), {
            zoom: this.props.zoom,
            center: this.props.center
          });
        });
    
      }

    render(){
        return (<div id="map" style={{width: '100vw', height: '100vh'}}></div>)
    }
}

export default GoogleMaps;