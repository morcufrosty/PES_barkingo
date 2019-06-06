import React, { Component } from 'react';

import { Card, Button, ListGroup, ListGroupItem, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { getAllUsers,deleteUser } from "../Helpers/APIcalls"
import ImageComponent from"../Components/ImageComponent"



export default class Users extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isLoading: true,
    };
  }


  async handleStart(){

    let users = []
    let response = await getAllUsers();
    users = response.users;


    console.log(users)

    this.setState({users:users, isLoading:false})
   // this.setState({isLoading:false})


  }

  renderUsers() {

    return this.state.users.map((number) => {
      return (
        <div class='m-3'>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://cdn.thedailymash.co.uk/wp-content/uploads/20190324205212/middle-aged-man-fat-2.jpg" />
            <Card.Body>
              <Card.Title>Nom Usuari {number}</Card.Title>
              <Card.Text>
                Informació del puto usuari.
          </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item variant="danger">Reports: {number}</ListGroup.Item>
              <ListGroupItem>Email</ListGroupItem>
              <ListGroupItem>Sexe</ListGroupItem>
              <ListGroupItem>Edat</ListGroupItem>
              <ListGroupItem>Localització</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button variant="danger">Eliminar usuari</Button>
            </Card.Body>
          </Card>
        </div>
      );
    });
  }


  async handleClick(id, e) {

    console.log("click")
    console.log(id)
    let resp = await deleteUser(id)
    console.log(resp)
    this.setState({ isLoading: true, offers: [] })

  }

  
  renderOffers() {

    return this.state.users.map((element, index) => {
      return (
        <div class='m-3'>
          <Card style={{ width: '18rem' }}>
            {<ImageComponent id={element.id} type={"user"} />}
            <Card.Body>
              <Card.Title>{element.name}</Card.Title>
              <Card.Text>
                {element.bio}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Email: {element.email}</ListGroupItem>
              <ListGroupItem>Username: {element.username}</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button onClick={(e) => this.handleClick(element.id, e)} variant="danger">Eliminar usuari</Button>
            </Card.Body>
          </Card>
        </div>
      );
    }
    );
  }

  render() {
    
    if (this.state.isLoading) {
      this.handleStart()
      return (
        <div />
      )

    }
console.log(this.state.users)
    return (
      <div>
        <div class='m-3 row fixed'>
          {this.renderOffers()}
        </div>
        <div>
          <div class="m-3 row">
          </div>
        </div>

      </div>
    );
  }
}

