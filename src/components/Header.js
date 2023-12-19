// Header.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ onLogout }) => {
    const history = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // Check if a token is present in localStorage
        const token = localStorage.getItem('Token');

        if (token) {
            // You may want to implement token verification logic here
            // For simplicity, we'll assume the token is valid if present
            setLoggedIn(true);
        } else {
             setLoggedIn(false);
        }
    }, [loggedIn]);


    const handleLogout = async () => {
        try {

            localStorage.removeItem('Token');
            setLoggedIn(false);
            console.log("Logout successful");
            history('/login');
            console.log(localStorage.getItem("Token"));
            
        } catch (error) {
            console.log("Logout failed", error);
        }

        // Perform logout logic
        // For now, just navigate to the home page
        onLogout();
        history('/login');
    };

    return (
        <>
            <header style={headerStyle}>
                <div style={containerStyle}>
                    <nav style={{ width: "100%" }}>
                        <ul style={ulStyle}>
                            <li style={liStyle}>
                                <Link to="/" style={{ color: "#FFF" }}>Home</Link>
                            </li>
                            {loggedIn ? (
                                <>
                                <li style={liStyle}>
                                    <Link to="/profile" style={{ color: "#FFF" }}>Profile</Link>
                                </li>

                                    <li style={liStyle}>
                                        <button style={buttonStyle} onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                <li style={liStyle}>
                                    <Link to="/login" style={{ color: "#FFF" }}>
                                        {loggedIn ? 'Logout' : 'Login'}
                                    </Link>
                                </li>
                                <li style={liStyle}>
                                    <Link to="/register" style={{ color: "#FFF" }}>Register</Link>
                                </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
                <div></div>
            </header>
        </>
    );
};

const headerStyle = {
    display: "flex",
    background: '#294B5D',
    color: '#fff',
    padding: '1rem 0',
};

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
};

const ulStyle = {
    listStyle: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
    color: "#FFF",
    justifyContent: "space-around",
    alignItems: "center",
};

const liStyle = {
    margin: '0 10px',
    fontColor: "#FFF",
    marginRight: "10px",
};

const buttonStyle = {
    border: 'none',
    color: '#fff',
    background: "#333",
    padding: "5px 10px",
    cursor: "pointer",
    // cursor: 'pointer',
};

export default Header;
