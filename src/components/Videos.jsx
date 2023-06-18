import React, { useState } from 'react';
import '../stylesheets/videos.css';
import { DownloadOutlined, UserOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

function Videos(props) {
	console.log(props);
    const videoSrc = `${props.video_files[0].link}.mp4`;
    const navigate = useNavigate();
	const url = props.image;
	let src = [];
	const id = props.id;
	const photographer = props.user.name;
	const users = JSON.parse(localStorage.getItem('users')) || [];
	const [isFavorited, setIsFavorited] = useState(false);

    const handleHeartClick = () => {
		const imageWrapper = document.querySelector('.video_wrapper');
		const backgroundImageUrl = url;
		const imageWrapperId = imageWrapper.getAttribute('id'); 
		src.push({large: backgroundImageUrl});
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
			navigate('/onboarding');
		}
    };

    const handleDownloadClick = async (e) => {
        const imageWrapper = document.querySelector('.video_wrapper');
		const backgroundImageUrl = url;
		const imageWrapperId = imageWrapper.getAttribute('id'); 
		src.push({large: backgroundImageUrl});	
		const signUp = localStorage.getItem('signUp');

        fetch(document.querySelector('.video').src)
			.then((response) => response.blob())
			.then((blob) => {
			const url = window.URL.createObjectURL(new Blob([blob]));
			const link = document.createElement('a');
			link.href = url;
			link.download = 'myvideo.mp4';
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
        <>
            <div className='video_wrapper' id={`${id}`}>
                <iframe className='video' src={videoSrc} title="My Video" allowFullScreen />
                <div className="overlay">
				<Link to={`/photographer?name=${photographer}`}>
					<div className="video_phographer">
						<UserOutlined /> &nbsp; {photographer}
					</div>
				</Link>
					<div className='icons'>
						<div className="heart_icon_wrapper">
							<div className="heart_icon" onClick={handleHeartClick}>
								{isFavorited ? <HeartFilled /> : <HeartOutlined />}
							</div>
						</div>
					</div>
					<div className='icons'>
						<div className="download_icon_wrapper">
							<div className="download_icon" onClick={handleDownloadClick}>
								<DownloadOutlined />
							</div>
						</div>
							{/* <DownloadOutlined className='doeicon' onClick={handleDownloadClick} /> */}
					</div>															
                </div>
            </div>
        </>
    );
}

export default Videos;
