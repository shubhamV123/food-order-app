import React, { Component, Suspense } from 'react';
import { Link } from "react-router-dom";

import { Row, Col, Button } from 'reactstrap';
import axios from 'axios';
import { filterCategoryBasedData, filterPrice, calculation } from '../Methods'
const Categories = React.lazy(() => import('../Filters/Categories'));
const Price = React.lazy(() => import('../Filters/Price'));
const FoodTable = React.lazy(() => import('../FoodTable'));
class Home extends Component {
    state = {
        loading: true,
        data: [],
        filteredData: [],
        categories: {},
        price: null,
        selected: {
            qty: 0,
            totalPrice: 0,
            data: {}
        }

    }
    componentDidMount() {
        this.fetchFood()
    }
    fetchFood = async () => {
        try {
            let foodData = await axios.get('https://api.myjson.com/bins/99x8t');
            this.setState({ loading: false, data: foodData.data.meals, filteredData: foodData.data.meals });
        }
        catch (e) {
            alert("Something went wrong");
            this.setState({ loading: false })
        }
    }
    handleChange = (e) => {
        let filterType = e.target.getAttribute('data-category-type');
        let { categories, data } = this.state;
        if (filterType === "categories") {

            if (e.target.name in categories) {
                let updateExistingCategory = {
                    ...categories, [e.target.name]: !categories[e.target.name]
                }
                let filteredData = filterCategoryBasedData(data, updateExistingCategory);
                console.log("FilteredData", filteredData);
                this.setState({
                    categories: updateExistingCategory,
                    filteredData
                })
            }
            else {
                let existingCategory = {
                    ...categories,
                    [e.target.name]: true
                };
                let filteredData = filterCategoryBasedData(data, existingCategory);
                console.log("FilteredData", filteredData)
                this.setState({
                    categories: existingCategory,
                    filteredData
                })
            }
        }
        if (filterType === "price") {
            console.log("Price", e.target.name);
            let filteredData = filterPrice(this.state.filteredData, e.target.name);
            console.log("FilteredData", filteredData);
            this.setState({ price: e.target.name })
        }
    }
    handleReset = () => {
        this.setState({ price: null })
    }
    updateQuantity = (data) => {
        let { qty, totalPrice } = calculation(data);
        if (qty === this.state.selected.qty && totalPrice === this.state.selected.totalPrice) {
            return false;
        }
        this.setState({
            selected: {
                ...this.state.selected,
                qty,
                totalPrice,
                data
            }
        })
    }


    render() {
        let { filteredData, data, loading, price, selected } = this.state;
        if (loading) return <div>Loading...</div>;
        let { qty, totalPrice, data: selectedData } = selected;
        return (


            <Suspense fallback={<div>Loading...</div>}>

                <div className="d-flex justify-content-end align-items-center">

                    <Button outline className="mr-2 mt-2" >
                        <div>No .of Items : {qty} <br />Total Price : {totalPrice}
                        </div>
                    </Button>
                    <Link to={{
                        pathname: `/details/` + Math.random().toString(36).substring(7),
                        state: { selectedData, totalPrice },
                    }}>
                        <Button outline disabled={Object.keys(selectedData).length === 0} color="success" className="mr-2 mt-2" >
                            Go to cart
                        </Button>
                    </Link>

                </div>
                <Row className="m-4">
                    <Col md="2">
                        <Categories data={data} handleChange={this.handleChange} />
                        <Price handleChange={this.handleChange} active={price} handleReset={this.handleReset} />
                    </Col>
                    <Col md="10">
                        <FoodTable data={filteredData} updateQuantity={this.updateQuantity} />
                    </Col>
                </Row>
            </Suspense >


        )
    }
}

export default Home;
