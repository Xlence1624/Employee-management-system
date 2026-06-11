import React from 'react'
import { dummyEmployeeData, dummyPayslipData } from '../assets/assets'
import { useState, useEffect, useCallback } from 'react'
import Loading from '../components/Loading';
import PayslipList from '../components/payslip/PayslipList';
import GeneratePayslipForm from '../components/payslip/GeneratePayslipForm';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { toast } from 'react-hot-toast';
const Payslips = () => {
  const [payslips, setPayslips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employee, setEmployees] = useState([]);
  const {user} = useAuth();
  const isAdmin = user?.role === "admin" || user?.role === "ADMIN" || user?.role === "Admin";

  const fetchPayslips = useCallback( async () => {
   try{
const res = await api.get("/payslips");
setPayslips(res.data.data || [])
   } catch (error){
  toast.error(error?.response?.data?.error || "Failed to fetch payslips")
   }finally {
    setLoading(false);
   }
    }, []
  );

  useEffect(
    () => {
      fetchPayslips();
    }, [fetchPayslips]
  );
    useEffect(
    () => {
    if(isAdmin) api.get("/employees").then((res) => setEmployees(res.data.filter((e)=> !e.isDeleted))).catch(()=> {})}, [isAdmin]
  );
if (loading) return <Loading/>
  return (
    <div className="animate-fade-in">

<div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">

<div className="">

  <h1 className="page-title"> Payslips</h1>
  <p className="page-subtitle">
    {isAdmin? "View and manage employee payslips" : "Your monthly payslips and salary details"}
  </p>
</div>

{isAdmin && <GeneratePayslipForm employee={employee} onsuccess={fetchPayslips} />}

</div>

<PayslipList payslips={payslips} isAdmin={isAdmin} />


    </div>
  )
}

export default Payslips