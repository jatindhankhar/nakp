import React,{ Component } from 'react';
class GoogleMaps extends Component {
    static defaultProps = {
        center: {
          lat: 28.5,
          lng: 76.9
        },
        zoom: 8
      };

      loadGoogleMap() {
        if(!window.googleMapLoader){
          this.googleMapLoader = new Promise((resolve) => {
            window.googleMapLoader = () => {
              // Stop linter complaints 
              /* global google*/
              resolve(google);
              delete window.googleMapLoader;
            }
            this.loadMapScript();
          });
      }
       return this.googleMapLoader;
      }
    
      loadMapScript(){
        const maps_script = document.createElement("script");
        const api_key = 'AIzaSyADBTO8EPakOj1iN6OtsHTLuzBOMXarVAE';
        maps_script.src = `https://maps.googleapis.com/maps/api/js?key=${api_key}&callback=googleMapLoader`;
        maps_script.async = true;
        maps_script.defer = true;
        document.body.appendChild(maps_script);
      }
    
      componentWillMount(){
        this.loadGoogleMap();
      }

    componentDidMount(){
        this.loadGoogleMap().then((google) => {
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