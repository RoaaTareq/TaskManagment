import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home'
import Navbar from './views/Layout/Navbar'
import MainFooter from './views/Layout/MainFooter';
function App() {
  return (
    <Router>
    <Navbar/>
      <Routes>
          <Route path="/" element={<Home />} />
          
        </Routes>
        <MainFooter/>
    </Router>
  );
}

export default App;
