import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from '../pages/LoginForm';
import Home from '../pages/Home';
import Employees from '../pages/Employees';
import OsEmployees from '../pages/OS_Employees';
import Management from '../pages/Management';
import AddEmployee from '../pages/AddEmployee';

import Header from '../components/Header';
import Footer from '../components/Footer';

const AppRouter = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LoginForm />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/os-employees" element={<OsEmployees />} />
        <Route path="/management" element={<Management />} />
        <Route path="/add-employee" element={<AddEmployee />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRouter;












