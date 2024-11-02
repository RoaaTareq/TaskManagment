import React, { useRef, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../../../../components/Input/Input';
import Select from '../../../../components/DropDown/Select';
import Button from '../../../../components/Button/Button';
import Textarea from '../../../../components/Textarea/textarea';
import '../../../../assets/style/form.css';

const TaskForm = React.memo(({ onSubmit, onCancel }) => {
    const formRef = useRef(null);

    const priorityOptions = [
        { label: 'High', value: 'High' },
        { label: 'Medium', value: 'Medium' },
        { label: 'Low', value: 'Low' },
    ];

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

    const formik = useFormik({
        initialValues: {
            startDate: '',
            endDate: '',
            priority: '',
            description: '',
        },
        validationSchema,
        onSubmit: useCallback((values) => {
            onSubmit(values);
        }, [onSubmit]), // Memoize the submit handler
    });

    const handleClickOutside = useCallback((event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
            onCancel();
        }
    }, [onCancel]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    const renderError = (field) => (
        formik.errors[field] && formik.touched[field] ? (
            <div className="alert-text">{formik.errors[field]}</div>
        ) : null
    );

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
                {renderError('startDate')}

                <Input
                    type="date"
                    name="endDate"
                    value={formik.values.endDate}
                    onChange={formik.handleChange}
                    placeholder="End Date"
                />
                {renderError('endDate')}

                <Select
                    options={priorityOptions}
                    value={formik.values.priority}
                    onChange={(e) => formik.setFieldValue('priority', e.target.value)}
                    name="priority"
                    placeholder="Select Priority"
                />
                {renderError('priority')}

                <Textarea
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    placeholder="Description"
                    error={renderError('description')}
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
                    onClick={onCancel}
                >
                    Cancel
                </Button>
            </form>
        </div>
    );
});

export default TaskForm;
