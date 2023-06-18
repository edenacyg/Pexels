import '../stylesheets/profileimage.css';
import React from 'react';
import { Button, Image } from 'react-bootstrap';
import ProfileGalleryNavigation from './ProfileGalleryNavigation';
import { useLocation } from 'react-router-dom';

function ProfileImage(props) {
  console.log(props);
  const location = useLocation();
  const currentUser = localStorage.getItem('signUp');
  const users = JSON.parse(localStorage.getItem('users'));
  let userName = '';
  let profileImg = '';

  if (currentUser){
    const user = users.find(user => user.email === currentUser);
    userName = user.name;
    profileImg = user.profileImg;
  } 
  
  const user = location.pathname === '/profile' ? userName : props.photographer;
  const imageSrc = location.pathname === '/profile' ? `./images/${profileImg}` : './images/purple.png';

  return (
    <div className='profile_main'>
      <div className='profile_image_wrapper'>
        <Image src={imageSrc} alt='placeholder' />
      </div>
      <div className='profile_info_wrapper'>
        <h1>{user}</h1>
      </div>
      <ProfileGalleryNavigation />
    </div>
  );
}

export default ProfileImage;
