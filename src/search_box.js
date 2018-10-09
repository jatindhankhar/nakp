import React, {Component} from 'react'; 
import { loadGoogleMap } from './utils';
class SearchBox extends Component {
   

    render(){
        return (
            <form>
                 
                <div className="input-group input-group-lg" style={{boxShadow: '0px 6px 8px 4px grey', borderRadius: '10px'}}>
                   <input type="text" id="search-bar" ref="input" className="form-control"  placeholder="Search for a place"   />             
                   <button className="btn btn-lg" id="button-submit"> <i className="fa fa-search "> Go </i> </button>
                   <button ><i className="fa fa-times"></i></button>

               </div>

            </form>
        );
    }

    componentWillMount(){
        loadGoogleMap();
    }

    handlePlaceSelect(place){
        console.log(place.geometry.location.lat(),place.geometry.location.lng());
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