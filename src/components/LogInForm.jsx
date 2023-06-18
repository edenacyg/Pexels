import "../stylesheets/loginform.css";
import React, { useEffect, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";

function LogInForm() {
	const email = useRef();
	const password = useRef();
	const [showHome, setShowHome] = useState(false);
	const [notification, setNotification] = useState("");
	const users = JSON.parse(localStorage.getItem("users"));
	const localSignUp = localStorage.getItem("signUp");

	useEffect(() => {
		if (localSignUp) {
			setShowHome(true);
		}
	}, [localSignUp]);

	const handleSignIn = () => {
	const user = users.find((u) => u.email === email.current.value && u.password === password.current.value);
	if (user) {
		localStorage.setItem("signUp", user.email);
		window.location.reload();
	} else {
		setNotification("Please enter valid credentials");
	}
	};

	if (showHome) {
		return <Navigate to="/" />;
	}

	return (
		<div>
			<div className="container">
			<h1 className="text-center my-5">Welcome Back To Pexels</h1>
			<Form className="login_form">
				<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Control type="email" placeholder="Enter email" ref={email} />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Control type="password" placeholder="Password" ref={password} />
				</Form.Group>

				<Button variant="primary" type="button" onClick={handleSignIn}>
				Sign In
				</Button>
			</Form>
			{notification && (
				<p className="notification">{notification}</p>
				)}
			</div>
		</div>
	);
}

export default LogInForm;
