import React from 'react'
import { Table } from 'reactstrap';
import Row from './Row';
const FoodTable = ({ data, updateQuantity }) => {
    return (
        <Table>
            <thead>
                <tr>

                    <th>Food Name</th>
                    <th>Ingredients</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Select</th>

                </tr>
            </thead>
            <tbody>
                <Row meals={data} updateQuantity={updateQuantity} />
            </tbody>
        </Table>
    )
}

export default FoodTable;
