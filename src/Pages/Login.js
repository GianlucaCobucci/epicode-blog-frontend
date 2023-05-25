import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginLoading, loginResponse, loginRequest } from '../Reducers/loginSlice';
import { Toaster } from 'react-hot-toast';
import { Toast } from '../utilities/notifications';

const Login = () => {

  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const successToast = new Toast("Login effettuato con successo!");
  const errorToast = new Toast("Login fallito");

  const dispatch = useDispatch()
  // eslint-disable-next-line no-unused-vars
  const isLoading = useSelector(loginLoading)
  const response = useSelector(loginResponse)

  const post = async (e) => {
    e.preventDefault();
    dispatch(loginRequest(formData))
      .then(() => {
        if (response === 'Login effettuato con successo') {
          successToast.success()
          setTimeout(() => {
            navigate("/homepage", { replace: true })
          }, 1500)
        } else {
          errorToast.error();
        }
        
      })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className='d-flex justify-content-center mt-5'>
        <img
          src='https://www.freeiconspng.com/thumbs/login-icon/user-login-icon-29.png'
          alt='immagine-login'
          style={{ width: '100px', height: '100px' }}
        />
      </div>
      <Form className="ml-5" onSubmit={post} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Indirizzo email</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            name="email"
            type="email"
            placeholder="Inserisci mail..."
            className="my-2"
            style={{ borderRadius: '20px' }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handleInputChange}
            name="password"
            type="password"
            placeholder="Inserisci password..."
            className="my-2"
            style={{ borderRadius: '20px' }}
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ borderRadius: '20px', width: '100%' }}>
          Login
        </Button>
      </Form>
    </>
  );

};

export default Login;

