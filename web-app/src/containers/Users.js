import React from 'react';
import {Card, Button, ListGroup, ListGroupItem, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


const numbers = [1,2,3,4,5,6,7,8,9]; 


const updatedNums = numbers.map((number)=>{ 
  return (
    <div class='m-3'>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
        <Card.Body>
          <Card.Title>Nom gos {number}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Sexe</ListGroupItem>
          <ListGroupItem>Edat</ListGroupItem>
          <ListGroupItem>Raça</ListGroupItem>
          <ListGroupItem>Nom del puto usuari</ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>
    </div>
  ); 
}); 

function Users() {

  return (
    <div>
      <div class='m-3 row fixed'>
      </div>
      <div>
        <div class="row">
          {updatedNums}
        </div>
      </div>
      
    </div>
  );
}

export default Users;
