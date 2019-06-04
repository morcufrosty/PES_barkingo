import React, { Component } from 'react';

import { Card, Button, ListGroup, ListGroupItem, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { getAllUsers } from "../Helpers/APIcalls"



export default class Users extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [1,2,3,4],
      isLoading: true,
    };
  }


  async handleStart(){

    let users = []
    users = await getAllUsers();

    console.log(users)

    //this.setState({users:users, isLoading:false})
    this.setState({isLoading:false})


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

  render() {
    
    if (this.state.isLoading) {
      this.handleStart()
      return (
        <div />
      )

    }

    return (
      <div>
        <div class='m-3 row fixed'>
        </div>
        <div>
          <div class="m-3 row">
            {this.renderUsers()}
          </div>
        </div>

      </div>
    );
  }
}

