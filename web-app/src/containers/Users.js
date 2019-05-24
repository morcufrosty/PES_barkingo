import React from 'react';
import {Card, Button, ListGroup, ListGroupItem, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


const numbers = [1,2,3,4,5,6,7,8,9]; 


const updatedNums = numbers.map((number)=>{ 
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

function Users() {

  return (
    <div>
      <div class='m-3 row fixed'>
      </div>
      <div>
        <div class="m-3 row">
          {updatedNums}
        </div>
      </div>
      
    </div>
  );
}

export default Users;
