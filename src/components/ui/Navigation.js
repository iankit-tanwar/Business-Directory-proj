import React from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';

export default function Navigation() {
    let myLogout = ()=>{

        window.localStorage.removeItem('token-->')
        window.location.href ='/login'
    }




    return (
        <><Navbar bg="light" expand="lg" className='h-100'>
            <Container fluid>
                <Navbar.Brand href="#">
                    <img
                        src={logo}
                        width="100"

                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
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
                            <Nav.Link onClick={()=>{myLogout()}} className='btn btn-link'>Logout</Nav.Link >

                                </>
                          
                         
                        }


                            </Nav>
                    
                </Navbar.Collapse>
            </Container>
        </Navbar></>
    )
}
