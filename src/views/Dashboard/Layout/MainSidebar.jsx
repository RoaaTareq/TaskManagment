import React from 'react';
import Sidebar from '../../../components/Layout/Sidebar';
import Task from '../Task/task';
import Project from '../Project/project';
import Employee from '../Employee/employee';
import { Routes, Route, Navigate } from 'react-router-dom';

const menuItems = [
  { label: 'Create Task', link: 'task' },
  { label: 'Create Project', link: 'project' },
  { label: 'Create Employee', link: 'employee' },
];

function MainSidebar() {
  return (
    <div className="d-flex">
      <Sidebar menuItems={menuItems} />
      <div className="p-4 w-100">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/task" />} /> {/* Default route */}
          <Route path="task" element={<Task />} />
          <Route path="project" element={<Project />} />
          <Route path="employee" element={<Employee />} />
        </Routes>
      </div>
    </div>
  );
}

export default MainSidebar;
