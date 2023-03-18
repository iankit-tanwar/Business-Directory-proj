import React from 'react'
import { Form ,Button} from 'react-bootstrap'

export default function BusinessRegister() {
    return (
        <>
        <h1 className='text-center'>Business_Register</h1>
            <Form>
                
            <Form.Group className="mb-3" >
                    <Form.Select aria-label="Default select example">
                        <option>City</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3" >
                    <Form.Select aria-label="Default select example">
                        <option>Business_Category</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">

                    </Form.Text>
                </Form.Group>


                <Button variant="primary" type="button" onClick={() => { }}>
                    BusinessRegister
                </Button>
            </Form>
        </>
    )
}
