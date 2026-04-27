import { ArrowRightIcon, CalendarIcon, DollarSignIcon, FileTextIcon } from "lucide-react";
import React from "react";

import { dummyEmployeeDashboardData } from "../assets/assets";
import { Link } from "react-router-dom";

const EmployeeDashboard = ({data}) => {
  const emp = data.employee;

  const cards = [
    {
      icon: CalendarIcon,
      value: data.currentMonthAttendance,
      title: "Days Present",
      subtitle: "This month",
    },
    {
      icon: FileTextIcon,
      value: data.pendingLeaves,
      title: "Pending Leaves",
      subtitle: "Awaiting approval",
    },
    {
      icon: DollarSignIcon,
      value: data.latestPayslip
        ? `$${data.latestPayslip.netSalary?.toLocaleString()}`
        : "N/A",
      title: "Latest Payslip",
      subtitle: "Most recent payout",
    },
  ];
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title ">Welcome, {emp?.firstName}</h1>
        <p className="page-subtitle">
          {emp?.position} - {emp?.department || "No Department"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
{cards.map(
  (card, index) => (
    <div key={index} className="card card-hover p-5  sm:p-6 relative overflow-hidden group flex items-center justify-between  ">
<div>
  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-slate-500/70 group-hover:bg-indigo-500/70 "/>
</div>

<div className=" flex items-center sm:items-start gap-[30%] w-full sm:w-auto sm:flex sm:flex-col   sm:absolute left-[10%] top-[20%] ">
<p className="text-sm font-medium text-slate-700  top-[40%] sm:static ">{card.title}</p>

<p className="text-2xl  font-bold text-slate-900 mt-1">{card.value}</p>
</div>


<card.icon className="size-10 p-2.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-200 "/>




    </div>
  )
)}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/attendance" className="btn-primary text-center justify-center inline-flex  gap-3">
        Mark Attendance  <ArrowRightIcon className="w-4 "/> </Link>
           <Link to="/leave" className="btn-secondary text-center justify-center inline-flex  gap-3">
      Apply for leave  <ArrowRightIcon className="w-4 "/> </Link>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
