import '../stylesheets/loginform.css';
import React, { useEffect, useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';


function LogInForm() {
  const email = useRef();
  const password = useRef();
  const users = JSON.parse(localStorage.getItem('users'));
  const localEmail = users[0].email;
  const localPassword = users[0].password;;
  const [showHome,setShowHome]=useState(false)
  const localSignUp=localStorage.getItem("signUp")
  console.log(users[0].email);

  useEffect(()=>{
    if(localSignUp){
        setShowHome(true)
    }
   })

  const handleSignIn = () => {
    if (email.current.value == localEmail && password.current.value == localPassword) {
      localStorage.setItem('signUp', email.current.value);
      window.location.reload();
    } else {
      alert('Please enter valid credentials');
    }
  };

  if (showHome) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="container">
        <h1 className="text-center my-5">Welcome Back To Pexels</h1>
        <Form className='login_form'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={email} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={password} />
          </Form.Group>

          <Button variant="primary" type="button" onClick={handleSignIn}>
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default LogInForm;
