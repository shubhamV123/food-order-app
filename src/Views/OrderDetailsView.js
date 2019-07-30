import React from 'react'
import { Table } from 'reactstrap';

const OrderDetailsView = ({ data }) => {

    const renderRow = () => {
        return Object.keys(data).map(order => {
            let { name, qty, price, discounts } = data[order]
            return <tr key={name + qty}>
                <th scope="row">{name}</th>
                <td>{price}</td>
                <td>{qty}</td>
                <td>{`${discounts ? discounts : "none"}`}</td>
            </tr>
        })
    }
    return (
        <Table hover>
            <thead>
                <tr>
                    <th>Order Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Discount</th>
                </tr>
            </thead>
            <tbody>

                {renderRow()}
            </tbody>
        </Table>
    )
}

export default OrderDetailsView
