import React,{ Component } from 'react';
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
        
        if(this.props.isLoading) return(<p>"Loading ... "</p>);
        return this.state.locations.map( place => {
            return (
                <li key={place.pageid} style={{cursor: 'pointer', marginBottom: '20px' }}>
                   <h4>{place.title}</h4> 
                </li>
            )
        })
    
    }

    buildCoordinatesfromLocations(places){
        return places.map(place => {return {lat: place.coordinates[0].lat,lng: place.coordinates[0].lon}})
    }

    sendMarkerLocations(places){
        this.props.syncMarkerLocations(this.buildCoordinatesfromLocations(places))
    }


    filterLocations(query){
       return this.allLocations.filter(el => el.title.toLowerCase().includes(query.toLowerCase()))
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
                <div style={{padding: '10px'}}>
                    <div className="input-group input-group-lg" style={{marginBottom: '22px'}}>
                      <input type="text" className="lifted form-control" onChange={evt => this.handleSearch(evt)} placeholder="Type to filter"  />
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