import React,{ Component } from 'react';
class SideBar extends Component {    
    

    componentWillReceiveProps(newProps){
       if(newProps.places.length > 0 && newProps.places !== this.props.places){
          this.sendMarkerLocations(newProps.places)  
       }
    }

    
    getPlaces(){
        
        if(this.props.isLoading) return(<p>"Loading ... "</p>);
        
        return this.props.places.map( place => {
            return (
                <li key={place.pageid}>
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
    render(){
        return (
            <div className={this.props.sidebarOpened ? "sidenav open" : "sidenav"}>
                <div style={{padding: '10px'}}>
                    <div className="input-group input-group-lg" >
                      <input type="text" className="lifted form-control" ref="input"  placeholder="Type to filter"  />
                   </div>
                              
                <ul>
                    {this.getPlaces()}
                </ul>
               </div> 
            </div>

        )
    }
}

export default SideBar;