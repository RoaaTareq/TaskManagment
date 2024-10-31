// RegisterForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addUser } from '../../db'; 
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button'; 

const RegisterForm = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
        }),
        onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
           
            try {
                const id = await addUser(values); 
                if (id) {
                  
                    resetForm(); 
                }
            } catch (error) {
                setErrors({ api: 'Registration failed. Please try again.' });
                
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <section className='register-section'>
            <div className='container'>
               
                {formik.errors.api && <p className='alert alert-danger'>{formik.errors.api}</p>}
                <form onSubmit={formik.handleSubmit} className='register-form' noValidate>
                <h3 className='text-center'>Register in to use system</h3>
                    <div>
                        <label>Name:</label>
                        <Input
                            type="text"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            placeholder="Enter your name"
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className='alert-text'>{formik.errors.name}</p>
                        )}
                    </div>

                    <div >
                        <label>Email:</label>
                        <Input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
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
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            placeholder="Enter your password"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className='alert-text'>{formik.errors.password}</p>
                        )}
                    </div>

                    <Button type="submit"  disabled={formik.isSubmitting}>
                        Register
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default RegisterForm;
