import React, { useState } from 'react';
import '../stylesheets/gallery.css';
import { Container, Dropdown, Nav, Navbar } from 'react-bootstrap';
import Image from './Image';
import { Link, useLocation } from 'react-router-dom';
import { FileImageOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import axios from 'axios';
import Videos from './Videos';
import { useEffect } from 'react';

function Gallery(props) {
	// console.log(props);	
	const [videos, setVideos] = useState([]);
	const modal_stat = props.showModal;
	const location = useLocation();
	const [activeLink, setActiveLink] = useState('photos');
	const api = `qbaOPsis9Ey0RV3KlqsQwtySOquS7vUx8g4izzitQrt5jM2MBVPrK3OQ`;
	const query = props.search;
	const [headingText, setHeadingText] = useState('Free Stock Photos');
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(9);
	const [loading, setLoading] = useState(false);

	const handleOptionSelect = (eventKey) => {
		props.onSelectOption(eventKey);
	};
	
	function handleVideosClick() {
		console.log('video');
		setActiveLink('videos');
		setHeadingText('Free Stock Videos');
		fetchVideos(query);
	}
	
	function handlePhotosClick() {
		console.log('photos');
		setActiveLink('photos');
		setHeadingText('Free Stock Photos');
		fetchImages(query);
	}
	
	const fetchImages = async (query) => {
		const baseURL = `https://api.pexels.com/v1/search?query=${query}&per_page=${page}`;
		const response = await axios.get(baseURL, {
			method: 'GET',
			headers: {
			Accept: 'application/json',
			Authorization: api,
			},
		});
		props.setImages(response.data.photos);
	};
	
	const fetchVideos = async (query) => {
		console.log(query);
		const baseURL = `https://api.pexels.com/videos/search?query=${query}&per_page=${page}`;
		const response = await axios.get(baseURL, {
			method: 'GET',
			headers: {
			Accept: 'application/json',
			Authorization: api,
			},
		});
		setVideos(response.data.videos);
	};

	const handleScroll = () => {
		if (loading) return;
		if (
		  window.innerHeight + document.documentElement.scrollTop >=
		  document.documentElement.offsetHeight
		) {
		  // Load the next page of images
		  setPage(page + 3);
		  fetchImages(search);
		}
	  };

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	  }, [handleScroll]);

	return (
		<Container className='gallery'>
			{location.pathname !== '/profile' && location.pathname !== '/photographer' && (
				<div className="gallery_header">
					<div className="gallery_left">
						{modal_stat ? (
						<h5>More Like This</h5>
						) : (
						<h5>{headingText}</h5>
						)}
					</div>
					{!modal_stat && (
						<div className="gallery_right">
							<Navbar className="mylight">
								<Container>								
									<Nav className="me-auto">
									<Nav.Link
										className='profile_nav'
										onClick={handlePhotosClick}
										active={activeLink === 'photos'}
									>
									<FileImageOutlined className="nav-link-icon" /> Photos
									</Nav.Link>

									<Nav.Link
										className='profile_nav'
										onClick={handleVideosClick}
										active={activeLink === 'videos'}
									>
									<VideoCameraOutlined className="nav-link-icon" /> Videos
									</Nav.Link>
									</Nav>
								</Container>
							</Navbar>
							<Dropdown className='gallery_dd' onSelect={handleOptionSelect}>
								<Dropdown.Toggle variant="success" id="dropdown-basic"> Trending </Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item eventKey="sunset">Sunset</Dropdown.Item>
									<Dropdown.Item eventKey="dark">Dark</Dropdown.Item>
									<Dropdown.Item eventKey="nature">Nature</Dropdown.Item>
									<Dropdown.Item eventKey="car">Car</Dropdown.Item>
									<Dropdown.Item eventKey="beach">Beach</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item>
									<Link to={`/popular`}>More</Link>
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</div>
					)}
				</div>
			)}
					
			{activeLink === 'photos' ? (
				<div className='gallery_image'>
					<section className='image_container'>
						{props.images.map((image) => <Image key={image.id} {...image} profileActiveLink={props.profileActiveLink}/>)}
					</section>
				</div>
			) : (
				<div className='gallery_video'>
					{videos.map((video) => <Videos key={video.id} {...video} />)}
				</div>
			)}			
			
		</Container>
	)
}

export default Gallery;
