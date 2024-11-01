import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import { addEmployee } from '../../../../db'; // Import the addEmployee function

const EmployeeForm = ({ onSubmit, onCancel }) => {
    const formRef = useRef(null);

    const validationSchema = Yup.object({
        employeeName: Yup.string().required('Employee Name is required'),
        employeeProfile: Yup.string().url('Profile must be a valid URL').required('Employee Profile is required'),
        userName: Yup.string().required('User Name is required'),
        department: Yup.string().required('Department is required'),
        phone: Yup.string()
            .matches(/^[0-9]+$/, 'Phone must contain only numbers')
            .min(10, 'Phone number is too short')
            .required('Phone is required')
    });

    const formik = useFormik({
        initialValues: {
            employeeName: '',
            employeeProfile: '',
            userName: '',
            department: '',
            phone: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await addEmployee(values); // Store employee data in IndexedDB
                onSubmit(values); // Optional: Callback to perform additional actions
            } catch (error) {
                console.error('Error adding employee:', error);
            }
        }
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                onCancel();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onCancel]);

    return (
        <div ref={formRef}>
            <form onSubmit={formik.handleSubmit} className="task-form">
                <h5>Add Employee Info</h5>

                <Input
                    name="employeeName"
                    value={formik.values.employeeName}
                    onChange={formik.handleChange}
                    placeholder="Employee Name"
                />
                {formik.errors.employeeName && formik.touched.employeeName && (
                    <div className="alert-text">{formik.errors.employeeName}</div>
                )}

                <Input
                    name="employeeProfile"
                    value={formik.values.employeeProfile}
                    onChange={formik.handleChange}
                    placeholder="Employee Profile (URL)"
                />
                {formik.errors.employeeProfile && formik.touched.employeeProfile && (
                    <div className="alert-text">{formik.errors.employeeProfile}</div>
                )}

                <Input
                    name="userName"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    placeholder="User Name"
                />
                {formik.errors.userName && formik.touched.userName && (
                    <div className="alert-text">{formik.errors.userName}</div>
                )}

                <Input
                    name="department"
                    value={formik.values.department}
                    onChange={formik.handleChange}
                    placeholder="Department"
                />
                {formik.errors.department && formik.touched.department && (
                    <div className="alert-text">{formik.errors.department}</div>
                )}

                <Input
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    placeholder="Phone"
                />
                {formik.errors.phone && formik.touched.phone && (
                    <div className="alert-text">{formik.errors.phone}</div>
                )}

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="mt-2"
                    isDisabled={formik.isSubmitting}
                    isLoading={formik.isSubmitting}
                >
                    Submit Employee
                </Button>

                <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    className="mt-2"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
            </form>
        </div>
    );
};

export default EmployeeForm;
