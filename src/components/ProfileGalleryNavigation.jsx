import '../stylesheets/profilegallerynav.css';
import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { HeartOutlined, DownloadOutlined, UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import Gallery from './Gallery';
import axios from 'axios';
import Empty from './Empty';
const api = `qbaOPsis9Ey0RV3KlqsQwtySOquS7vUx8g4izzitQrt5jM2MBVPrK3OQ`;

function GalleryNavigation(props) {
	// console.log(props);
	const currentUser = localStorage.getItem('signUp');
	let downloadedImages = '';
	let favorites = '';

	if (currentUser){
		const users = JSON.parse(localStorage.getItem('users'));
		const user = users.find(user => user.email === currentUser);
		// console.log(user.downloads)
		downloadedImages = user.downloads;
		favorites = user.favorites;
	}
		
	const [images, setImages] = useState([]);
	const [countFavorites, setFavorites] = useState([]);
	const [countDownloads, setDownloads] = useState([]);
	const [profileActiveLink, setProfileActiveLink] = useState("favorites");
	const isProfilePage = window.location.pathname === '/profile';
	const params = new URLSearchParams(window.location.search);
	const photographer = params.get("name");	
  
  // Update countFavorites and countDownloads when local storage changes
  	useEffect(() => {
		if (favorites) {
			setImages(favorites);
		//   setFavorites(JSON.parse(favoritesFromStorage));
		}
	
		const downloadsFromStorage = localStorage.getItem("downloads");
		if (downloadsFromStorage) {
			setDownloads(JSON.parse(downloadsFromStorage));
		}

		if (photographer) {
			fetchImages(photographer);
		}
  	}, []);

	// Click handler for the "Favorites" link
	const handleFavoritesClick = () => {
		if (isProfilePage) {	
			if (favorites) {
				setImages(favorites);
				setProfileActiveLink("favorites");
			}
		} else {
			fetchImages(photographer);
			setProfileActiveLink("collections");
		}
	};

	// Click handler for the "Downloads" link
	const handleDownloadsClick = () => {
		if (downloadedImages) {
			setImages(downloadedImages);
			setProfileActiveLink("downloads");
		}
	};

	const handleFollowingClick = () => {
		setProfileActiveLink("following");
	};

	const handleFollowersClick = () => {
		setProfileActiveLink("followers");
	};

	const fetchImages = async (query) => {
		const baseURL = `https://api.pexels.com/v1/search?query=${query}&per_page=50`;
		const response = await axios.get(baseURL, {
			method: 'GET',
			headers: {
			Accept: 'application/json',
			Authorization: api,
			},
		});
		setImages(response.data.photos);
	};

	console.log(favorites);
	return (
		<>
			<Container>
				<div className='profile_gallery_nav'>
				<Navbar className="mylight">
					<Container>
					<Nav className="me-auto">
						<Nav.Link className='profile_nav' onClick={handleFavoritesClick} active={profileActiveLink === "favorites"}>
						<HeartOutlined className="nav-link-icon" /> {isProfilePage ? `Favorites ${favorites.length}` : "Collections"} 
						</Nav.Link>
						{isProfilePage ? (
						<Nav.Link className='profile_nav' onClick={handleDownloadsClick} active={profileActiveLink === "downloads"}>
							<DownloadOutlined className="nav-link-icon" /> Downloads {downloadedImages.length}
						</Nav.Link>
						) : (
						<Nav.Link className='profile_nav' onClick={handleFollowersClick} active={profileActiveLink === "downloads"}>
							<UserSwitchOutlined className="nav-link-icon" /> Followers 0 
						</Nav.Link>
						)}
						<Nav.Link className='profile_nav' onClick={handleFollowingClick} active={profileActiveLink === "following"}>
						<UserOutlined className="nav-link-icon" /> Following 0
						</Nav.Link>
					</Nav>
					</Container>
				</Navbar>
				<div className='profile_gallery_btn'>
					<Button variant="primary" type="button">Photos</Button>
					<Button variant="primary" type="button">Videos</Button>
				</div>
				</div>

				{isProfilePage ? (
					<>
						{profileActiveLink === "favorites" && (favorites.length > 0 ? (
							<Gallery images={favorites} profileActiveLink={profileActiveLink}/>
						) : (
							<Empty profileActiveLink={profileActiveLink} message={"No favorites found."} />
						))}
					
						{profileActiveLink === "downloads" && downloadedImages.length > 0 ? (
							<Gallery images={downloadedImages} profileActiveLink={profileActiveLink}/>
						) : (
							profileActiveLink === "downloads" && <Empty profileActiveLink={profileActiveLink} message={"No downloaded images found."} />
						)}
					</>
				) : (
					<div className='profile_gallery'>
						<Gallery images={images}/>
					</div>
				)}		
			</Container>
		</>
	);	
}

export default GalleryNavigation;
