import React, { createContext, useContext, useState } from 'react';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([
        { id: "123", name: "John Doe", email: "john.doe@example.com", team: "Engineering" },
        { id: "456", name: "Jane Smith", email: "jane.smith@example.com", team: "Marketing" },
    ]);

    return (
        <EmployeeContext.Provider value={{ employees, setEmployees }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export const useEmployees = () => useContext(EmployeeContext);
