import React from 'react'
import { withRouter } from 'react-router-dom';
const ListView = ({ data, history }) => {
    let orderId = Object.keys(data)[0];
    return (

        <tr key={orderId} className="cp" onClick={() => history.push({
            pathname: `/details/${orderId}`,
            state: {
                selectedData: data[orderId],
                totalPrice: data.totalPrice
            }
        })}>
            <th scope="row">{orderId}</th>
            <td>&#8377; {data.totalPrice}</td>
            <td>{data.status ? data.status : "-"}</td>
        </tr>
    )
}

export default withRouter(ListView)
