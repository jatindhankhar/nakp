import React,{ Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

class SideBar extends Component {
    render(){
        return (
            <div className={this.props.sidebarOpened ?  "sidenav open" : "sidenav"}>
                <a href="javascript:void(0)" className="closebtn" onClick={this.props.toggleSidebar} >&times;</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                 <a href="#">Clients</a>
                 <a href="#">Contact</a>
            </div>

        )
    }
}

export default SideBar;