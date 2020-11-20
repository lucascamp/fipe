import React, { Component } from 'react';

import { Dropdown } from 'react-bootstrap';

class Brands extends Component {

    constructor(props) {
        super(props);
        this.state = {
        cars: [],
        isLoaded: false,
        }
    }

    componentDidMount() {
        fetch('http://fipeapi.appspot.com/api/1/carros/marcas.json')
            .then(res => res.json())
            .then(json =>
                this.setState ({  
                    brands: json,
                    isLoadedBrands: true,
                }) )
    }

    render() {

        var { isLoadedBrands, brands } = this.state;

        if(!isLoadedBrands) {
            return <div> loading ...</div>
        }

        else {
            console.log(brands);
            return (
            <div className="App">

                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Selecione a marca
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                                { brands.map( brand => (
                                    <Dropdown.Item href="#">{ brand.name }</Dropdown.Item>
                                    )
                                )
                                };
                </Dropdown.Menu>
                </Dropdown>

            </div>
            );
        }
    }
}

export default Brands