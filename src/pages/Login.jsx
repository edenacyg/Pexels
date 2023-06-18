import React from 'react';
import LogInForm from '../components/LogInForm';
import '../stylesheets/login.css';

function Login() {
  return (
    <>
    <div className='overlay'></div>
      <div className='login_container'>
        <div className='login_form_wrapper'>
            <LogInForm />
        </div>           
     </div>
    </>
  )
}

export default Login;
