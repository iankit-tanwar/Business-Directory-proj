import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

export default function Register() {
  //hooks area
  const [payload, setPayload] = useState({
    "username": "ankit",
    "email": "ankit@strapi.io",
    "password": "Test1234"


  });

  let registerUser = () => {
    alert('okokokok')


    let u = document.querySelector('input[name=username]').value;
    let e = document.querySelector('input[name=email]').value;
    let p = document.querySelector('input[name=password]').value;


    console.log(u)
    console.log(e)
    console.log(p)

   
    setPayload(
      {
        "username": u,
        "email": e,
        "password": p
    
    
      }

     
    );
    console.log(payload)


    fetch(`http://localhost:1337/api/auth/local/register`,{
      method:'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(payload)
    })
    .then((res)=>{res.json()})
    .then((data)=>{
      console.log(data)
    })
    .catch(err=>err);
      



  }



  return (
    <>
      <h1>HOME REGISTER</h1>
      <Form>
        <Form.Group className="mb-3" >
          <Form.Label>User Name</Form.Label>
          <Form.Control name="username" id='username' type="text" placeholder="User Name" />
          <Form.Text className="text-muted">

          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" id='email' type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">

          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" id='password' type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="button" onClick={() => { registerUser() }}>
          Submit
        </Button>
      </Form>
    </>
  )
}
