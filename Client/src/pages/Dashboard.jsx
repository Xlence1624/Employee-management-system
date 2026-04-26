import React, { useEffect, useState } from "react";
import { dummyEmployeeDashboardData } from "../assets/assets";
import Loading from "../components/Loading";
import EmployeeDashboard from "../components/EmployeeDashboard";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData(dummyEmployeeDashboardData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <Loading />;
  if (!data) {
    return (
      <p className="text-center text-slate-500 py-12">
        Failed to load dashboard data
      </p>
    );
  }

  if (data.role === "ADMIN") {
    return <div>Admin Dashboard</div>;
  } else {
    return (<div>
      <EmployeeDashboard data={data} />
   

   
    </div>);
  }
};

export default Dashboard;
