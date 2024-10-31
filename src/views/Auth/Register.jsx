// RegisterForm.js
import React, { useState } from 'react';
import { addUser } from '../../db'; // Adjust the path as necessary
import Input from '../../components/Input/Input'; // Adjust the path as necessary
import Button from '../../components/Button/Button'; // Adjust the path as necessary

const RegisterForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if there are no errors
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);

        if (validate()) {
            console.log('Form data ready to store:', formData);

            try {
                const id = await addUser(formData); // Ensure a unique ID is returned
                if (id) {
                    setSuccess(true);
                    console.log('User successfully stored with ID:', id);
                    setTimeout(() => {
                        setFormData({ name: '', email: '', password: '' });
                        setErrors({});
                    }, 2000); // Clear form after 2 seconds
                }
            } catch (error) {
                setErrors({ api: 'Registration failed. Please try again.' });
                console.error('Error in form submission:', error);
            }
        }
    };

    return (
        <section className='register-section'>
            <div className='container'>
                <h2>Register</h2>
                {success && <p className='alert alert-success'>Registration successful!</p>}
                {errors.api && <p className='alert alert-danger'>{errors.api}</p>}
                <form onSubmit={handleSubmit} className='register-form' noValidate>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Name:</label>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange} // Use handleChange
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className='alert-text'>{errors.name}</p>}
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label>Email:</label>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange} // Use handleChange
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className='alert-text'>{errors.email}</p>}
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label>Password:</label>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange} // Use handleChange
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className='alert-text'>{errors.password}</p>}
                    </div>

                    <Button type="submit" variant="success">
                        Register
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default RegisterForm;
