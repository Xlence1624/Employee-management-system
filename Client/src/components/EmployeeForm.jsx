import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EmployeeForm = ({initialData, onSuccess, onCancel}) => {
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)
  const isEditMode = !!initialData;
  const handleSubmit = async (e) => {
    e.preventDefault()
  }
  return (
   <form action="" className='space-y-6 max-w-3xl animate-fade-in'>
    {/* personal information */}
    <div className='card p-5 sm:p-6'>
<h3 className='font-medium mb-6 pb-4 border-b border-slate-100'>Personal Information</h3>
<div className='grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700'>
<div>
  <label htmlFor="" className='block mb-2'>First Name</label>
 <input name='firstName' required defaultValue={initialData?.firstName} />
</div>

<div>
  <label htmlFor="" className='block mb-2'>Last Name</label>
 <input name='lastName' required defaultValue={initialData?.lastName} />
</div>


<div>
  <label htmlFor="" className='block mb-2'>Phone Number</label>
 <input name='phone' required defaultValue={initialData?.phone} />
</div>

<div>
  <label htmlFor="" className='block mb-2'>Join Date</label>
 <input type='date' name='joinDate' required defaultValue={initialData?.joinDate ? new Date(initialData.joinDate).toISOString().split("T")[0] :  ""  } />
</div>

<div className='sm-col-span-2'>
  <label htmlFor="" className='block mb-2'>Bio (optional)</label>
 <textarea name='bio' required defaultValue={initialData?.bio}  rows={3} className='resize-none' placeholder='Brief description...'/>
</div>
</div>
    </div>
   
   </form>
  )
}

export default EmployeeForm