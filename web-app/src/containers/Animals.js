import React, {Component} from 'react';
import {Card, Button, ListGroup, ListGroupItem, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';





export default class Animals extends Component {

  constructor(props) {
    super(props);

    this.state = {
      animalOffers: new Array(),
    };
    this.getOffersRendered = this.getOffersRendered.bind(this);
  }

  async getDogOffers() {
    return fetch('http://10.4.41.164/api/offers/all', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("api_token")
        }
    }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson.offers;
        }).catch((error) => {
            console.error(error);
        });
  }

  async getImageFromServer(id) {
    return fetch(`http://10.4.41.164/api/offers/${id}/image`, {
      method: 'GET',
      headers: {
        Accept: '*',
        'x-access-token': localStorage.getItem("api_token")
      }
      }).then((response =>  {
        return response.text();
      }))
  }

  async getOffers(){
    var dogOffers = await this.getDogOffers();
    console.log(dogOffers);
    return dogOffers;
  }
  
  componentWillMount(){
    this.setState({animalOffers:this.getOffers()}) ;//({animalOffers: this.getOffers()});
  }

  getOffersRendered(){
    var ofertes = []
    console.log(this.state.animalOffers.length != undefined);
    if (this.state.animalOffers.length != undefined) ofertes = this.state.animalOffers;
    return ofertes.map((animal)=>{ 
      return (
        <div class='m-3'>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={this.getImageFromServer(1)} />
            <Card.Body>
              <Card.Title>{animal.name}</Card.Title>
              <Card.Text>
                De mom no està implementat
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item variant="danger">Reports: Num reports</ListGroup.Item>
              <ListGroupItem>{animal.sex}</ListGroupItem>
              <ListGroupItem>{animal.age}</ListGroupItem>
              <ListGroupItem>{animal.race}</ListGroupItem>
              <ListGroupItem>Nom del puto usuari</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button variant="danger">Eliminar anunci</Button>
            </Card.Body>
          </Card>
        </div>
      ); 
    });
  }
   
  

  render(){
    return (
      <div>
        <div class='m-3 row fixed'>
        </div>
        <div>
          <div class="m-3 row">
            {this.getOffersRendered()}
          </div>
        </div>
        
      </div>
    );
  }
}