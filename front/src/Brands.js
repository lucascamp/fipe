import React, { Component } from 'react';

import { Dropdown } from 'react-bootstrap';

import Cars from './Cars.js';

class Brands extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoadedBrands: false,
            isLoadedModels: false,
            isLoadedYears: false,
            brand: 0,
            model: 0,
            year: 0,
        }

        this.changeModels = this.changeModels.bind(this);
        this.changeYears = this.changeYears.bind(this);
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

    changeModels(e) {
        this.setState({ brand: e.target.value })

        fetch('http://fipeapi.appspot.com/api/1/carros/veiculos/21.json')
            .then(res => res.json())
            .then(json =>
                this.setState ({  
                    models: json,
                    isLoadedModels: true,
            }) )
    }

    changeYears(e) {
        this.setState({ model: e.target.value })

        fetch('http://fipeapi.appspot.com/api/1/carros/veiculo/21/4828.json')
            .then(res => res.json())
            .then(json =>
                this.setState ({  
                    years: json,
                    isLoadedYears: true,
            }) )

    }

    render() {

        var { 
            isLoadedBrands, brands,
            models, years
        } = this.state;

        if(!isLoadedBrands) {
            return <div> loading ...</div>
        }

        else if(isLoadedBrands) {
            return (
            <div className="brands">
                <select onChange={this.changeModels} >
                    { brands.map( brand => (
                                <option value={ brand.id }>{ brand.name }</option>
                            )
                        )
                    };
                </select>

                { this.state.isLoadedModels ? 
                    <div className="models">
                        <select onChange={this.changeYears} >
                                { models.map( model => (
                                            <option value={ model.id }>{ model.name }</option>
                                        )
                                    )
                                };
                            </select>
                            </div> : 
                null }

                { this.state.isLoadedYears ? 
                    <div className="years">
                        <select onChange={this.changeYears} >
                                { years.map( year => (
                                            <option value={ year.id }>{ year.name }</option>
                                        )
                                    )
                                };
                            </select>
                            </div> : 
                null }

                { this.state.isLoadedYears ? <Cars testeid={'21/4826/2013-1'} /> : null }

    </div>
            );
        }
    }
}

export default Brands