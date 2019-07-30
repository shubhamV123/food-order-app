import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
const ButtonCenter = ({ link = "/", color = "primary", text = "View all Orders" }) => {
    return (
        <div className="d-flex justify-content-center mt-3">
            <Link to={link}>
                <Button color={color}>
                    {text}
                </Button>
            </Link>
        </div>
    )
}

export default ButtonCenter
