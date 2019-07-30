import React, { useState, useEffect } from 'react'
import { Container, Button } from 'reactstrap';
import OrderDetailsView from '../Views/OrderDetailsView';
import ButtonCenter from '../Common/ButtonCenter';
const OrderDetails = ({ location, match }) => {
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isCanceled, setCanceled] = useState(false);
    const [btnLoading, setBtnLoading] = useState(null)
    let { id } = match.params;
    let data = location.state.selectedData;
    let totalPrice = location.state.totalPrice;
    useEffect(() => {
        setLoading(false);
        let fetchDataFromLocalStorage = JSON.parse(localStorage.getItem('orderList') || "[]");
        const checkKeyExistInArray = fetchDataFromLocalStorage.find(item => {
            return Object.keys(item).indexOf(id) > -1
        })
        if (checkKeyExistInArray) {
            if (checkKeyExistInArray.status === "cancel") {
                setCanceled(true)
            }
            if (checkKeyExistInArray.status === "success") {
                setSuccess(true)
            }


        }
    }, [id])
    const handleClick = (status) => {
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            if (status === "success") {
                setBtnLoading("success")
                setSuccess(true);
            }

            if (status === "cancel") {
                setBtnLoading("cancel")
                setCanceled(true)
            }
            let fetchDataFromLocalStorage = JSON.parse(localStorage.getItem('orderList') || "[]");
            fetchDataFromLocalStorage.push({ [id]: data, totalPrice, status })

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
                <div className="d-flex justify-content-center align-items-center">
                    {isCanceled && (<> Your order has been cancelled</>)}
                    {success && (<><i className="fas fa-check-circle mr-3"></i> Successfully Ordered. You can expect your order in x min</>)}
                    {!success && !isCanceled && (
                        <>
                            <Button color="success" onClick={() => handleClick("success")} disabled={processing} className="mr-2">{btnLoading === "success" ? "processing" : "Click here to place"}</Button>
                            <Button color="danger" onClick={() => handleClick("cancel")} disabled={processing}>{btnLoading === "cancel" ? "processing" : "Click here to cancel"}</Button>
                        </>
                    )}



                </div>

                <ButtonCenter link={"/orderList"} />

            </Container>
        </div>
    )
}

export default OrderDetails
