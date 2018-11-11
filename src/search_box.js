import React, {Component} from 'react'; 
import { loadGoogleMap } from './utils';

class SearchBox extends Component {
   

    render(){
        return (
            <form onSubmit={evt => evt.preventDefault()}>
                <div className="input-group input-group-lg" >
                   <input type="text"  id="search-bar" className="lifted form-control" ref="input"  placeholder="Search for a place"   />
               </div>

            </form>
        );
    }

    componentWillMount(){
        loadGoogleMap();
    }

    handlePlaceSelect(place){
        const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
        }
        this.props.syncLocation(location);
    }
    setUpAutoComplete(google){
        let autocomplete = new google.maps.places.Autocomplete(document.getElementById('search-bar')); 
        autocomplete.addListener('place_changed',() => this.handlePlaceSelect(autocomplete.getPlace()));     
    }
    componentDidMount(){
        loadGoogleMap().then((google) => this.setUpAutoComplete(google));
    }
}

export default SearchBox;