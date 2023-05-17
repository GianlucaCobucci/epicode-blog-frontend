import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const Login = () => {

  const [formData, setFormData] = useState({})
  console.log(formData)
  const post = async (e) => {
    e.preventDefault();
    try {
      const req = await fetch('http://localhost:5050/login',{
        method: 'POST',
        body: JSON.stringify(formData)
      })
      return await req.json()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>  
        <Form className='m-5' onSubmit={post}>

            <Form.Control
              onChange={(e)=>setFormData({
                ...formData,
                email:e.target.value
              })}
              type="email"
              placeholder="Inserisci mail..."
              className="my-2"
              aria-label="email"
            />
            <Form.Control
              onChange={(e)=>setFormData({
                ...formData,
                password:e.target.value
              })}
              type="password"
              placeholder="Inserisci password..."
              className="my-2"
              aria-label="password"
            />
            <Button type="Submit">
            Login
            </Button>
        </Form>
    
    </>
  )
}

export default Login