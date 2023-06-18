import React from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import "../stylesheets/headerwhite.css";
import { Link } from "react-router-dom";

function HeaderWhite(props) {
	const users = JSON.parse(localStorage.getItem('users'));
	const signUp = localStorage.getItem("signUp");
	const isOnboardingPage = props.isOnboardingPage;
	let profileImg = '';

	if (signUp){
		const user = users.find(user => user.email === signUp);
		profileImg = user.profileImg;
	} 

	const handleLogout = () => {
	localStorage.removeItem("signUp");
	window.location.href = "/";
	};

	const handleDeleteAcc = () => {
		const users = JSON.parse(localStorage.getItem('users'));
		const index = users.findIndex(user => user.email === signUp);
		if (index !== -1) {
			users.splice(index, 1);
			localStorage.setItem('users', JSON.stringify(users));
		}
		localStorage.removeItem('signUp');
		window.location.href = "/";
	};

	const showJoinButton = !signUp;

	return (
		<Navbar className="headerw_section" expand="md">
			<Container>
			<Navbar.Brand href="/">
				<div className="logow_section">
				<img
					className="logow_black"
					src="./images/logoblack.png"
					alt="Logo of pexels"
				></img>
				</div>
			</Navbar.Brand>
			{/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav"> */}
				<Nav className="ms-auto">
				{/* <Link className="navw" to="#">Explore</Link>
				<Link className="navw" to="#">Upload</Link> */}
				<Link className="navw" to="/popular">Popular</Link>
				{signUp ? (
					<Dropdown>
					<Dropdown.Toggle variant="primary" id="dropdown-basic" className="headerw_account_dropdown">
					<Link to="/profile"><img
						src={`./images/${profileImg}`}
						alt="Account"
						className="account-icon"
					/></Link>
					</Dropdown.Toggle>
					<Dropdown.Menu>
						<Dropdown.Item href="/profile">Your Profile</Dropdown.Item>
						{/* <Dropdown.Item href="#">Your Collections</Dropdown.Item> */}
						<Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
						<Dropdown.Item onClick={handleDeleteAcc}>Delete Account</Dropdown.Item>
					</Dropdown.Menu>
					</Dropdown>
				) : isOnboardingPage ? (
					<Link className="navw" id='existing' to="/login">
					Already have an account?
					</Link>
				) : (
					<Link to="/onboarding">
					<Button className="navw_join" variant="primary">Join</Button>
					</Link>
				)}
				</Nav>
			{/* </Navbar.Collapse> */}
			</Container>
		</Navbar>
	);
}

export default HeaderWhite;
