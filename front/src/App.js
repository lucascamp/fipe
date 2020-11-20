import React, { Component } from 'react';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

class App extends Component {

    constructor(props) {
      super(props);
      this.state = {
        items: [],
        isLoaded: false,
      }
    }

    componentDidMount() {
        fetch('http://fipeapi.appspot.com/api/1/carros/veiculo/21/4826/2014-1.json')
            .then(res => res.json())
            .then(json =>
                this.setState ({  
                  items: json,
                  isLoaded: true,
                }) )
    }

    render() {

        var { isLoaded, items } = this.state;

        if(!isLoaded) {
          return <div> loading ...</div>
        }

        else {
          console.log(items);
          return (
            <div className="App">
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="https://3.bp.blogspot.com/-2-HOM_lKNOM/VYhYyqKZe3I/AAAAAAACJwQ/gyFXu4i6y2o/s1600/Fiat-Palio-Fire-2016%2B%25282%2529.jpg" />
                  
                  <Card.Body>
                    <Card.Title>{ items.marca }</Card.Title>
                    <Card.Text>
                      { items.name }
                    </Card.Text>
                  </Card.Body>

                  <ListGroup className="list-group-flush">
                    <ListGroupItem>Código FIPE: { items.fipe_codigo }</ListGroupItem>
                    <ListGroupItem>Referência:  { items.referencia }</ListGroupItem>
                    <ListGroupItem>Combustível: { items.fipe_codigo }</ListGroupItem>
                    <ListGroupItem>Ano:         { items.ano_modelo }</ListGroupItem>
                    <ListGroupItem>Preço:       { items.preco }</ListGroupItem>
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
