import React, { useState } from 'react';
import '../stylesheets/image.css';
import ImageModal from './ImageModal';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { DownloadOutlined, HeartFilled, HeartOutlined, UserOutlined, DeleteOutlined } from '@ant-design/icons';

function Image(props) {
	// console.log(props);
	const api = `qbaOPsis9Ey0RV3KlqsQwtySOquS7vUx8g4izzitQrt5jM2MBVPrK3OQ`;
	const [images, setImages] = useState([]);
	const [hovering, setHovering] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [isFavorited, setIsFavorited] = useState(false);
	const url = props.src.large;
	const height = props.height;
	const width = props.width;
	const srcs = props.src;
	const id = props.id;
	const photographer = props.photographer;
	const profileActiveLink = props.profileActiveLink;
	const currentUser = localStorage.getItem('signUp');
	let src = [];
	const users = JSON.parse(localStorage.getItem('users')) || [];
	const navigate = useNavigate();	
	const location = useLocation();

	const handleMouseEnter = () => {
		setHovering(true);
	};

	const handleMouseLeave = () => {
		setHovering(false);
	};

	const fetchImages = async () => {
	const baseURL = `https://api.pexels.com/v1/search?query=${props.alt}&per_page=51`;
	const response = await axios.get(baseURL, {
		method: 'GET',
		headers: {
		Accept: 'application/json',
		Authorization: api,
		},
	});
	setImages(response.data.photos);
	};

	const handleDownload = () => {
		const imageWrapper = document.querySelector('.image_wrapper');
		const backgroundImageUrl = url;
		const imageWrapperId = imageWrapper.getAttribute('id'); 
		src.push({large: backgroundImageUrl});			
		const signUp = localStorage.getItem('signUp');

		fetch(url)
			.then((response) => response.blob())
			.then((blob) => {
			const url = window.URL.createObjectURL(new Blob([blob]));
			const link = document.createElement('a');
			link.href = url;
			link.download = 'image.jpg';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			});
			
		if (signUp) {
			const user = users.find((u) => u.email === signUp);
		  	const downloads = user.downloads;
			downloads.push({
				src: {large: backgroundImageUrl},
				imageWrapperId,
				photographer 
			});
		localStorage.setItem('users', JSON.stringify(users));
		}
	};
	
	const handleHeart = () => {
		const imageWrapper = document.querySelector(`#image_wrapper_${id}`);
		const backgroundImageUrl = url;
		const imageWrapperId = imageWrapper.getAttribute('id').replace('image_wrapper_', '');
		src.push({ large: backgroundImageUrl });  
		const signUp = localStorage.getItem('signUp');

		if (signUp) {
			const user = users.find((u) => u.email === signUp);
			const favorites = user.favorites;
			const existingFave = favorites.find((f) => f.src.large === backgroundImageUrl && f.imageWrapperId === imageWrapperId);
			if (existingFave) {
				const index = favorites.indexOf(existingFave);
				favorites.splice(index, 1);
				setIsFavorited(false);
			} else {
			favorites.push({
				src: {large: backgroundImageUrl},
				imageWrapperId,
				photographer
			});
			setIsFavorited(true);
			}
			localStorage.setItem('users', JSON.stringify(users));
		} else {
			console.log('SignUP!');
			navigate('/onboarding');
		}
	};

	const handleImageClick = (event) => {
		if (!event.target.closest('.download_icon_wrapper') && !event.target.closest('.heart_icon_wrapper')) {
			setShowModal(true);
			fetchImages();
		}
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleDelete = () => {
		const index = users.findIndex(user => user.email === currentUser);
		
		if (index !== -1) {
		  const user = users[index];
		  let arrayToDeleteFrom = null;
	  
		  switch(profileActiveLink) {
			case 'favorites':
			  arrayToDeleteFrom = user.favorites;
			  break;
			case 'downloads':
			  arrayToDeleteFrom = user.downloads;
			  break;
			default:
			  break;
		  }
	  
		  if (arrayToDeleteFrom) {
			const itemIndex = arrayToDeleteFrom.findIndex((image) => image.id === id);
			
			if (itemIndex !== -1) {
			  arrayToDeleteFrom.splice(itemIndex, 1);
			  localStorage.setItem("users", JSON.stringify(users));
			}
		  }
		}
	  };	  

	return (
		<>
			<div
				className="image_wrapper"
				id={`image_wrapper_${id}`}
				style={{
					backgroundImage: `url(${url})`,
				}}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={location.pathname === '/profile' ? null : handleImageClick}
			>
				<div className="overlay">
					{hovering && (
						<div className='image_hover_elements'>
							<div className="icons">
								<div className="download_icon_wrapper">
									<div className="download_icon" onClick={handleDownload}>
										<DownloadOutlined />
									</div>
								</div>
								{location.pathname === '/profile' && (
									<div className="delete_icon_wrapper">
										<div className="delete_icon" onClick={handleDelete}>
											<DeleteOutlined />
										</div>
									</div>
								)}
							</div>
							<div className="icons">
								{!location.pathname.includes("/profile") && (
									<div className="heart_icon_wrapper">
										<div className="heart_icon" onClick={handleHeart}>
											{isFavorited ? <HeartFilled /> : <HeartOutlined />}
										</div>
									</div>
								)}
							</div>
							{location.pathname.includes('/photographer') ? null : (
								<Link to={`/photographer?name=${photographer}`}>
									<div className="the_phographer">
										<UserOutlined /> &nbsp; {props.photographer}
									</div>
								</Link>
							)}
						</div>  
					)}
				</div>
			</div>
				
			{showModal && <ImageModal url={url} onClose={handleCloseModal} height={height} width={width} images={images} src={srcs} id={id} photographer={photographer}/>}
		</>
	  );
	}
	
	export default Image;