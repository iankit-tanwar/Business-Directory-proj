import React from 'react'
import { Form, Button } from 'react-bootstrap'


export default function Login() {



    let loginUser = () => {

        let payload = {

            "identifier": document.querySelector('input[type=email]').value,
            "password": document.querySelector("input[type=password]").value

        }
        console.log(payload);

        fetch(`http://localhost:1337/api/auth/local`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(res => res.json())
            .then((data) => {
                console.log("datta---->", data)

                if (data["jwt"] !== undefined) {
                    //login success
                    alert("login success")
                    window.localStorage.setItem('token-->',data["jwt"])
                    window.localStorage.setItem('user_id-->',data["user"]["id"])
                    

                    window.location.href ='./business_Register'



                } else {
                    //not login
                    alert('not login')
                }


            })
            .catch(err => err)

    }



    return (
        <>
            <Form>
                <h1>LOGIN </h1>
                <Form.Group className="mb-3" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">

                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="button" onClick={() => { loginUser() }}>
                    Submit
                </Button>
            </Form>
        </>
    )
}
