import React, { useState } from 'react'
import { Input } from 'reactstrap';

const Quantity = ({ updateValue }) => {
    const [val, setVal] = useState("")
    const handleChange = (e) => {
        setVal(
            e.target.value.replace(/\D/, '')
        );
        updateValue(e.target.value.replace(/\D/, ''))
    }
    return (

        <>
            <Input type="text" value={val} invalid={isNaN(val)} onChange={handleChange}
                name="email"
                id="exampleEmail"
                placeholder="Add qty" />
        </>

    )
}

export default Quantity
