import React, { useState } from 'react'
import { Button } from 'reactstrap';
import Quantity from './Quantity'
const Row = ({ meals, updateQuantity }) => {
    const [orders, setOrder] = useState({});
    const updateValue = (val, data) => {

        setOrder({
            ...orders, [data.id]: {
                ...data,
                qty: val
            }
        })
    }

    return meals.map(data => {
        return (

            < tr key={data.id} >
                <th scope="row">{data.name}</th>
                <td>{data.Ingredients.join(',')}</td>
                <td>&#8377; {data.price}</td>
                <td>{data.category} </td>
                <td><Quantity updateValue={(val) => updateValue(val, data)} /></td>
                <td><Button color={`${orders[data.id] && orders[data.id].qty ? "success" : "primary"}`} outline disabled={!Boolean(orders[data.id]) || !orders[data.id].qty} onClick={() => updateQuantity(orders)}>Add</Button></td>
            </tr >


        )
    })

}

export default Row
