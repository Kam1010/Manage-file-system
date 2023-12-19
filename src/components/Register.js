import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {

    const history = useNavigate();
    const { register, handleSubmit, getValues, formState: { errors } } = useForm();

    const [formData, setFormData] = useState();

    const onSubmit = async (data) => {
        try {
            setFormData(data);
            console.log("data", data);
            const response = await axios.post(
                'http://localhost:8001/users/register',
                data
            );
            history('/')

            console.log('Registration successful', response?.data);
        } catch (error) {
            console.error('Registration error', error?.response?.data);
        }
    };

    console.log(formData);

    return (
        <div style={containerStyle}>
            <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
                <h3 style={{ textAlign: "center" }}>Registration Form</h3>
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
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: 'Invalid email address',
                            },
                        })}
                    />
                    {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
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
                    <label htmlFor="confirm_password">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirm_password"
                        {...register('confirm_password', {
                            required: 'Confirm Password is required',
                            validate: value => value === getValues('password') || 'Passwords do not match',
                        })}
                    />
                    {errors.confirm_password && <p style={errorStyle}>{errors.confirm_password.message}</p>}
                </div>

                <div style={inputGroupStyle}>
                    <label htmlFor="dob">Date of Birth:</label>
                    <input
                        type="date"
                        id="dob"
                        {...register('dob', { required: 'Date of Birth is required' })}
                    />
                    {errors.dob && <p style={errorStyle}>{errors.dob.message}</p>}
                </div>

                <div style={inputGroupStyle}>
                    <button type="submit" style={submitButtonStyle}>Register</button>
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

export default RegistrationForm;
