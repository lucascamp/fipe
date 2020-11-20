import React, { Component } from 'react';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

import Brands from './Brands.js';

class App extends Component {

    constructor(props) {
      super(props);
      this.state = {
        cars: [],
        isLoaded: false,
      }
    }

    componentDidMount() {
        fetch('http://fipeapi.appspot.com/api/1/carros/veiculo/21/4826/2014-1.json')
            .then(res => res.json())
            .then(json =>
                this.setState ({  
                  cars: json,
                  isLoadedCars: true,
                }) )
    }

    render() {

        var { isLoadedCars, cars } = this.state;

        if(!isLoadedCars) {
          return <div> loading ...</div>
        }

        else {
          return (
            <div className="App">

            <Brands />

          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://3.bp.blogspot.com/-2-HOM_lKNOM/VYhYyqKZe3I/AAAAAAACJwQ/gyFXu4i6y2o/s1600/Fiat-Palio-Fire-2016%2B%25282%2529.jpg" />
                  
            <Card.Body>
              <Card.Title>{ cars.marca }</Card.Title>
              <Card.Text>
                { cars.name }
              </Card.Text>
            </Card.Body>

            <ListGroup className="list-group-flush">
              <ListGroupItem>Código FIPE: { cars.fipe_codigo }</ListGroupItem>
              <ListGroupItem>Referência:  { cars.referencia }</ListGroupItem>
              <ListGroupItem>Combustível: { cars.fipe_codigo }</ListGroupItem>
              <ListGroupItem>Ano:         { cars.ano_modelo }</ListGroupItem>
              <ListGroupItem>Preço:       { cars.preco }</ListGroupItem>
            </ListGroup>

            <Card.Body>
              <Button variant="info">Info</Button>{' '}
              <Button variant="light">Light</Button> <Button variant="dark">Dark</Button>{' '}
            </Card.Body>

            <Card.Body>
              <Card.Link href="#">Link</Card.Link>
            </Card.Body>
          </Card>
            </div>
          );
        }
    }
}

export default App;
