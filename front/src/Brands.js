import React, { Component } from 'react';

import { Dropdown } from 'react-bootstrap';

import Cars from './Cars.js';

class Brands extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            isLoaded: false,
            brand: 21,
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
            return (
            <div className="App">

            <div>
                <select onChange={(e) => this.setState({ brand: e.target.value })}>
                    { brands.map( brand => (
                                <option value={ brand.id }>{ brand.name }</option>
                            )
                        )
                    };
                </select>
            </div>


            {this.renderSelectedCard(this.state.brand)}

            <Cars testeid={this.state.brand+'/4826/2013-1'} />
                

            </div>
            );
        }
    }

    renderSelectedCard(brand) {
        
    }



}

export default Brands