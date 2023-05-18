import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("loggedIn"));
    console.log(user)
    if (user && user.email && user.email.length > 0) {
      navigate("../homepage", {replace: true})
    }
  },[navigate])

  const post = async (e) => {
    e.preventDefault();
    try {
      const req = await fetch('http://localhost:5050/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const user = await req.json();
      if (req.status === 200) {
        localStorage.setItem("loggedIn", JSON.stringify(user))
        navigate("/homepage")
        //console.log('Utente loggato: ', user);
      } else {
        const error = await req.json();
        console.log('Errore: ', error.message);
      }
      return user;  
    } catch (error) {
      console.log('Errore: ', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className='d-flex justify-content-center mt-5'>
        <img src='https://www.freeiconspng.com/thumbs/login-icon/user-login-icon-29.png' alt='immagine-login'/>
      </div>
      <Form className="m-5" onSubmit={post}>
        <Form.Control
          onChange={handleInputChange}
          name="email"
          type="email"
          placeholder="Inserisci mail..."
          className="my-2"
        />
        <Form.Control
          onChange={handleInputChange}
          name="password"
          type="password"
          placeholder="Inserisci password..."
          className="my-2"
        />
        <Button type="submit">Login</Button>
      </Form>
    </>
  );
};

export default Login;
