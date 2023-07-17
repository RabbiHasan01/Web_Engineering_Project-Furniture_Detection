import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";

import "./style.css"

import { app } from "../firebase";
const auth = getAuth();


const Login = () => {
    const nevigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState([]);
    const [rememberMe, setRememberMe] = useState(false);

    const handleCheckboxChange = () => {
        setRememberMe(!rememberMe);
        //if(rememberMe) localStorage.setItem('rememberMe', false);
        // else localStorage.setItem('rememberMe', true);
        localStorage.setItem('rememberMe', rememberMe);
        const s = localStorage.getItem('rememberMe');
        console.log("s= " + s);
    };


    const loginUser = () => {
        if (email == 'admin' && password == 'admin')
            nevigate("/adminHome")
        else
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const session = userCredential;
                    localStorage.setItem('userEmail', session.user.email);
                    localStorage.setItem('userId', session.user.uid);
                    localStorage.setItem('rememberMe', rememberMe);
                    const s = localStorage.getItem('rememberMe');
                    console.log("ss =" + s)
                    nevigate("/gsap");
                    //console.log(user);
                })
                .catch((err) => console.log(err));
    }
    const bannerStyle = {
        backgroundColor: '#f5f5f5',
        padding: '20px',
        textAlign: 'center',
    };

    const headingStyle = {
        fontSize: '24px',
        color: '#333',
    };

    const paragraphStyle = {
        fontSize: '18px',
        color: '#777',
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        fontSize: '16px',
        border: 'none',
        cursor: 'pointer',
    };

    return (
        <div className="container">

            <div className="row justify-content-center mt-5">
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <div style={bannerStyle}>
                                <h1 style={headingStyle}>Welcome to FurnitureCollection!</h1>
                                <p style={paragraphStyle}>Discover amazing deals and offers.</p>
                                <button style={buttonStyle}> Register Now</button>
                            </div>
                            <h5 className="card-title">Login</h5>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                />
                            </div>
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="rememberMeCheckbox"
                                    checked={rememberMe}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label" htmlFor="rememberMeCheckbox">
                                    Remember Me
                                </label>
                            </div>
                            <button onClick={loginUser} type="submit" className="btn btn-primary btn-block">
                                Login
                            </button>
                            <p className="mt-3 text-center">
                                Don't have an account? <Link to="/signup">Sign Up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;