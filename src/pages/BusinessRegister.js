import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import swal from 'sweetalert';


export default function BusinessRegister() {





    const [cities, setCities] = useState([]);
    const [businessCategory, setBusinessCategory] = useState([]);

    let url = 'http://localhost:1337';

    useEffect(() => {




        // call the city api

        fetch(`${url}/api/cities`, {
            method: "GET"
        })

            .then((res) => {
                return res.json()
            })

            .then((cityData) => {
                console.log("city--->", cityData.data)
                setCities(cityData.data)
            })

            .catch(err => err);




        //call the business apis

        fetch(`${url}/api/business-categories`, {})
            .then((res) => {
                return res.json()
            })

            .then((BusinessCategoryData) => {
                console.log("businesscategory---->", BusinessCategoryData.data)
                setBusinessCategory(BusinessCategoryData.data)
            })
            .catch(err => err);

    }, []);





    let busReg = () => {

      

        let payload = {
            "data": {
                "name": document.querySelector('input[name="business_name"]').value,
                "business_category": document.querySelector('select[name="business_id"]').value,
                "cities": [
                    document.querySelector('select[name="city_id"]').value
                ]
            }
        }



        fetch(`${url}/api/businesses`, {

        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(payload)
        })
            .then((res) => {
                res.json()

            }).then((data) => {
                console.log(data)
                swal("Good job!", "You clicked the button!", "success");

            }).catch(err => err);

    }




    return (
        <>
            <h1 className='text-center'>Business_Register</h1>
            <Form>

                <Form.Group className="mb-3" >
                    <Form.Label>Enter City</Form.Label>
                    <Form.Select name= "city_id" aria-label="Default select example">

                        {
                            cities.map((cv, idx, arr) => {
                                return <option key={idx} value={cv.id}>{cv.attributes.name}</option>

                            })
                        }


                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Enter Business_Category</Form.Label>
                    <Form.Select  name="business_id" aria-label="Default select example">


                        {
                            businessCategory.map((cv, idx, arr) => {
                                return <option key={idx} value={cv.id}>{cv.attributes.name}</option>

                            })
                        }

                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="business_name" placeholder="Enter email" />
                    <Form.Text className="text-muted">

                    </Form.Text>
                </Form.Group>


                <Button variant="primary" type="button" onClick={() => { busReg() }}>
                    BusinessRegister
                </Button>
            </Form>
        </>
    )
}
