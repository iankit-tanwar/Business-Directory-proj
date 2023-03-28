import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Button, Card, Carousel, Col, Form, Row } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating';
import { URL } from '../helper/url';

export default function Detail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [busDetail, setBusDetail] = useState([]);
  const [busPhoto, setBusPhotos] = useState([]);
  const [busName, setBusName] = useState('');
  const [rating, setRating] = useState(0)
  const handleRating = (rate: number) => {
    setRating(rate)
    setReviewPayload({
      data:{Rate_scale:rate
  }})
   

    // other logic
  }
  // Optinal callback functions
  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value: number, index: number) => console.log(value, index)


  const [reviewPayload,setReviewPayload]=useState([{
                                            "data": {
                                              "Rate_scale": 1,
                                              "Description": "good",
                                              "users_permissions_users": [
                                              15
                                              ],
                                              "businesses": [
                                              14
                                              ]
                                            }
  }]);

  
  useEffect(() => {
    


    const svg = document.querySelector("svg")

    svg.addEventListener('mouseover', () => console.log('Event: mouseover'));

    



    console.log('hotel_id--->', searchParams.get('hotel_id'));
    let hotel_id = searchParams.get('hotel_id');


    fetch(`${URL}/api/businesses?populate=*&filters[id][$eq]=` + hotel_id, {})
      .then(res => res.json())
      .then((data) => {
        console.log('hotel_details', data)

        if (data.data.length > 0) {
          setBusName(data.data[0].attributes.name)

          setBusDetail(data.data)
          setBusPhotos(data.data[0].attributes.photo.data);

        } else {

        }


      })
      .catch(err => err)
  }, []);


  let star = (e) => {
  /*  console.log(e.target)
    let elm = e.target;
    elm.classList.remove("text-secondary");
    elm.classList.add("text-warning")

  */}
  

  

  let submitReview=(e)=>{
    let desc = document.querySelector("textarea.review_desc").value
    console.log('desc--->',desc)
    
    console.log(reviewPayload);

    setReviewPayload({
      data:{Description:desc
  }

  })
}



  return (
    

    <>
    
      <h1> DETAIL page</h1>

      <h2>{busName}</h2>

      <Row>
        <Col  >
          <Carousel indicators={false} className="">

            {
              busPhoto.map((cv, idx, arr) => {
                return <Carousel.Item>
                  <img
                    className="w-50"
                    src={URL + cv.attributes.url}
                    alt="First slide"
                  />

                </Carousel.Item>

              })
            }


          </Carousel>



        </Col>
      </Row>

      <Form>
        <Form.Label>

    
          <Rating
        onClick={handleRating}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
        /* Available Props */
      />



        </Form.Label>
        <Form.Group className="mb-3" >
          <Form.Label>Tell about your experience</Form.Label>

          <Form.Control as="textarea"  className='review_desc forn-control'  placeholder="Leave a comment here" />

        </Form.Group>



        <Button variant="primary" type="button" onClick={(e)=>{submitReview()}}>
          Submit
        </Button>
      </Form>

    </>
  )
}
