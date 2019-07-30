import React from 'react';
import {
    Card, CardHeader, CardBody, Label, Input, Button
} from 'reactstrap';
const Price = ({ handleChange, active, handleReset }) => {
    return (
        <Card className="mt-2">
            <CardHeader>Select Price</CardHeader>
            <CardBody>
                <div className="custom-control custom-checkbox" key={"price-filter"}>
                    <Label check>
                        <Input type="radio" name="lowToHigh" data-category-type="price" checked={active === "lowToHigh"} onChange={handleChange} />
                        Low to high
                    </Label>
                    <Label check>
                        <Input type="radio" name="highToLow" data-category-type="price" checked={active === "highToLow"} onChange={handleChange} />
                        High to low
                    </Label>

                </div>
                <Button onClick={handleReset} className="mt-2" outline color={"primary"} disabled={!active}>Reset</Button>
            </CardBody>
        </Card >
    )
}

export default Price
