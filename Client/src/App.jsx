import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Attendance from "./pages/Attendance";
import Employees from "./pages/Employees";
import Leave from "./pages/Leave";
import Payslips from "./pages/Payslips";
import Settings from "./pages/Settings";
import Layout from "./pages/Layout";
import LoginLanding from "./pages/LoginLanding";
import Printpayslip from "./pages/Printpayslip";
import LoginForm from "./components/LoginForm";

import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/login" element={<LoginLanding />} />
              <Route path="/login/admin" element={<LoginForm role="admin"  title="Admin portal" subtitle="Sign in to your admin account" />} />
                 <Route path="/login/employee" element={<LoginForm   role="employee" title="Employee portal" subtitle="Sign in to your employee account" />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/payslips" element={<Payslips />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/print/payslips/:id" element={<Printpayslip />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
