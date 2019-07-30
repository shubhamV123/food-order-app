import React, { useState, useEffect } from 'react'
import { Container, Table } from 'reactstrap';
import ListView from '../Views/ListView';
import ButtonCenter from '../Common/ButtonCenter';
const OrderList = () => {

    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    useEffect(() => {
        setLoading(false);
        let fetchDataFromLocalStorage = JSON.parse(localStorage.getItem('orderList') || "[]");
        setList(fetchDataFromLocalStorage);
    }, [])


    if (loading) return <div>Loading...</div>;
    if (list.length === 0) return <h2 className='text-center mt-3'>
        Your cart is Empty.
                <ButtonCenter link={"/"} text={" Place Order"} />
    </h2>
    return (
        <div>
            <h3 className="text-center mt-4 mb-4">Order List</h3>
            <Container>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Total Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map(data =>
                                < ListView data={data} />)
                        }
                    </tbody>
                </Table>
                <ButtonCenter text="Create New Order" />

            </Container>
        </div>
    )
}

export default OrderList;
