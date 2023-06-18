import React, { useEffect, useRef, useState } from "react";
import '../stylesheets/regform.css';
import { Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function RegForm() {
	const name=useRef();
	const email=useRef();
	const password=useRef();
	const [showHome,setShowHome]=useState(false);
	const localSignUp=localStorage.getItem("signUp"); 

	useEffect(()=>{
	if(localSignUp){
		setShowHome(true)
	}
	})

	const handleClick = () => {
		const enteredName = name.current.value;
		const enteredEmail = email.current.value;
		const enteredPassword = password.current.value;
	  
		if (enteredName && enteredEmail && enteredPassword) {
			const existingEmail = localStorage.getItem('email');
			const existingSignUp = localStorage.getItem('signUp');
		
			if (existingEmail === enteredEmail || existingSignUp === enteredEmail) {
				alert('Email already registered!');
				return;
			}
		
			const uuid = uuidv4();
			const user = {
				id: uuid,
				name: enteredName,
				email: enteredEmail,
				password: enteredPassword,
				favorites: [],
				downloads: [],
				following: []
			};
			const users = JSON.parse(localStorage.getItem('users') || '[]');
			users.push(user);
			localStorage.setItem('users', JSON.stringify(users));
			alert('Account created successfully!!');
			setShowHome(true);
		}
		};

	if (showHome) {
	return <Navigate to="/" />;
	}

	return(
		<div>
				<div className="container">
						<div className="input_space">
							<input placeholder="Name" type='text' ref={name} />
						</div>
						<div className="input_space">
							<input placeholder="Email" type='text' ref={email} />
						</div>
						<div className="input_space">
							<input placeholder="Password" type='password' ref={password} />
						</div>
						<button onClick={handleClick}>Sign Up</button>
				</div>
		</div>
	);
}
export default RegForm;
