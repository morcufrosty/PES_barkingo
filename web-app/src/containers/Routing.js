import Users from './Users'
import Login from './Login'
import Animals from './Animals'
import NotFound from './NotFound'
import {Card, Button, ListGroup, ListGroupItem, Nav} from 'react-bootstrap';
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'
import React, { Component } from "react";



export default class Routing extends React.Component{

    constructor(){
        super();
        this.state = {
            loggedIn: false,
            activePage: "Animals"
        };
        this.login=this.login.bind(this);
        this.changeActivePage=this.changeActivePage.bind(this);
    }

    login = function () {
        this.state.loggedIn = true
        this.forceUpdate();
    }    

    changeActivePage = function (par){
        this.state.activePage=par;
        console.log(this.state.activePage);
    }

    getActivePage = function () {
        console.log(this.state.activePage);
        if(this.state.activePage=="Animals") return <Animals/>;
        if(this.state.activePage=="Users") return <NotFound/>;
        if(this.state.activePage=="Other") return <NotFound/>;
    }

    getRoute = function (){
        if(!this.state.loggedIn){
            return <Login login={this.login}/>
        }else{
            return(
            <div>
               <Nav  onSelect={selectedKey => this.changeActivePage(selectedKey)}  justify variant="tabs" defaultActiveKey="/animals">
                    <Nav.Item>
                    <Nav.Link eventKey="Animals">Animals</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="Users">Users</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="Other">Other Settings</Nav.Link>
                    </Nav.Item>
                </Nav>
                {this.getActivePage()}
            </div>
            )
        }
    }

    render()
    {
        return(
                <div>
                    {this.getRoute()}
                </div>        
        );
    }
}
