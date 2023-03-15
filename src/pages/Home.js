import React, { useEffect, useState } from 'react'






export default function Home() {
    const[businessCategory,setBusinessCategory]=useState([]);

    var x = 'http://localhost:1337';
    



useEffect(()=>{
    fetch(`${x}/api/business-categories?populate=*`)
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
                       <a href='#'>
                           <img src={`${x}`+cv.attributes.image.data.attributes.url} /><br /> {cv.attributes.name}</a>
                 </li>
                 })
               }
                
               
            </ul>
           
        </>
    )
}
