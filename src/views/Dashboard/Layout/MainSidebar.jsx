// App.js
import React from 'react';
import Sidebar from '../../../components/Layout/Sidebar';
import Task from '../Task/task';
import Project from '../Project/project';
import Employee from '../Employee/employee'

import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';


const menuItems = [
  { label: 'Create Task', link: 'dashboard/task' },
  { label: 'Create Project', link: 'dashboard/project' },
  { label: 'Create Employee', link: 'dashboard/employee' },
];

function MainSidebar() {
  return (
    <div className="d-flex">
      <Sidebar
      
        menuItems={menuItems}
       
      />
      <div className="p-4 w-100">
      <Routes>
          <Route path="/dashboard" element={<Navigate to="/overview" />} />
          <Route path="/task" element={<Task />} />
          <Route path="/project" element={<Project />} />
          <Route path="/employee" element={<Employee />} />
          
        </Routes>
      </div>
    </div>
  );
}

export default MainSidebar;
