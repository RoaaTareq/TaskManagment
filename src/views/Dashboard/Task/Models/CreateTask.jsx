import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../../../../components/Input/Input';
import Select from '../../../../components/DropDown/Select';

const TaskForm = ({ onSubmit }) => {
    const priorityOptions = [
        { label: 'High', value: 'high' },
        { label: 'Medium', value: 'medium' },
        { label: 'Low', value: 'low' },
    ];

    // Yup validation schema
    const validationSchema = Yup.object({
        startDate: Yup.date()
            .required('Start Date is required')
            .typeError('Start Date must be a valid date'),
        endDate: Yup.date()
            .required('End Date is required')
            .typeError('End Date must be a valid date')
            .min(Yup.ref('startDate'), "End Date can't be before Start Date"),
        priority: Yup.string()
            .required('Priority is required'),
        description: Yup.string()
            .required('Description is required'),
    });

    // Formik hook
    const formik = useFormik({
        initialValues: {
            startDate: '',
            endDate: '',
            priority: '',
            description: '',
        },
        validationSchema,
        onSubmit: (values) => {
            onSubmit(values); // Call the parent onSubmit with form values
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="task-form">
            <Input
                type="date"
                name="startDate"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                placeholder="Start Date"
            />
            {formik.errors.startDate && formik.touched.startDate && (
                <div className="alert-text">{formik.errors.startDate}</div>
            )}
            
            <Input
                type="date"
                name="endDate"
                value={formik.values.endDate}
                onChange={formik.handleChange}
                placeholder="End Date"
            />
            {formik.errors.endDate && formik.touched.endDate && (
                <div className="alert-text">{formik.errors.endDate}</div>
            )}
            
            <Select
                options={priorityOptions}
                value={formik.values.priority}
                onChange={(e) => formik.setFieldValue('priority', e.target.value)} // Handle select change
                name="priority"
                placeholder="Select Priority"
            />
            {formik.errors.priority && formik.touched.priority && (
                <div className="alert-text">{formik.errors.priority}</div>
            )}
            
            <Input
                type="text"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                placeholder="Description"
            />
            {formik.errors.description && formik.touched.description && (
                <div className="alert-text">{formik.errors.description}</div>
            )}
            
            <button type="submit" className="btn btn-primary mt-2">Submit Task</button>
        </form>
    );
};

export default TaskForm;
