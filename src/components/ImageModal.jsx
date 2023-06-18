import React, { useState } from 'react';
import '../stylesheets/modal.css';
import ImageEditor from './ImageEditor';
import Gallery from './Gallery';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

function ImageModal(props) {
	// console.log(props.id);
	const [editing, setEditing] = useState(false);
	const [showContent, setShowContent] = useState(true);
	const [showModal, setShowModal] = useState(true);
	const [showGallery, setShowGallery] = useState(false); 
	const [selectedOption, setSelectedOption] = useState('Option 1');
	const height = props.height;
	const width = props.width;
	const photographer = props.photographer.charAt(0).toUpperCase() + props.photographer.slice(1);
	const id = props.id;
	let src = [];
	const users = JSON.parse(localStorage.getItem('users')) || [];

	function handleOptionChange(event) {
		setSelectedOption(event.target.value);
	}

	const handleEdit = (e) => {
		e.stopPropagation();
		setEditing(true);
		setShowContent(false);
	};

	const handleCloseEditor = () => {
		setEditing(false);
		setShowContent(true);
	};

	const handleDownload = (e) => {
		const url = e.target.name;
		const imageWrapper = document.querySelector('.modal_image');
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

	return (
		<div className={`modal ${showModal ? 'active' : ''}`}>
			<button className="close_button" onClick={props.onClose}> X </button>
			<div className="modal_wrapper">
				<div className="modal_header">
					<div className="photographer">
						<img src="/images/favicon.png"></img>
						<h5>{photographer}</h5>
					</div>
					<div className="modal_tools">
						<Button className='edit_btn' onClick={handleEdit} disabled={editing} variant="success">Edit</Button>
						<Dropdown as={ButtonGroup} value={selectedOption} onChange={handleOptionChange} disabled={editing}>
							<Button variant="success" name={props.src.large} onClick={handleDownload} disabled={editing}>Free Download</Button>
							<Dropdown.Toggle split variant="success" id="dropdown-split-basic" disabled={editing}/>
							<Dropdown.Menu >
								<Dropdown.Item name={props.src.original} href="#/action-1" onClick={handleDownload} >Original 4160x6240</Dropdown.Item>
								<Dropdown.Item name={props.src.large} href="#/action-2" onClick={handleDownload}>Large 1920x2880</Dropdown.Item>
								<Dropdown.Item name={props.src.medium} href="#/action-3" onClick={handleDownload}>Medium 1280x1920</Dropdown.Item>
								<Dropdown.Item name={props.src.small} href="#/action-3" onClick={handleDownload}>Small 640x960</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>     
				</div>
			
			{showContent && (
				<div className="modal_content" onClick={(e) => e.stopPropagation()}>
				<div className="modal_image" id={`${id}`}> 
					<img src={props.url} alt="modal" />
				</div>
				</div>
			)}
			{editing && (
				<ImageEditor url={props.url} onClose={handleCloseEditor} height={height} width={width}/>
			)}
			{showModal && ( // <-- pass showModal state variable as a prop to Gallery
				<Gallery images={props.images} showModal={showModal} />
			)}
			</div>
			
		</div>
	);
}

export default ImageModal;
