import React, { useEffect, useRef, useState } from "react";
import '../stylesheets/regform.css';
import { Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Button, Container, Form } from "react-bootstrap";
import Dropzone from 'react-dropzone';

function RegForm() {
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const [showHome, setShowHome] = useState(false);
    const [notification, setNotification] = useState('');
    const localSignUp = localStorage.getItem("signUp");
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (localSignUp) {
            setShowHome(true);
        }
    })

    const handleClick = async () => {
        const enteredName = name.current.value;
        const enteredEmail = email.current.value;
        const enteredPassword = password.current.value;
    
        if (enteredName && enteredEmail && enteredPassword && file) {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const emailExists = users.some(user => user.email === enteredEmail);
    
            if (emailExists) {
                setNotification('Email already registered!');
                return;
            }
    
            const uuid = uuidv4();
            const newUser = {
                id: uuid,
                name: enteredName,
                email: enteredEmail,
                password: enteredPassword,
                favorites: [],
                downloads: [],
                following: [],
                profileImg: file.name // Add the selected file name to the user object
            };
    
            // Add the new user object to the users array in local storage
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
    
            // Set the "signUp" key in local storage to the entered email
            localStorage.setItem('signUp', enteredEmail);
    
            // Upload the selected file to the public/images folder
            const formData = new FormData();
            formData.append('file', file);
            try {
                const response = await fetch('/upload', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                console.log('File upload response:', data);
            } catch (error) {
                console.error('File upload failed:', error);
                setNotification('File upload failed!');
                return;
            }
    
            setNotification('Account created successfully!');
            setShowHome(true);
        } else {
            setNotification('Please fill out all fields and select a profile image!');
        }
    };    
    
    if (showHome) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <div className="container" id='regform'>
                <img id="regform_image" src="./images/registration.jpeg"></img>
                {/* <h6>Download free photos and videos powered by a community of photographers.</h6> */}
                <div className="form_content">
                    <Form.Group className="input_space">
                        <Form.Control type="text" placeholder="Name" ref={name} />
                    </Form.Group>
                    <Form.Group className="input_space">
                        <Form.Control type="text" placeholder="Email" ref={email} />
                    </Form.Group>
                    <Form.Group className="input_space">
                        <Form.Control type="password" placeholder="Password" ref={password} />
                    </Form.Group>
                    <Form.Group>
                        {/* <Form.Label>Upload Profile</Form.Label> */}
                        <Dropzone onDrop={acceptedFiles => setFile(acceptedFiles[0])}>
                       
                            {({ getRootProps, getInputProps }) => (
                                 <div className="drag_image">
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        {file ? (
                                            <div>
                                                {/* <p>{file.name}</p> */}
                                                <img src={URL.createObjectURL(file)} alt="uploaded" />
                                            </div>
                                        ) : (
                                            <>                                           
                                                <p>Drag and drop your profile image here.</p>                                                                                      
                                            </>
                                            
                                        )}
                                    </div>
                                </div>
                            )}
                        </Dropzone>
                    </Form.Group>
                    <Button variant="primary" onClick={handleClick} block>Sign Up</Button>
                    {notification && <div className="notification">{notification}</div>}
                </div>
            </div>
            <p id="regform_p">We’ll use this info to personalize your experience. You’ll always be able to both download and upload photos and videos, no matter which option you choose.</p>
        </div>
    );
}

export default RegForm;
