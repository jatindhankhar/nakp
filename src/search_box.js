import React, {Component} from 'react'; 
import { loadGoogleMap } from './utils';
import { Button, ButtonGroup } from 'reactstrap';

class SearchBox extends Component {
   

    render(){
        return (
            <form>
                 
                <div className="input-group input-group-lg" >
                   <input type="text" style={{ boxShadow: '#373737 0px 6px 8px 4px', borderRadius: '10px'}} id="search-bar" className="shadowed form-control" ref="input"  placeholder="Search for a place"   />
                   <ButtonGroup style={{ boxShadow: '#373737 0px 6px 8px 4px', borderRadius: '10px', marginLeft: '15px'}} className="shadowed">             
                   <Button color='white' id="button-submit"> <i className="fa fa-search "> Go </i> </Button>
                   <Button onClick="" color="white" ><i className="fa fa-times"></i></Button>
                   </ButtonGroup> 
               </div>

            </form>
        );
    }

    componentWillMount(){
        loadGoogleMap();
    }

    handlePlaceSelect(place){
        debugger;
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