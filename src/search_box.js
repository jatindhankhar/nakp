import React, {Component} from 'react'; 
class SearchBox extends Component {

   
    onPlacesChanged(evt){
        console.log(evt.target.value);
    }

    render(){
        return (
            <form>
                 
                <div className="input-group input-group-lg" style={{boxShadow: '0px 6px 8px 4px grey', borderRadius: '10px'}}>
                   <input type="text" ref="input" className="form-control" onChange={this.onPlacesChanged} placeholder="Search for a place" id="search-text"  />             
                   <button className="btn btn-lg" id="button-submit"> <i className="fa fa-search "> Go </i> </button>
                   <button ><i className="fa fa-times"></i></button>

               </div>

            </form>
        );
    }
}

export default SearchBox;