import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { URL } from '../../helper/url';

export default function Navigation() {
const[logo , setLogo]=useState('')
var x = document.getElementById("demo");

    useEffect(()=>{
        fetch(`${URL}/api/website?populate=*`)
        .then(res=>res.json())
        .then((data)=>{
            console.log("Loggo====>",data.data.attributes.logo.data.attributes.url )
            setLogo(data.data.attributes.logo.data.attributes.url)
        }).catch(err=>err)
    },[])




    let myLogout = ()=>{

        window.localStorage.removeItem('token-->')
        window.location.href ='/login'
    }
    let detectLocation =()=>{
       // alert("hii")
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          } else {
            x.value = "Geolocation is not supported by this browser.";
          }
        
    }
    let showPosition=(position)=>{
        console.log(position)
        window.localStorage.setItem('addres---->','Village Rewla khanpur')
        x.value = "Village Rewla khanpur"
       // x.value = "Latitude: " + position.coords.latitude +
       // "<br>Longitude: " + position.coords.longitude;
      }




    return (
        <><Navbar bg="light" expand="lg" className='h-100'>
            <Container fluid>
                <Link to="/">
                    <img
                       src={`${URL}${logo}`}
                        width="100"

                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Form className="d-flex">
                        <Button className='btn btn-sm ms-3 ' onClick={()=>{detectLocation()}}>Detect Location</Button>

                        <Form.Control
                            type="text"
                            disabled
                            id="demo"
                            placeholder="Search"
                            className="ms-3"
                            
                        />
                        <Form.Control
                            type="search"
                         
                            placeholder="Search"
                            className="ms-3"
                            aria-label="Search"
                        />


                        <Button variant="outline-success" className='ms-3'>Search</Button>
                    </Form>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Link to="/" className='btn btn-link'>Home</Link>

                        {
                            window.localStorage.getItem('token-->') === null &&


                            <> <Link to="/login" className='btn btn-link'>Login</Link>
                                <Link to="/register" className='btn btn-link'>Register</Link>
                            </>

                        }

                        {
                            window.localStorage.getItem('token-->') !== null &&

                            <>
                             <Link to="/Business_Register" className='btn btn-link'>Business Register</Link>
                            <Nav.Link onClick={()=>{myLogout()}} className='btn btn-link'>Logout</Nav.Link >
                           

                                </>
                          
                         
                        }


                            </Nav>
                    
                </Navbar.Collapse>
            </Container>
        </Navbar></>
    )
}
