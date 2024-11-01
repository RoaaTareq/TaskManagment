import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../../../../components/Input/Input';
import Select from '../../../../components/DropDown/Select';
import Button from '../../../../components/Button/Button';
import Textarea from '../../../../components/Textarea/textarea';

const TaskForm = ({ onSubmit, onCancel }) => {
    const formRef = useRef(null); // Reference to the form container

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
        priority: Yup.string().required('Priority is required'),
        description: Yup.string().required('Description is required'),
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
            onSubmit(values);
        },
    });

    // Close the form if clicked outside of the form container
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                onCancel(); // Close the form when clicking outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onCancel]);

    return (
        <div ref={formRef}>
            <form onSubmit={formik.handleSubmit} className="task-form">
                <h5>Create task</h5>
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
                    onChange={(e) => formik.setFieldValue('priority', e.target.value)}
                    name="priority"
                    placeholder="Select Priority"
                />
                {formik.errors.priority && formik.touched.priority && (
                    <div className="alert-text">{formik.errors.priority}</div>
                )}
                
                <Textarea
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    placeholder="Description"
                    error={formik.errors.description && formik.touched.description ? formik.errors.description : ''}
                    rows={5}
                    className="mt-4 mb-4"
                />
                
                <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="mt-2"
                    isDisabled={formik.isSubmitting}
                    isLoading={formik.isSubmitting}
                >
                    Submit Task
                </Button>
                
                <Button 
                    type="button" 
                    variant="secondary" 
                    size="lg" 
                    className="mt-2" 
                    onClick={onCancel} // Close form when Cancel is clicked
                >
                    Cancel
                </Button>
            </form>
        </div>
    );
};

export default TaskForm;
