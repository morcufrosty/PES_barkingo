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
            Aquí aniria la descripció del puto gos.
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item variant="danger">Reports: {number}</ListGroup.Item>
          <ListGroupItem>Sexe</ListGroupItem>
          <ListGroupItem>Edat</ListGroupItem>
          <ListGroupItem>Raça</ListGroupItem>
          <ListGroupItem>Nom del puto usuari</ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Button variant="danger">Eliminar anunci</Button>
        </Card.Body>
      </Card>
    </div>
  ); 
}); 

function Animals() {

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

export default Animals;
