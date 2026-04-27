import React from 'react'

const EmployeeCard = ({employee, onDelete, onEdit}) => {
  return (
    <div className='group relative card card-hover overflow-hidden'> 
<div >

</div>

<div className='p-5'>
  <h3>{employee.firstName}  {employee.lastName}</h3>
  <p className='text-xs text-slate-500'></p>
  </div>
      
  </div>
  )
}

export default EmployeeCard