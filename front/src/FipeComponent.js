import React, { Component } from 'react';

import { Dropdown, Container, Row, Col, Image } from 'react-bootstrap';

import Cars from './Cars.js';

export default class FipeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoadedBrands: false,
            isLoadedModels: false,
            isLoadedYears: false,
            isLoadedCar: false,
            brand: 0,
            model: 0,
            year: 0,
            car: 0,
            brandText: 'Selecione a Marca',
            modelText: 'Selecione a Modelo',
            yearText: 'Selecione o Ano',
        }

        this.changeModels = this.changeModels.bind(this);
        this.changeYears = this.changeYears.bind(this);
        this.changeCar = this.changeCar.bind(this);
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
        this.setState({ 
                        brand: e.target.value, 
                        isLoadedModels: false,
                        isLoadedYears: false,
                        isLoadedCar: false 
                    })

        fetch(`http://fipeapi.appspot.com/api/1/carros/veiculos/${encodeURIComponent(e.target.value)}.json`)
            .then(res => res.json())
            .then(json =>
                this.setState ({  
                    models: json,
                    isLoadedModels: true,
            }) )
    }

    changeYears(e) {
        this.setState({ 
                        model: e.target.value,
                        isLoadedYears: false,
                        isLoadedCar: false 
                    })

        fetch(`http://fipeapi.appspot.com/api/1/carros/veiculo/${encodeURIComponent(this.state.brand)}/${encodeURIComponent(e.target.value)}.json`)
            .then(res => res.json())
            .then(console.log())
            .then(json =>
                this.setState ({  
                    years: json,
                    isLoadedYears: true,
            }) )
    }

    changeCar(e) {
        this.setState({ year: e.target.value, isLoadedCar: true })
    }

    render() {

        var { 
            isLoadedBrands, brands,
            models, years
        } = this.state;

        if(!isLoadedBrands) {
            return <div> <img src='https://i.pinimg.com/originals/07/24/88/0724884440e8ddd0896ff557b75a222a.gif'/> </div>
        }

        else if(isLoadedBrands) {
            return (
            <div className="fipe">
                <Container fluid>
                    <Row>
                        <Col md={4} >
                            <Row>
                                <Col className='logo-fipe'> <Image src="https://lh3.googleusercontent.com/proxy/_XCgjMAl0i5CdohazVE05JFkGRz9rqizpF5Fgm3gmcZ4EmDoyFotuBXohSBDTd3aN7CAMpOaGFl9oYirmE30U-f433TLCd4vLEqeKGXLICQFDP-__yWW8qk" fluid /> </Col>
                            </Row>
                            <Row>
                                <Col>
                                <div className='selectDiv'>
                                    <select onChange={this.changeModels}>
                                        { brands.map( brand => (
                                                    <option value={ brand.id }>{ brand.name }</option>
                                                )
                                            )
                                        };
                                    </select>
                                </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    { this.state.isLoadedModels ? 
                                        <div className='selectDiv'>
                                            <select onChange={this.changeYears} >
                                                { models.map( model => (
                                                            <option value={ model.id }>{ model.name }</option>
                                                        )
                                                    )
                                                };
                                            </select>
                                        </div>
                                        : null
                                    }
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    { this.state.isLoadedYears ? 
                                        <div className='selectDiv'>
                                            <select onChange={this.changeCar} className='select'>
                                                { years.map( year => (
                                                            <option value={ year.id }>{ year.name }</option>
                                                        )
                                                    )
                                                }
                                            </select>
                                        </div>
                                        : null
                                    }
                                </Col>
                            </Row>
                        </Col>

                        <Col md={8}>
                                { this.state.isLoadedCar ? 
                                    <Cars   
                                        brandId = {this.state.brand} 
                                        modelId = {this.state.model}
                                        yearId  = {this.state.year}
                                    /> 
                                    : null 
                                }
                        </Col>
                        
                    </Row>
                </Container>
            </div>
            );
        }
    }
}
