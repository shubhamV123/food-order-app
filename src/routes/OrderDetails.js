import React, { useState, useEffect } from 'react'
import { Container, Button } from 'reactstrap';
import OrderDetailsView from '../Views/OrderDetailsView';
import ButtonCenter from '../Common/ButtonCenter';
const OrderDetails = ({ location, match }) => {
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    let { id } = match.params;
    let data = location.state.selectedData;
    let totalPrice = location.state.totalPrice;
    useEffect(() => {
        setLoading(false);
        let fetchDataFromLocalStorage = JSON.parse(localStorage.getItem('orderList') || "[]");
        const checkKeyExistInArray = fetchDataFromLocalStorage.some(item => {
            return Object.keys(item).indexOf(id) > -1
        })
        if (checkKeyExistInArray) {
            setSuccess(true)
        }
    }, [id])
    const handleSubmit = () => {
        setProcessing(true)
        setTimeout(() => {
            setProcessing(false);
            setSuccess(true);
            let fetchDataFromLocalStorage = JSON.parse(localStorage.getItem('orderList') || "[]");
            fetchDataFromLocalStorage.push({ [id]: data, totalPrice })

            localStorage.setItem('orderList', JSON.stringify(fetchDataFromLocalStorage))
        }, 1000)
    }

    if (loading) return <div>Loading...</div>
    if (Object.keys(data).length === 0) {
        return (
            <h2 className='text-center mt-3'>
                Your cart is Empty.
                <ButtonCenter link={"/"} text={" Place Order"} />
            </h2>
        )
    }
    return (
        <div>
            <h3 className="text-center mt-4 mb-4">Order Summary</h3>
            <Container>
                <OrderDetailsView data={data} />
                <h4 className="text-center">Your total order value is &#8377; {totalPrice} </h4>
                <div className="d-flex justify-content-center">
                    {
                        success ? (<div>
                            <i className="fas fa-check-circle"></i> Successfully Ordered. You can expect your order in x min
                        </div>) : <Button color="success" onClick={handleSubmit} disabled={processing}>{processing ? "processing" : "Click here to place"}</Button>
                    }

                </div>

                <ButtonCenter link={"/orderList"} />

            </Container>
        </div>
    )
}

export default OrderDetails
