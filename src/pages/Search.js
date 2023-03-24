import { faStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom';
import { URL } from '../helper/url';



export default function Search() {

    const[searchParams , setSearchParams]= useSearchParams();
useEffect(()=>{
 
    console.log('cat_name--->', searchParams.get('cat_name'));

    fetch(`${URL}/api/businesses?populate=*&filters[business_categories][name][$containsi]=${searchParams.get('cat_name')}`,{})
    .then(res=>res.json())
    .then((data)=>{console.log(data)})
    .catch(err=>err);
},[]);

    return (
        <>
            <Row>
                <Col sm={9}>  <h1>Search Detail</h1>

                    <Card className='p-3'>

                        <Row>
                            <Col sm={3} >  <Card.Img className="img-fluid" variant="top" src="https://content.jdmagicbox.com/comp/mumbai/g9/022pxx22.xx22.130218195944.z7g9/catalogue/hotel-mina-international-jogeshwari-west-mumbai-hotels-sksukak303-250.jpg?w=3840&q=75" /></Col>
                            <Col sm={9}><Card.Body>
                                <Card.Title> Hotel Mina International</Card.Title>

                               
                                
                                <Badge  className='p-2 fs-6 me-2' bg="success">
                                    4.0
                                </Badge>  <span ><FontAwesomeIcon className=' text-warning' icon={faStar}/>
                                <FontAwesomeIcon className='text-warning' icon={faStar}/>
                                <FontAwesomeIcon className='text-warning' icon={faStar}/>
                                <FontAwesomeIcon className='text-warning' icon={faStar}/>
                                <FontAwesomeIcon className='text-secondary' icon={faStar}/></span>
                                <span className='ms-2'>4,777 Rating</span> 

                                

                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button className='btn btn-succes'>show number</Button>
                            </Card.Body></Col>



                        </Row>
                    </Card>
                </Col>
                <Col sm={3}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Header>Featured</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        </ListGroup>
                    </Card></Col>
            </Row>

            <br />

        </>

    )
}
