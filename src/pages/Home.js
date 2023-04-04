import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { URL } from '../helper/url';
import { Carousel, Col, Row } from 'react-bootstrap';





export default function Home() {
    const [businessCategory, setBusinessCategory] = useState([]);
    const [mainSlider, setMainSlider] = useState([]);


    // let x = 'http://localhost:1337';




    useEffect(() => {
        fetch(`${URL}/api/business-categories?populate=*`)
            .then((res) => {
                return res.json()

            })
            .then((data) => {
                console.log(data)
                setBusinessCategory(data.data)

            })
            .catch(() => {

            });

        fetch(`${URL}/api/website-frontend?populate[mainSliderComp][populate]=*`)
            .then((res) => {
                return res.json()

            })
            .then((data) => {
                console.log('main-slider---.', data.data.attributes.mainSliderComp)
                setMainSlider(data.data.attributes.mainSliderComp)

            })
            .catch(() => {

            });





    }, []);









    return (
        <>
            <h1>HOME page</h1>


            <Row>
                <Col className='a_tbdr2 mb-5' xs={6} >
                    <Carousel>

                        {
                            mainSlider && mainSlider.map((cv, idx, arr) => {
                                return <Carousel.Item>
                                    {
                                        console.log('bc name=====>',cv.business_category.data.attributes.name)
                                    }
                                    <Link to={'/search?cat_name'+cv.business_category.data.attributes.name}>
                                    <img
                                        className="d-block w-100"
                                        src={URL+cv.img.data.attributes.url}
                                        alt="First slide"
                                    /></Link>
                                   

                                </Carousel.Item>

                            })

                        }
                    </Carousel>
                </Col>
                <Col className='a_tbdr2'>S</Col>
            </Row>

            <ul className='nav '>
                {
                    businessCategory.map((cv, idx, arr) => {
                        return <li className='text-center ms-3'>
                            <Link to={'search?cat_name=' + cv.attributes.name}>
                                <img src={`${URL}` + cv.attributes.image.data.attributes.url} /><br /> {cv.attributes.name}</Link>
                        </li>
                    })
                }


            </ul>

        </>
    )
}
