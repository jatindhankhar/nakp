import React,{ Component } from 'react';
import {getWikiPediaUrl  } from "./wikipedia_client";
import {Progress} from 'reactstrap';

class SideBar extends Component {    
    
    constructor(props){
        super(props);
        this.allLocations = [];
        this.state = {locations: []}
    }
    componentWillReceiveProps(newProps){
       if(newProps.places.length > 0 && newProps.places !== this.props.places){
          this.allLocations = newProps.places; 
          this.setState({locations: this.allLocations}) 
          this.sendMarkerLocations(newProps.places)  
       }
    }


    
    getPlaces(){
        
        if(this.props.isLoading) return(<Progress animated  value="100" />);
        if(this.props.isError) return(<h2>There was some error</h2>)
        else if(!this.props.isLoading && this.state.locations && this.state.locations.length < 0)
            return <h4> No data available </h4>
        else
        return this.state.locations.map( (place,idx) => {
            return (
                <li tabIndex={0} key={place.pageid} style={{cursor: 'pointer', marginBottom: '20px' }} onClick={evt => this.handlePlaceClick(idx)}>
                   <h4>{place.title}</h4> 
                </li>
            )
        })
    
    }

    buildDatafromLocations(places){
        return places.map(place => {return {coordinates:{ lat: place.coordinates[0].lat,lng: place.coordinates[0].lon},
                                             title: place.title, 
                                             wikiUrl: getWikiPediaUrl(place.pageid),
                                             thumbnail: place.thumbnail}})
    }

    sendMarkerLocations(places){
        this.props.syncMarkerLocations(this.buildDatafromLocations(places))
    }


    filterLocations(query){
       return this.allLocations.filter(el => el.title.toLowerCase().includes(query.toLowerCase()))
    }

    handlePlaceClick(idx){
        this.props.syncLocationIndex(idx)
    }
    handleSearch(event){
       if(event.target.value && event.target.value !== ""){
           let filteredLocations = this.filterLocations(event.target.value); 
           this.setState({locations: filteredLocations})
           this.sendMarkerLocations(filteredLocations)
       }
       else{
           this.setState({locations: this.allLocations})
           this.sendMarkerLocations(this.allLocations);
       }
    }
    render(){
        return (
            <div className={this.props.sidebarOpened ? "sidenav open" : "sidenav"}>
                <div style={{padding: '10px'}} className="text-center">
                    <div className="input-group input-group-lg" style={{marginBottom: '22px'}}>
                      <input type="text" label="Type to filter" aria-label="Type to filter" className="lifted form-control" onChange={evt => this.handleSearch(evt)} placeholder="Type to filter"  />
                   </div>
                              
                <ol>
                    {this.getPlaces()}
                </ol>
               </div> 
            </div>

        )
    }
}

export default SideBar;