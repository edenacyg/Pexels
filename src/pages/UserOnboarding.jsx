import React from 'react'
import HeaderWhite from '../components/HeaderWhite';
import RegForm from '../components/RegForm';
import '../stylesheets/onboardingpage.css';
import Footer from '../components/Footer';

function UserOnboarding() {
  return (
    <>        
        <HeaderWhite isOnboardingPage={true} />
        <div className='onboarding_content'>
            <div className='form_container' id='join_form'>
                <h1>Join 12 million others.</h1>
                <div className='form_container'>
                    
                    <RegForm />
                </div> 
            </div>
        </div>   
        <Footer />
    </>  
  )
}

export default UserOnboarding
