import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import swal from 'sweetalert';
import { URL } from '../helper/url';


export default function BusinessRegister() {





    const [contries, setContries] = useState([]);
    const [state, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [businessCategory, setBusinessCategory] = useState([]);

   

    useEffect(() => {
        // call the countries api
       
        fetch(`${URL}/api/countries`, {
            method: "GET"
        })

            .then((res) => {
                return res.json()
            })

            .then((contriesData) => {
                console.log("country--->", contriesData.data)
                setContries(contriesData.data)
            })

            .catch(err => err);


             // call the states api
       
        fetch(`${URL}/api/statuses`, {
            method: "GET"
        })

            .then((res) => {
                return res.json()
            })

            .then((statesData) => {
                console.log("city--->", statesData.data)
                setStates(statesData.data)
            })

            .catch(err => err);





        // call the city api

        fetch(`${URL}/api/cities`, {
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

        fetch(`${URL}/api/business-categories`, {})
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



        fetch(`${URL}/api/businesses`, {

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

    let getStates=(e)=>{

       // alert("hii")

       console.log('onchange--->', e.target.value)
       let country_id = e.target.value

       fetch(`${URL}/api/statuses?filters[country][id][$eq]=${country_id}&populate=*`,{
        method:"GET"
       })
       .then(res=>res.json())
       .then((statesData)=>{
        console.log('statesdata',statesData.data)
        setStates(statesData.data)
       })
       .catch(err=>err);
    }

let getCities=(e)=>{
    console.log('onchange--->', e.target.value)
    let state_id = e.target.value

    fetch(`${URL}/api/cities?filters[state][id][$eq]=${state_id}&populate=*`,{
     method:"GET"
    })
    .then(res=>res.json())
    .then((cityData)=>{
     console.log('city--->datat',cityData.data)
     setCities(cityData.data)
    })
    .catch(err=>err);
 


}


    return (
        <>
            <h1 className='text-center'>Business_Register</h1>
            <Form>
            <Form.Group className="mb-3" >
                    <Form.Label>Country</Form.Label>
                    <Form.Select name= "country_id" aria-label="Default select example" onChange={(e)=>{getStates(e)}}>

                        {
                            contries.map((cv, idx, arr) => {
                                return <option key={idx} value={cv.id}>{cv.attributes.name}</option>

                            })
                        }


                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>State</Form.Label>
                    <Form.Select name= "state_id" aria-label="Default select example" onChange={(e)=>{getCities(e)}}>

                        {
                            state.map((cv, idx, arr) => {
                                return <option key={idx} value={cv.id}>{cv.attributes.name}</option>

                            })
                        }


                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label> City</Form.Label>
                    <Form.Select name= "city_id" aria-label="Default select example">

                        {
                            cities.map((cv, idx, arr) => {
                                return <option key={idx} value={cv.id}>{cv.attributes.name}</option>

                            })
                        }


                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label> Business_Category</Form.Label>
                    <Form.Select  name="business_id" aria-label="Default select example">


                        {
                            businessCategory.map((cv, idx, arr) => {
                                return <option key={idx} value={cv.id}>{cv.attributes.name}</option>

                            })
                        }

                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Business_Name</Form.Label>
                    <Form.Control type="email" name="business_name" placeholder="Enter Business_Name" />
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
