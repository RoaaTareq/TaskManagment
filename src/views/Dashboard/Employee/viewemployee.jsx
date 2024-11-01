import React from "react";
import Table from "../../../components/Table/Table";

const viewEmployee = ()=>{
    const columns = [
        { header: 'Employee Name', accessor: 'employeeName' },
        { header: 'Employee Profile', accessor: 'employeeProfile' },
        { header: 'User Name', accessor: 'userName' },
        { header: 'Department', accessor: 'department' },
        { header: 'Phone', accessor: 'phone' },
        { header: 'Action', accessor: 'phone' },
    ];
    const data = [
        {
            employeeName: 'John Doe',
            employeeProfile: 'Profile Link',
            userName: 'johndoe',
            department: 'Engineering',
            phone: '123-456-7890',
        },
        {
            employeeName: 'Jane Smith',
            employeeProfile: 'Profile Link',
            userName: 'janesmith',
            department: 'Marketing',
            phone: '098-765-4321',
        },
       
    ];

    return (
        <div className="App">
          
            <Table columns={columns} data={data} />
        </div>
    );

}
export default viewEmployee