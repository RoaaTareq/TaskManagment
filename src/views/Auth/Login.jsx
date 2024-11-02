import React, { useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getUserByEmailAndPassword } from '../../db';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input'; 
import Button from '../../components/Button/Button';
import { useTranslation } from 'react-i18next'; 
import '../../assets/style/form.css';

const Login = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

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
        onSubmit: useCallback(async (values, { setSubmitting, setErrors }) => {
            setErrors({});

            try {
                const user = await getUserByEmailAndPassword(values.email, values.password);
                if (user) {
                    localStorage.setItem('loggedInUser', JSON.stringify({ email: user.email, id: user.id }));
                    localStorage.setItem('userId', user.id);
                    navigate('/dashboard/task');
                } else {
                    setErrors({ api: 'Invalid email or password' });
                }
            } catch (error) {
                setErrors({ api: 'Login failed' });
            } finally {
                setSubmitting(false);
            }
        }, [navigate]),
    });

    return (
        <section className='login-section'>
            <div className='container'>
                {formik.errors.api && <p className='alert alert-danger'>{formik.errors.api}</p>}
                <form onSubmit={formik.handleSubmit} noValidate className='login-form'>
                    <h3 className='text-center'>  {t('login-title')}</h3>
                    <div>
                        <label htmlFor="email">{t('email')}:</label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            placeholder={t('enter-email')}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className='alert-text'>{formik.errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password">{t('password')}</label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            placeholder={t('enter-password')}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className='alert-text'>{formik.errors.password}</p>
                        )}
                    </div>

                    <Button type="submit" disabled={formik.isSubmitting}>
                    {t('login')}
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default Login;
