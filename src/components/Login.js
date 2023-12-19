import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const history = useNavigate();
    const { register, handleSubmit, getValues, formState: { errors } } = useForm();

    const [formData, setFormData] = useState();
    const [error, setError] = useState();

    const onSubmit = async (data) => {
        try {
            setFormData(data);
            console.log("data", data);
            const response = await axios.post(
                'http://localhost:8001/users/login',
                data
            );
            history('/')
            localStorage.setItem("Token", response?.data?.data?.token)
            alert("Login Successfully")

            console.log('Login successful', response?.data);
        } catch (error) {
          setError(error?.response?.data)
            console.error('Login error', error?.response?.data);
        }
    };
    useEffect(() => {

    },[])

    console.log(formData);

    return (
        <div style={containerStyle}>
            <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
                <h3 style={{ textAlign: "center" }}>Login Form</h3>

                <div style={inputGroupStyle}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        {...register('username', { required: 'Username is required' })}
                    />
                    {errors.username && <p style={errorStyle}>{errors.username.message}</p>}
                </div>

                <div style={inputGroupStyle}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        {...register('password', { required: 'Password is required', minLength: 6 })}
                    />
                    {errors.password && <p style={errorStyle}>{errors.password.message}</p>}
                </div>

                <div style={inputGroupStyle}>
                    <button type="submit" style={submitButtonStyle}>Login</button>
                </div>
            </form>
        </div>
    );
};

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Center vertically on the page
};

const formStyle = {
    width: '400px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
};

const inputGroupStyle = {
    marginBottom: '15px',
};

const errorStyle = {
    color: 'red',
    marginTop: '5px',
};

const submitButtonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: "center"
};

export default Login;

