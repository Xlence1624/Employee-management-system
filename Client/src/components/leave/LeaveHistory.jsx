import { Check, Loader2 } from 'lucide-react';
import React from 'react'
import {useState} from "react";
import { format } from 'date-fns';
import { X } from 'lucide-react';

const LeaveHistory = ({leaves, isAdmin, onUpdate}) => {
  const [processing, setProcessing] = useState(null)
  const handleStatusUpdate = async (id, status) => {
    setProcessing(id)
  }

  return (
       <div className="card overflow-hidden">
       
         <div className="overflow-x-auto">
           <table className="table-modern">
             <thead>
               <tr>

                {
                  isAdmin && <th className="px-6 py-4">Employee</th>
                }
                 <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Dates</th>
                   <th className="px-6 py-4">Reason</th>
                    <th className="px-6 py-4">Status</th>
                 {
                  isAdmin && <th className="text-center">Actions</th>
                }
               </tr>
             </thead>
   
             <tbody>
               {leaves.length === 0 ? (
                 <tr>
                   <td className="text-center py-12 text-slate-400" colSpan={isAdmin ? 6 : 4}>
                     No leave recordsfound.
                   </td>
                 </tr>
               ) : (
                 leaves.map((leave) => {
                
                   return (
                  <tr key={leave._id || leave.id}>
                    {isAdmin && (   <td className=" text-slate-900">{leave.employee?.firstName}
                        {leave.employee?.lastName}
                       </td>)}
                    
                      <td className="">
                        <span className="badge bg-slate-100 text-slate-600">{leave.type}</span>
                      </td>
   
                      <td className="text-xs text-slate-500">{format(new Date(leave.startDate), "MMM dd ") } -  {format(new Date(leave.endDate), "MMM dd, yyyy ") }</td>
   
                          <td className="max-w-xs truncate text-slate-500" title={leave.reason}>
                         {leave.reason}
                          </td>
   
   
                            <td>
                     <span className={`badge ${leave.status === 'APPROVED' ? 'badge-success' : leave.status === "REJECTED" ? "badge-danger" : 'badge-warning'}`}>
                      {leave.status}
                     </span>
                          </td>


                          {
                            isAdmin && (  
                             <td className=" ">
                        {leave.status === "PENDING" && (
                          <div className=" flex justify-center gap-2">
<button className="p-1.5 rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors" onClick
={() => handleStatusUpdate(leave._id || leave.id, "APPROVED")}  disabled={!!processing }>
  {processing === (leave._id || leave.id) ? <Loader2 className="animate-spin w-4 h-4" /> : <Check className='w-4 h-4'/>}
</button>

<button className="p-1.5 rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors" onClick={() => handleStatusUpdate(leave._id || leave.id, "REJECTED")} disabled={!!processing }>
  {processing === (leave._id || leave.id) ? <Loader2 className="animate-spin w-4 h-4" /> : < X className='w-4 h-4'/>}
</button>
                          </div>
                        ) }
                          </td>)
                          }
   
                           
                     </tr>
                   )
                 })
               )}
             </tbody>
           </table>
         </div>
       </div>
  )
}

export default LeaveHistory