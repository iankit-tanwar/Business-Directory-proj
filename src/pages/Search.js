import { faStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { URL } from '../helper/url';
import img from '../assests/img/1.png';




export default function Search() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [businesses, setBusinesses] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {

        console.log('cat_name--->', searchParams.get('cat_name'));

        fetch(`${URL}/api/businesses?populate=*&filters[business_categories][name][$containsi]=${searchParams.get('cat_name')}`, {})
            .then(res => res.json())
            .then((data) => {
                console.log(data.data);
                setBusinesses(data.data);
            })
            .catch(err => err);
    }, []);

    return (
        <>
            <Row>
                <Col sm={9}>  <h1>Search Detail</h1>
                    {
                        businesses.map((cv, idx, arr) => {
                        
                          
                            return     <Card onClick={()=>{navigate('/detail?business_id='+cv.id)}} key={idx} className='p-3 mb-3'>
                           

                                <Row>
                                    <Col sm={3} >  <Card.Img className="img-fluid" variant="top" src={ (cv.attributes.photo.data!== null)?URL +cv.attributes.photo.data[0].attributes.url:img} /></Col>
                                    <Col sm={9}><Card.Body>
                                        <Card.Title> {cv.attributes.name}</Card.Title>



                                        <Badge className='p-2 fs-6 me-2' bg="success">
                                            4.0
                                        </Badge>  <span ><FontAwesomeIcon className=' text-warning' icon={faStar} />
                                            <FontAwesomeIcon className='text-warning' icon={faStar} />
                                            <FontAwesomeIcon className='text-warning' icon={faStar} />
                                            <FontAwesomeIcon className='text-warning' icon={faStar} />
                                            <FontAwesomeIcon className='text-secondary' icon={faStar} /></span>
                                        <span className='ms-2'>4,777 Rating</span>



                                        <Card.Text>
                                           {cv.attributes.desc}
                                        </Card.Text>
                                        <a  href={"tel:"+cv.attributes.phone} className="btn btn-success "  onClick={(e)=>{e.stopPropagation()}}>{'91-'+cv.attributes.phone}</a>
                                    </Card.Body></Col>



                                </Row>
                              
                            </Card>
                            
                        })
                    }


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
