
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getUserByEmailAndPassword } from '../../db';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input'; // Import Input component
import Button from '../../components/Button/Button'; // Import Button component

const Login = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .required('Password is required'),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setErrors({}); // Clear previous errors

            try {
                const user = await getUserByEmailAndPassword(values.email, values.password);
                if (user) {
                    // Store user data in localStorage
                    localStorage.setItem('loggedInUser', JSON.stringify({ email: user.email, id: user.id }));
                    navigate('/dashboard'); // Redirect to dashboard if user is found
                } else {
                    setErrors({ api: 'Invalid email or password' });
                }
            } catch (error) {
                console.error('Login error:', error);
                setErrors({ api: 'Login failed' });
            } finally {
                setSubmitting(false); // Set submitting to false regardless of the result
            }
        },
    });

    return (
        <section className='login-section'>
            <div className='container'>
               
                {formik.errors.api && <p className='alert alert-danger'>{formik.errors.api}</p>}
                <form onSubmit={formik.handleSubmit} noValidate className='login-form'>
                    <h3 className='text-center'>Log in to continue</h3>
                    <div >
                        <label>Email:</label>
                        <Input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange} // Handle email input
                            onBlur={formik.handleBlur} // Handle blur for validation
                            placeholder="Enter your email"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className='alert-text'>{formik.errors.email}</p>
                        )}
                    </div>

                    <div >
                        <label>Password:</label>
                        <Input
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange} // Handle password input
                            onBlur={formik.handleBlur} // Handle blur for validation
                            placeholder="Enter your password"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className='alert-text'>{formik.errors.password}</p>
                        )}
                    </div>

                    <Button type="submit"  disabled={formik.isSubmitting}>
                        Login
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default Login;
