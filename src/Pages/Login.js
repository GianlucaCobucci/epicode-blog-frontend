import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

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

      if (req.status === 200) {
        const user = await req.json();
        console.log('Utente loggato: ', user);
      } else {
        const error = await req.json();
        console.log('Errore: ', error.message);
      }
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
