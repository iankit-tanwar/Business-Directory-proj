import React, { useEffect, useState } from 'react'






export default function Home() {
    const[BusinessCategory,setBusinessCategory]=useState();
    



useEffect(()=>{
    fetch(`http://localhost:1337/api/business-categories?populate=*`)
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
                   BusinessCategory.map((cv,idx,arr)=>{
                        return<li className='text-center ms-3'>
                       <a href='#'>
                           <img src={'http://localhost:1337'+cv.attributes.image.data.attributes.url} /><br /> {cv.attributes.name}</a>
                 </li>
                 })
               }
                
               
            </ul>
           
        </>
    )
}
