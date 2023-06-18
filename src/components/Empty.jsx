import '../stylesheets/empty.css';
import React from 'react';

function Empty(props) {
	return (
		<div className='empty'>
			<h3>No {props.profileActiveLink} found</h3>
		</div>
	)
}

export default Empty;
