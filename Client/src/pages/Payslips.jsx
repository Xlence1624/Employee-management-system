import React from 'react'
import { dummyEmployeeData, dummyPayslipData } from '../assets/assets'
import { useState, useEffect, useCallback } from 'react'
import Loading from '../components/Loading';

const Payslips = () => {
  const [payslips, setPayslips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState([]);
  const isAdmin = true;

  const fetchPayslips = useCallback( async () => {
      setPayslips(dummyPayslipData);  
      setTimeout(
        () => {
          setLoading(false);
        }
      ,1000)
    }, []
  );

  useEffect(
    () => {
      fetchPayslips();
    }, [fetchPayslips]
  );
    useEffect(
    () => {
    if(isAdmin){
      setEmployee(dummyEmployeeData);
    }
  }, [isAdmin]
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

{isAdmin && <p>Generate Form</p>}

</div>

<p className="page-description">Payslip list</p>


    </div>
  )
}

export default Payslips