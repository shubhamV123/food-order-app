import React from 'react';
import {
    Card, CardHeader, CardBody, Input, Label
} from 'reactstrap';
import { findCategories } from '../Methods'
const Categories = ({ data, handleChange }) => {
    const categoriesAre = findCategories(data);
    return (
        <Card>
            <CardHeader>Selection</CardHeader>
            <CardBody>
                {
                    Object.keys(categoriesAre).map((key, index) => {
                        return <div className="custom-control custom-checkbox" key={key + index}>
                            <span className="float-right badge badge-light round">{categoriesAre[key]}</span>
                            {/* <Input type="checkbox" className="custom-control-input" value={true} />
                            <label className="custom-control-label" >{key}</label> */}
                            <Label >
                                <Input type="checkbox" name={key} data-category-type="categories" onChange={handleChange} /> {key}
                            </Label>
                        </div>
                    })
                }



            </CardBody>
        </Card>
    )
}

export default React.memo(Categories);
