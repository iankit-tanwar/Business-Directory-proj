import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { URL } from '../helper/url';






export default function Home() {
    const[businessCategory,setBusinessCategory]=useState([]);

   // let x = 'http://localhost:1337';
    



useEffect(()=>{
    fetch(`${URL}/api/business-categories?populate=*`)
    .then((res)=>{
        return res.json()
        
    })
    .then((data)=>{
        console.log(data)
        setBusinessCategory(data.data)

    })
    .catch(()=>{

    });
},[]);









    return (
        <>
            <h1>HOME page</h1>
            
           <ul className='nav '>
           {
                   businessCategory.map((cv,idx,arr)=>{
                        return<li className='text-center ms-3'>
                       <Link to='search'>
                           <img src={`${URL}`+cv.attributes.image.data.attributes.url} /><br /> {cv.attributes.name}</Link>
                 </li>
                 })
               }
                
               
            </ul>
           
        </>
    )
}
