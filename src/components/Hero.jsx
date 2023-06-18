import React, { useState, useEffect } from 'react';
import '../stylesheets/hero.css';
import axios from 'axios';
import SearchBar from './SearchBar';
import Gallery from './Gallery';
import { BeatLoader } from 'react-spinners';

function Hero() {
	const [images, setImages] = useState([]);
	const [selectedOption, setSelectedOption] = useState(null); 
	// const [activeLink, setActiveLink] = useState('photos');
	const api = `qbaOPsis9Ey0RV3KlqsQwtySOquS7vUx8g4izzitQrt5jM2MBVPrK3OQ`;
	const searchOptions = ['green', 'snow', 'beach', 'mountain', 'fashion', 'food', 'flowers'];
	const initialSearch = searchOptions[Math.floor(Math.random() * searchOptions.length)];
	const [search, setSearch] = useState('');
	// console.log(activeLink);
	const [page, setPage] = useState(9);
	const [loading, setLoading] = useState(false);
	
	const fetchImages = async (search) => {
		setLoading(true);
		setSearch(search);
		const baseURL = `https://api.pexels.com/v1/search?query=${search}&per_page=${page}`;
		const response = await axios.get(baseURL, {
			method: 'GET',
			headers: {
			Accept: 'application/json',
			Authorization: api,
			},
		});
		setImages(response.data.photos);
		setLoading(false);
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
	  
	const handleOptionSelect = (option) => { 
		setSelectedOption(option);
	};

	useEffect(() => {
		fetchImages(selectedOption || initialSearch); // use selectedOption if available, otherwise use initialSearch
	}, [selectedOption]); // run the effect whenever selectedOption changes

	return (
	<>
		<div className='hero_section'>
		<div className='overlay'>
			<SearchBar fetchImages={fetchImages} />
		</div>
		</div>
		<Gallery images={images} onSelectOption={handleOptionSelect} search={search} setImages={setImages}/>
		{loading && (
		<div className="loader">
			 <BeatLoader size={15} color={'#36D7B7'} loading={loading} />
		</div>
		)}
	</>
	);
}

export default Hero;
