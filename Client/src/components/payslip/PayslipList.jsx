import { Download } from 'lucide-react'
import React from 'react'
import { format } from 'date-fns';

const PayslipList = ({payslips, isAdmin}) => {
  return (
    <div className="card overflow-hidden">
       
         <div className="overflow-x-auto">
           <table className="table-modern">
             <thead>
               <tr>

                {
                  isAdmin && <th className="px-6 py-4">Employee</th>
                }
                 <th className="px-6 py-4">Period</th>
                  <th className="px-6 py-4">Basic Salary</th>
                   <th className="px-6 py-4">Net Salary</th>
                    <th className="text-center">Actions</th>
               
               </tr>
             </thead>
   
             <tbody>
               {payslips.length === 0 ? (
                 <tr>
                   <td className="text-center py-12 text-slate-400" colSpan={isAdmin ? 5 : 4}>
                     No payslipsfound.
                   </td>
                 </tr>
               ) : (
                 payslips.map((payslip) => {
                
                   return (
                  <tr key={payslip._id || payslip.id}>
                    {isAdmin && (   <td className=" text-slate-900">{payslip.employee?.firstName}  {payslip.employee?.lastName}
                       </td>)}
                    
                      <td className="text-slate-500">
                        {format(new Date(payslip.year, payslip.month - 1), "MMM yyyy") }
                      </td>
   
                      <td className=" text-slate-500">
                        ${payslip.basicSalary.toLocaleString()}
                       </td>


                        <td className=" text-slate-800 font-medium">
                        ${payslip.netSalary.toLocaleString()}
                       </td>
   
                          <td className="text-center" >
                         <button className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded text-blue-600 bg-blue-100 transition-colors ring-1 ring-blue-600/10 " onClick={() => window.open(`/print/payslips/${payslip._id || payslip.id}`)}>
                          <Download className="w-3 h-3 mr-1.5" />
                          Download
                         </button>
                          </td>
   
   
                      


                      
   
                           
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

export default PayslipList