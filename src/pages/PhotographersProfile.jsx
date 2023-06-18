import React from 'react';
import HeaderWhite from '../components/HeaderWhite';
import ProfileImage from '../components/ProfileImage';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

function PhotographersProfile() {
	const location = useLocation();
	const photographer = new URLSearchParams(location.search).get("name");

	return (
		<div className='photographer_page'>
			<HeaderWhite />
			<ProfileImage photographer={photographer}/>
			<Footer />
		</div>
	)
}

export default PhotographersProfile;
