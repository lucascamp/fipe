import React, { Component } from 'react';

import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

class Cars extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            isLoaded: false,
        }
    }

    componentDidMount() {

        fetch(`http://fipeapi.appspot.com/api/1/carros/veiculo/${encodeURIComponent(this.props.brandId)}/${encodeURIComponent(this.props.modelId)}/${encodeURIComponent(this.props.yearId)}.json`)
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
            return <div> <img src='https://i.pinimg.com/originals/07/24/88/0724884440e8ddd0896ff557b75a222a.gif'/> </div>
        }

        else {
            return (
                
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://assets.flatpyramid.com/wp-content/uploads/uploads/3d-models/images/sedan/generic-car-upper-class-3d-model-115919.jpg" />
                        
                <Card.Body>
                    <Card.Title>{ cars.marca } </Card.Title>
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
            </Card>
            );
        }
    }
}

export default Cars