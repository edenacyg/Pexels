import React, { useState } from 'react';
import Slider from './imageeditor/Slider';
import SidebarItem from './imageeditor/SidebarItem';
import '../stylesheets/imageeditor.css';
import { Button } from 'react-bootstrap';
import { DownloadOutlined, CheckOutlined } from '@ant-design/icons';

const DEFAULT_OPTIONS = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg'
  }
  // {
  //   name: 'Blur',
  //   property: 'blur',
  //   value: 0,
  //   range: {
  //     min: 0,
  //     max: 20
  //   },
  //   unit: 'px'
  // }
];

function ImageEditor(props) {
	console.log(props);
	const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
	const [options, setOptions] = useState(DEFAULT_OPTIONS);
	const selectedOption = options[selectedOptionIndex];
	const height = props.height;
	const width = props.width;
	let src = [];
	const users = JSON.parse(localStorage.getItem('users')) || [];

	function handleSliderChange({ target }) {
	setOptions(prevOptions => {
		return prevOptions.map((option, index) => {
		if (index !== selectedOptionIndex) return option;
		return { ...option, value: target.value };
		});
	});
	}

	function getImageStyle() {
	const filters = options.map(option => {
		return `${option.property}(${option.value}${option.unit})`;
	});

	return {
		filter: filters.join(' '),
		backgroundImage: `url(${props.url})`,
		backgroundSize: 'contain',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center'
	};
	}

	function handleDownload() {
		const canvas = document.createElement('canvas');
		canvas.width = width; // Set the canvas size to match the image size
		canvas.height = height;
		const ctx = canvas.getContext('2d');
		const img = new Image();
		img.crossOrigin = 'anonymous'; // Allow cross-origin access to the image
		img.src = props.url;
		img.onload = () => {
			// Draw the image onto the canvas with the applied filters
			ctx.filter = getImageStyle().filter;
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			// Convert the canvas image to a data URL and download it
			const dataUrl = canvas.toDataURL('image/png');
			const link = document.createElement('a');
			link.href = dataUrl;
			link.download = 'edited-image.png';
			link.click();
		};
	}

	function handleDone() {
		props.onClose();
	}

	return (
	<div className="containers">
		<div className="sidebar">
		{options.map((option, index) => {
			return (
			<SidebarItem
				key={index}
				name={option.name}
				active={index === selectedOptionIndex}
				handleClick={() => setSelectedOptionIndex(index)}
			/>
			);
		})}
		<div className='image_editor_btn'>
			<Button className='edit_btn' onClick={handleDownload} variant="success"><DownloadOutlined /></Button>
			<Button className='download_btn' onClick={handleDone} variant="success"><CheckOutlined /></Button>
			{/* <button onClick={handleDownload}>Download</button>
			<button onClick={handleDone}>Done</button> */}
		</div>       
		</div>
		<div className="main-image" style={getImageStyle()} />
		
		<div className='slider_btn'>
			<Slider
			min={selectedOption.range.min}
			max={selectedOption.range.max}
			value={selectedOption.value}
			handleChange={handleSliderChange}
			/>
			<div className='image_editor_btn_silder'>
				<Button className='edit_btn' onClick={handleDownload} variant="success"><DownloadOutlined /></Button>
				<Button className='download_btn' onClick={handleDone} variant="success"><CheckOutlined /></Button>
				{/* <button onClick={handleDownload}>Download</button>
				<button onClick={handleDone}>Done</button> */}
			</div>
		</div>
		
	</div>
	);
}

export default ImageEditor;
