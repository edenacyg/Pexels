import React from 'react';
import HeaderWhite from '../components/HeaderWhite';
import ProfileImage from '../components/ProfileImage';
import Footer from '../components/Footer';

function Profile() {
  return (
    <div className='profile_page'>
      <HeaderWhite />
      <ProfileImage />  
      <Footer />   
    </div>
  )
}

export default Profile;
