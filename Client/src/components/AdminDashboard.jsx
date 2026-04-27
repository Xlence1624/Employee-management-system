import {
  Building2Icon,
  CalendarIcon,
  FileTextIcon,
  UserIcon,
} from "lucide-react";
import React from "react";

const AdminDashboard = ({ data }) => {
  const stats = [
    {
      icon: UserIcon,
      value: data.totalEmployees,
      label: "Total Employees",
      description: "Active workforce",
    },
    {
      icon: Building2Icon,
      value: data.totalDepartments,
      label: "Departments",
      description: "Organization units",
    },

    {
      icon: CalendarIcon,
      value: data.todayAttendance,
      label: " Today's Attendance",
      description: "Checked in today",
    },

    {
      icon: FileTextIcon,
      value: data.pendingLeaves,
      label: " Pending Leaves",
      description: "Awaiting approval",
    },
  ];
  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1 className="page-title sm:ml-10 lg:ml-0">Dashboard</h1>
        <p className="page-subtitle">
          Welcome back, Admin - Here's your overview
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="card card-hover p-5  sm:p-6 relative overflow-hidden group flex items-center justify-between  "
          >
            <div>
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-slate-500/70 group-hover:bg-indigo-500/70 " />
            </div>

            <div className=" flex items-center sm:items-start gap-[30%] w-full sm:w-auto sm:flex sm:flex-col   sm:absolute left-[10%] top-[20%] ">
              <p className="text-sm font-medium text-slate-700  ">
                {s.label}
              </p>

              <p className="text-2xl  font-bold text-slate-900 mt-1 absolute left-[50%] sm:static ">
                {s.value}
              </p>
            </div>

            <s.icon className="size-10 p-2.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-200 " />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
