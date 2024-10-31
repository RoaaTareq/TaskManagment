// RegisterForm.js
import React, { useState } from 'react';
import { addUser } from '../../db';

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
        return Object.keys(newErrors).length === 0;
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
                const id = await addUser(formData); // Check if unique ID is returned
                if (id) {
                    setSuccess(true);
                    console.log('User successfully stored with ID:', id);
                    setFormData({ name: '', email: '', password: '' });
                    setErrors({});
                }
            } catch (error) {
                console.error('Error in form submission:', error);
            }
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2>Register</h2>
            {success && <p style={{ color: 'green' }}>Registration successful!</p>}
            <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: '15px' }}>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px' }}
                    />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px' }}
                    />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px' }}
                    />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                </div>

                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
