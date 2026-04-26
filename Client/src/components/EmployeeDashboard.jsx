import { CalendarIcon, DollarSignIcon, FileTextIcon } from "lucide-react";
import React from "react";

import { dummyEmployeeDashboardData } from "../assets/assets";

const EmployeeDashboard = ({data}) => {
  const emp = data.employee;

  const cards = [
    {
      icon: CalendarIcon,
      valie: data.currentMonthAttendance,
      title: "Days Present",
      subtitle: "This month",
    },
    {
      icon: FileTextIcon,
      valie: data.pendingLeaves,
      title: "Pending Leaves",
      subtitle: "Awaiting approval",
    },
    {
      icon: DollarSignIcon,
      valie: data.latestPayslip
        ? `$${data.latestPayslip.netSalary?.toLocaleString()}`
        : "N/A",
      title: "Latest Payslip",
      subtitle: "Most recent payout",
    },
  ];
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Welcome, {emp?.firstName}</h1>
        <p className="page-subtitle">
          {emp?.position} - {emp?.department || "No Department"}
        </p>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
