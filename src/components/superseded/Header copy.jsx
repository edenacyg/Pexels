import React from "react";
import '../stylesheets/header.css';
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
	const users = JSON.parse(localStorage.getItem('users'));

	const handleLogout=()=>{
	localStorage.removeItem("signUp")
	window.location.reload()
	}

	const handleDeleteAcc=()=>{
	localStorage.clear()
	window.location.reload()
	}

	const id = users[0].id;
	const showJoinButton = !id;

	return (
	<Navbar className="header_section" expand="md">
		<Container>
		<Navbar.Brand href="/">
		<div className="logo_section">
			<img src="
			data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMzAiIGhlaWdodD0iNTAiIGNsYXNzPSJEaXNwbGF5Tm9uZV9kZXNrdG9wLW92ZXJzaXplZF9fT1Bxa1ogc3BhY2luZ19ub01hcmdpbl9fUV9Qc0ogc3BhY2luZ19vdmVyc2l6ZWQtbWFyZ2luLXJpZ2h0LTUwX19aNkJYUCBzcGFjaW5nX2Rlc2t0b3AtbWFyZ2luLXJpZ2h0LTMwX19DNE5FRyBzcGFjaW5nX21vYmlsZS1tYXJnaW4tcmlnaHQtMTVfX3VNNzBFIHNwYWNpbmdfdGFibGV0LW1hcmdpbi1yaWdodC0xNV9femVUMXoiIHZpZXdCb3g9IjAgMCAxMzAuMzE4IDUwIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzg5NCAyNzYyKSI+PHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiByeD0iOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzg5NCAtMjc2MikiIGZpbGw9IiMwN2EwODEiLz48cGF0aCBkPSJNMzIuNjcxLDQ0LjczaDcuMDkxVjM3LjkzNUg0MS45YTUuNjU3LDUuNjU3LDAsMSwwLDAtMTEuMzE0SDMyLjY3MVptMTAuNzYzLDMuNjIySDI5VjIzSDQxLjlhOS4yNzEsOS4yNzEsMCwwLDEsMS41MywxOC40MzVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzODgwIC0yNzczKSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xLjY5NCwwaDIuNlYtNi4xNkg3LjY1NmE2LjU3OSw2LjU3OSwwLDAsMCwyLjkxNS0uNjE2LDQuNjM5LDQuNjM5LDAsMCwwLDEuOTY5LTEuNzYsNS4xLDUuMSwwLDAsMCwuNy0yLjcyOCw1LjE0Niw1LjE0NiwwLDAsMC0uNy0yLjc1LDQuNjM5LDQuNjM5LDAsMCwwLTEuOTY5LTEuNzYsNi41NzksNi41NzksMCwwLDAtMi45MTUtLjYxNkgxLjY5NFptMi42LTguNDd2LTUuNjFINy43MjJhMy4wMywzLjAzLDAsMCwxLDIuMTM0Ljc0OCwyLjY0MSwyLjY0MSwwLDAsMSwuODE0LDIuMDQ2QTIuNjg0LDIuNjg0LDAsMCwxLDkuODU2LTkuMjRhMi45NzgsMi45NzgsMCwwLDEtMi4xMzQuNzdaTTIwLjM3Mi4yNjRhNS45MjUsNS45MjUsMCwwLDAsMy4xNzktLjgzNiw0LjY0LDQuNjQsMCwwLDAsMS45LTIuMTEybC0yLjAyNC0uOTlhMy43MywzLjczLDAsMCwxLTEuMiwxLjI0MywzLjI5LDMuMjksMCwwLDEtMS44MzcuNUEzLjQ1OCwzLjQ1OCwwLDAsMSwxOC0yLjgyN2EzLjQzMywzLjQzMywwLDAsMS0xLjEtMi40MDlIMjUuNzRhMy4zNCwzLjM0LDAsMCwwLC4wODgtLjU3MnEuMDIyLS4zMDguMDIyLS41OTRhNi4xNTQsNi4xNTQsMCwwLDAtLjY3MS0yLjg0OSw1LjM2MSw1LjM2MSwwLDAsMC0xLjkzNi0yLjExMiw1LjYxLDUuNjEsMCwwLDAtMy4wNjktLjgsNS43LDUuNywwLDAsMC0zLC44LDUuNzczLDUuNzczLDAsMCwwLTIuMSwyLjIsNi40NzYsNi40NzYsMCwwLDAtLjc3LDMuMTc5QTYuNDgyLDYuNDgyLDAsMCwwLDE1LjA4MS0yLjgsNS45LDUuOSwwLDAsMCwxNy4yMjYtLjU2MSw1Ljk1OCw1Ljk1OCwwLDAsMCwyMC4zNzIuMjY0Wm0tLjItMTAuMzRhMywzLDAsMCwxLDIuMTEyLjc5MiwyLjksMi45LDAsMCwxLC45MjQsMi4wNjhIMTYuOTRhMy4zMTMsMy4zMTMsMCwwLDEsMS4xMjItMi4xMTJBMy4yMDgsMy4yMDgsMCwwLDEsMjAuMTc0LTEwLjA3NlpNMjYuNDIyLDBoMi45MjZsMi43MDYtMy45ODJMMzQuNzM4LDBoMi45MjZMMzMuNTA2LTUuOTYybDQuMTgtNS45NEgzNC43NkwzMi4wNTQtNy45NjQsMjkuMzQ4LTExLjlIMjYuNDIybDQuMTU4LDUuOTRaTTQ0LjA4OC4yNjRhNS45MjUsNS45MjUsMCwwLDAsMy4xNzktLjgzNiw0LjY0LDQuNjQsMCwwLDAsMS45LTIuMTEybC0yLjAyNC0uOTlhMy43MywzLjczLDAsMCwxLTEuMiwxLjI0MywzLjI5LDMuMjksMCwwLDEtMS44MzcuNSwzLjQ1OCwzLjQ1OCwwLDAsMS0yLjQtLjg5MSwzLjQzMywzLjQzMywwLDAsMS0xLjEtMi40MDloOC44NDRhMy4zNCwzLjM0LDAsMCwwLC4wODgtLjU3MnEuMDIyLS4zMDguMDIyLS41OTRBNi4xNTQsNi4xNTQsMCwwLDAsNDguOS05LjI1MWE1LjM2MSw1LjM2MSwwLDAsMC0xLjkzNi0yLjExMiw1LjYxLDUuNjEsMCwwLDAtMy4wNjktLjgsNS43LDUuNywwLDAsMC0zLC44LDUuNzczLDUuNzczLDAsMCwwLTIuMSwyLjIsNi40NzYsNi40NzYsMCwwLDAtLjc3LDMuMTc5QTYuNDgyLDYuNDgyLDAsMCwwLDM4LjgtMi44LDUuOSw1LjksMCwwLDAsNDAuOTQyLS41NjEsNS45NTgsNS45NTgsMCwwLDAsNDQuMDg4LjI2NFptLS4yLTEwLjM0QTMsMywwLDAsMSw0Ni05LjI4NGEyLjksMi45LDAsMCwxLC45MjQsMi4wNjhoLTYuMjdhMy4zMTMsMy4zMTMsMCwwLDEsMS4xMjItMi4xMTJBMy4yMDgsMy4yMDgsMCwwLDEsNDMuODktMTAuMDc2Wk01MS41NDYsMGgyLjQ4NlYtMTYuNjU0SDUxLjU0NlpNNjAuOS4yNjRhNS42LDUuNiwwLDAsMCwyLjMyMS0uNDUxLDMuNjM1LDMuNjM1LDAsMCwwLDEuNTUxLTEuMjU0LDMuMjEsMy4yMSwwLDAsMCwuNTUtMS44NTksMy4wODgsMy4wODgsMCwwLDAtLjc5Mi0yLjEyM0E0LjYzNSw0LjYzNSwwLDAsMCw2Mi4yNi02LjczMkw2MC4zMjQtNy4zYTQuNDM2LDQuNDM2LDAsMCwxLTEuMDM0LS40ODQsMS4wMjMsMS4wMjMsMCwwLDEtLjQ4NC0uOTI0LDEuMjEyLDEuMjEyLDAsMCwxLC40ODQtMS4wMTIsMi4wNjgsMi4wNjgsMCwwLDEsMS4zLS4zNzQsMy4wMDUsMy4wMDUsMCwwLDEsMS43MDUuNTA2QTIuOTQ0LDIuOTQ0LDAsMCwxLDYzLjQtOC4yMjhsMS45MTQtLjlhNC4zNDQsNC4zNDQsMCwwLDAtMS44LTIuMjMzLDUuMzM3LDUuMzM3LDAsMCwwLTIuOS0uOCw1LjEsNS4xLDAsMCwwLTIuMTc4LjQ1MSwzLjcsMy43LDAsMCwwLTEuNTE4LDEuMjQzLDMuMiwzLjIsMCwwLDAtLjU1LDEuODcsMy4xLDMuMSwwLDAsMCwuNzU5LDIuMDksNC42MjQsNC42MjQsMCwwLDAsMi4zLDEuMzJsMS44Ny41MjhhMy45MjMsMy45MjMsMCwwLDEsMS4wNzguNDczLDEuMDU3LDEuMDU3LDAsMCwxLC41MDYuOTU3LDEuMjU5LDEuMjU5LDAsMCwxLS41NSwxLjA3OCwyLjM5MSwyLjM5MSwwLDAsMS0xLjQzLjQsMy4yLDMuMiwwLDAsMS0xLjg4MS0uNTk0QTQuMDQ5LDQuMDQ5LDAsMCwxLDU3LjY4NC0zLjk2bC0xLjkxNC45YTQuNzc0LDQuNzc0LDAsMCwwLDEuOTI1LDIuNDJBNS43LDUuNywwLDAsMCw2MC45LjI2NFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDM5NTkgLTI3MjgpIiBmaWxsPSIjZmZmIi8+PC9nPjwvc3ZnPg==" alt="Logo" className="logo" />
			</div>
		</Navbar.Brand>
		<Navbar.Toggle aria-controls="basic-navbar-nav" />
		<Navbar.Collapse id="basic-navbar-nav">
			<Nav className="ms-auto">
			<Link className="navh" to="#">Explore</Link>
			<Link className="navh" to="#">Upload</Link>
			<Link className="navh" to="/popular">Popular</Link>
			{showJoinButton && (
				<Link to="/onboarding">
				<Button variant="primary">Join</Button>
				</Link>
			)}
			{!showJoinButton && (
				<Dropdown>
				<Dropdown.Toggle variant="primary" id="dropdown-basic" className="header_account_dropdown">
				<Link to="/profile"><img
					src="./images/profile.JPG"
					alt="Account"
					className="account-icon"
				/></Link>
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item href="/profile">Your Profile</Dropdown.Item>
					<Dropdown.Item href="#">Your Collections</Dropdown.Item>
					<Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
					<Dropdown.Item onClick={handleDeleteAcc}>Delete Account</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
			)}
			</Nav>
		</Navbar.Collapse>
		</Container>
	</Navbar>
	);
};

export default Header;
