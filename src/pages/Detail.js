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
      "Rate_scale": 0,
      "Description": "string",
      "users_permissions_users": [
        "string or id",
        "string or id"
      ],
      "businesses": [
        "string or id",
        "string or id"
      ]
    }
  }
  ]);

  
  useEffect(() => {

    setReviewPayload({
      data:{
        
        users_permissions_users:window.localStorage.getItem('user_id-->'),
       
  }

  }
  )
  


    




    console.log('business_id--->', searchParams.get('business_id'));
    let business_id = searchParams.get('business_id');


    fetch(`${URL}/api/businesses?populate=*&filters[id][$eq]=` + business_id, {})
      .then(res => res.json())
      .then((data) => {
        console.log('business_details', data)

        if (data.data.length > 0) {
          setBusName(data.data[0].attributes.name)

          setBusDetail(data.data)
          setBusPhotos(data.data[0].attributes.photo.data);

        } else {

        }


      })
      .catch(err => err)




      // review payload
      setReviewPayload({
        ...reviewPayload,
    
        data:{
          ...reviewPayload.data,
          businesses:searchParams.get('business_id')
         
         
    }
    
    }
    )

  }, []);


  
const handleSubmit =(value)=>{
 // evt.preventDefault();
 
  setReviewPayload({

    ...reviewPayload,
    data:{
      
      ...reviewPayload.data,
      Description:value

    

}})

}
  

  let submitReview=(e)=>{
   /* let desc = document.querySelector("textarea.review_desc").value
    console.log('desc--->',desc)
    
    console.log(reviewPayload);
    setReviewPayload({

      ...reviewPayload,
      data:{
        
        ...reviewPayload.data,
        Description:desc

      

  })*/

let JWT_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTY4MDEwODk2MCwiZXhwIjoxNjgyNzAwOTYwfQ.FC3yMB-FbqKRMNqcFzz0mExT-T3ObAJn91uFncpVwu4;' 



  fetch(`http://localhost:1337/api/reviews`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
   
      "Authorization": "Bearer"+ window.localStorage.getItem('token-->')
    },
      body: JSON.stringify(reviewPayload)

  })
  .then(res=>res.json())
  .then((data)=>{
    console.log(data)
  })
  .catch(err=>err);
}



  return (
    

    <>
    
      <h1> DETAIL page</h1>

      <h2>{busName}</h2>

      <Row>
        <Col  >
          <Carousel indicators={false} className="">

            {
               busPhoto && busPhoto.map((cv, idx, arr) => {
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

          <Form.Control as="textarea"  className='review_desc forn-control'  placeholder="Leave a comment here" onChange={e=> handleSubmit(  e.target.value)} />

        </Form.Group>



        <Button variant="primary" type="button" onClick={(e)=>{submitReview()}}>
          Submit
        </Button>
      </Form>

    </>
  )
}
