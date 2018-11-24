import React from 'react'; 

function InfoWindow(props){
    return ( <div tabIndex={0} className="text-center container-fluid">
                <h1>{props.title}</h1>
                <h2><a href={props.wikiUrl}>Read more at Wikipedia</a></h2>
    {props.thumbnail && <img className="img-responsive" src={props.thumbnail.source} alt={props.title}/>  }   
            </div>)
} 

export default InfoWindow;