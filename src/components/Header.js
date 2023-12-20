import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const history = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('Token');
        setLoggedIn(!!token); // Use !! to convert the token to a boolean
    }, []);


    const handleLogout = async () => {
        try {
            localStorage.removeItem('Token');
            setLoggedIn(false);
            console.log("Logout successful");
            history('/login');
        } catch (error) {
            console.log("Logout failed", error);
        }
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
