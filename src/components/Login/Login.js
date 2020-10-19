import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import './Login.css'
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig)

function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        newUser: false,
        name: '',
        email: '',
        phone: ''
    });


    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, photoURL, email } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(signedInUser);
                setLoggedInUser(signedInUser);
                history.replace(from);
                console.log(signedInUser);
            })
            .catch(err => {
                console.log(err);
                console.log(err.message);
            })
    }

    const handleFbSignIn = () => {
        firebase.auth().signInWithPopup(fbProvider).then(function (result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            const { displayName, email } = user;

            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                // photo: photoURL
            }

            setLoggedInUser(signedInUser);
            history.replace(from);
            console.log('Facebook User', user);
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }


    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(res => {
                const signedOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    password: '',
                    photo: '',
                    error: '',
                    success: ''
                }
                setUser(signedOutUser)
                setLoggedInUser(signedOutUser);

            })
            .catch(err => {

            })
    }

    const handleBlur = (event) => {
        let isFieldValid = true;
        if (event.target.name === 'name') {
            isFieldValid = event.target.value.length > 1;
        }
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 5;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch(error => {
                    // Handle Errors here.
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);

                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    console.log('Login user info', res.user.displayName);

                })
                .catch(function (error) {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }


        event.preventDefault();
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
            // console.log('User Name Update Successful')
        }).catch(function (error) {
            console.log(error)
        });
    }


    return (
        <div className="App container">
            <div className=" container login-form bg-white">
                <h3>Login</h3>
                <form onSubmit={handleSubmit}>
                    {newUser && <input className="form-control" name="name" type="text" placeholder="Your Name" onBlur={handleBlur} required />}
                    <br />
                    <input className="form-control" type="text" onBlur={handleBlur} name="email" placeholder="Email" required />
                    <br />
                    <input className="form-control" type="password" name="password" onBlur={handleBlur} placeholder="Password" required />
                    <br />

                    <input className="btn btn-warning btn-block" type="submit" value={newUser ? 'Sign up' : 'Login'} />

                    {
                        newUser ? <p className="pt-2">Already have an account?<span className="createAccountBtn" onClick={() => setNewUser(!newUser)}> Login</span></p> :
                            <p className="pt-2">Don’t have an account? <span className="createAccountBtn" onClick={() => setNewUser(!newUser)}> Create an account</span></p>

                    }



                </form>
                <p style={{ color: 'red' }}>{user.error}</p>
                {user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged In'} Successfully</p>}
            </div>


            <br />
            {
                user.isSignedIn ? <button className="fb-google-loginBtn btn google-loginBtn" onClick={handleSignOut}>Sign Out</button> :
                    <button className="fb-google-loginBtn btn google-loginBtn" onClick={handleGoogleSignIn}>Continue with Google</button>
            }
            <br />
            <button className="fb-google-loginBtn btn fb-loginBtn" onClick={handleFbSignIn}>Continue with Facebook</button>
            {
                user.isSignedIn && <div>
                    <p> Welcome, {user.name}</p>
                    <p>Your Email: {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            }
        </div>
    );
}

export default Login;

