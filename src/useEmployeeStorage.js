import { useState, useEffect } from 'react';

const useEmployeeStorage = (key, initialValue) => {
    const [employee, setEmployee] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(employee));
    }, [key, employee]);

    return [employee, setEmployee];
};

export default useEmployeeStorage;
