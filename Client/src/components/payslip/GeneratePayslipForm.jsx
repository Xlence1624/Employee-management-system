import { Loader2, Plus } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
import { X } from 'lucide-react';


const GeneratePayslipForm = ({employee, onsuccess
}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);
  if(!isOpen) return (
    <button className="btn-primary flex items-center gap-2" onClick={() => setIsOpen(true)}>
      <Plus className="w-4 h-4" /> Generate Payslip
    </button>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    }
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" >
<div className="card max-w-lg p-6 w-full animate-slide-up">
<div className="flex justify-between">
  <h3 className="text-lg font-bold text-slate-900"> Generate monthly payslip</h3>
  <button className="text-slate-400 hover:text-slate-600 p-1" onClick={() => setIsOpen(false)}>
    <X className="w-4 h-4" size={20} />
  </button>
</div>
<form action="" className="space-y-4" onsubmit={handleSubmit}>
{/* Select employee */}
<div >

  <label 
 className="block text-sm font-medium text-slate-700 mb-2">Employee</label>

 <select name="employeeId" id="" required>

  {
    employee.map(
      (e) => (
        <option key={e.id} value={e.id}>{e.firstName} {e.lastName} ({e.position})</option>
      )
    )
  }
 </select>
</div>
{/* select month and year */}

<div className="grid grid-cols-2 gap-4">
<div className="">
  
  <label 
 className="block text-sm font-medium text-slate-700 mb-2">Month</label>
 <select name="month"  className="">
{Array.from({length: 12}, (_, i) => i + 1).map(
  (m) => (

    <option key={m} value={m}>
      {m}
    </option>

  )
) }

 </select>
</div>




<div className="">
  
  <label 
 className="block text-sm font-medium text-slate-700 mb-2">Year</label>
 <input type="number" name='year' defaultValue={new Date().getFullYear()} className="" />

</div>


</div>
{/* Basic salary */}

<div className="">
  
  <label 
 className="block text-sm font-medium text-slate-700 mb-2">Basic Salary</label>
 <input type="number" name='basicSalary' required placeholder='5000' className="" />

</div>
{/* Allowances and sdeductions */}
<div className="grid grid-cols-2 gap-4">
  <div className="">
  
  <label 
 className="block text-sm font-medium text-slate-700 mb-2">Allowances</label>
 <input type="number" name='allowances' defaultValue={0} placeholder='5000' className="" />

</div>

  <div className="">
  
  <label 
 className="block text-sm font-medium text-slate-700 mb-2">Deductions</label>
 <input type="number" name='deductions' defaultValue={0} className="" />

</div>
</div>
{/* buttons */}


<div className="flex justify-end gap-3 pt-2">

<button className="btn-secondary" type="button"  onClick={() => setIsOpen(false)}>
  Cancel
</button>
<button className="btn-primary flex items-center" type="submit"   disabled={loading} >
  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : null}
  Generate
</button>

</div>

</form>
</div>

    </div>
  )
}

export default GeneratePayslipForm