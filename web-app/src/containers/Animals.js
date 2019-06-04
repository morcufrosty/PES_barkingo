import React, { Component } from 'react';
import { Card, Button, ListGroup, ListGroupItem, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { get } from 'https';
import ImageComponent from '../Components/ImageComponent';
import { getDogOffers, getUserInfo, deleteOffer } from "../Helpers/APIcalls"






export default class Animals extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ofertes: [],
      isLoading: true,
      owners: [],
    };
  }



  async getImageFromServer(id) {
    return fetch(`http://10.4.41.164/api/offers/${id}/image`, {
      method: 'GET',
      headers: {
        Accept: '*',
        'x-access-token': localStorage.getItem("api_token")
      }
    }).then((response => {
      return response.text();
    }))
  }

  async getOffers() {
    var dogOffers = await this.getDogOffers();
    console.log(dogOffers);
    return dogOffers;
  }


  async handleStart() {
    let offers = []
    offers = await getDogOffers();
    let owners = []
    
    for(let i = 0; i < offers.length; i++){

      owners[i] = await getUserInfo(offers[i].idOwner);
      console.log(owners[i])

    }
    console.log(owners.length)



    this.setState({ offers: offers, owners: owners, isLoading: false })


  }

  async handleClick(id, e) {

    console.log("click")
    console.log(id)
    let resp = await deleteOffer(id)
    console.log(resp)
    this.setState({ isLoading: true, offers: [] })

  }


  renderOffers() {

    console.log(this.state.owners.length)

    return this.state.offers.map((animal, index) => {
      return (
        <div class='m-3'>
          <Card style={{ width: '18rem' }}>
            {<ImageComponent id={animal.id} type={"offer"} />}
            <Card.Body>
              <Card.Title>{animal.name}</Card.Title>
              <Card.Text>
                {animal.description}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item variant="danger">Reports: {animal.reports}</ListGroup.Item>
              <ListGroupItem>Sex: {animal.sex}</ListGroupItem>
              <ListGroupItem>Age: {animal.age}</ListGroupItem>
              <ListGroupItem>Race: {animal.race}</ListGroupItem>
              <ListGroupItem>Username: {this.state.owners[index].user.name}</ListGroupItem>
            </ListGroup>
            <Card.Body>
              <Button onClick={(e) => this.handleClick(animal.id, e)} variant="danger">Eliminar anunci</Button>
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



    return (
      <div>
        <div class='m-3 row fixed'>
        </div>
        <div>
          <div class="m-3 row">
            {this.renderOffers(this.state.owners)}
          </div>
        </div>

      </div>
    );
  }
}