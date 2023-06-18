import React from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import "../stylesheets/headerwhite.css";
import { Link } from "react-router-dom";

function HeaderWhite(props) {
  const users = JSON.parse(localStorage.getItem('users'));
  const isOnboardingPage = props.isOnboardingPage;
  const signUp = localStorage.getItem("signUp");

  const handleLogout = () => {
    localStorage.removeItem("signUp");
    window.location.reload();
  };

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
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="navw" to="#">
              Explore
            </Link>
            <Link className="navw" to="#">
              Upload
            </Link>
            <Link className="navw" to="/popular">
              Popular
            </Link>
            {signUp ? (
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic" className="headerw_account_dropdown">
                <Link to="/profile"><img
                  src="./images/profile.JPG"
                  alt="Account"
                  className="account-icon"
                /></Link>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Your Profile</Dropdown.Item>
                  <Dropdown.Item href="#">Your Collections</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : isOnboardingPage ? (
              <Link className="navw" to="/login">
                Already have an account?
              </Link>
            ) : (
              <Link to="/onboarding">
                <Button variant="primary">Join</Button>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderWhite;
