import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Card, Carousel, Col, Row } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import { URL } from '../helper/url';

export default function Detail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [busDetail, setBusDetail] = useState([]);
  const [busPhoto, setBusPhotos]=useState([]);
  const[busName,setBusName]=useState('');
  useEffect(() => {



    console.log('hotel_id--->', searchParams.get('hotel_id'));
    let hotel_id = searchParams.get('hotel_id');


    fetch(`${URL}/api/businesses?populate=*&filters[id][$eq]=` + hotel_id, {})
      .then(res => res.json())
      .then((data) => {
        console.log('hotel_details', data)

        if(data.data.length > 0){
          setBusName( data.data[0].attributes.name)

          setBusDetail(data.data)
          setBusPhotos(data.data[0].attributes.photo.data);

        }else{

        }


      })
      .catch(err => err)
  }, []);



  return (

    <>
      <h1> DETAIL page</h1>
      
        <h2>{busName}</h2>
      
      <Row>
        <Col  >
          <Carousel indicators={false}>

            {
              busPhoto.map((cv, idx, arr) => {
                return <Carousel.Item>
                <img
                  className=" w-100"
                  src={URL+cv.attributes.url}
                  alt="First slide"
                />
  
              </Carousel.Item>

              })
            }
            

          </Carousel>



        </Col>
      </Row>

    </>
  )
}
