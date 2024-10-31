// Login.js
import React, { useState } from 'react';
import { getUserByEmailAndPassword } from '../../db';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const user = await getUserByEmailAndPassword(email, password);
            if (user) {
                // Store user data in localStorage
                localStorage.setItem('loggedInUser', JSON.stringify({ email: user.email, id: user.id }));
                navigate('/dashboard');  // Redirect to dashboard if user is found
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed');
        }
    };

    return (
       <section className='login-section'>
         <div className='container'>
            <h2>Login</h2>
            <form onSubmit={handleLogin} noValidate className='login-form'>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Login
                </button>

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
       </section>
    );
};

export default Login;
