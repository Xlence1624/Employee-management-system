import { Loader2Icon, Lock, LockIcon } from 'lucide-react'
import React, { useState } from 'react'
import api from '../api/axios'

const ChangePasswordModal = ({open, onClose}) => {

  const [loading, setLoading] = useState(false)
  const [message, setmessage] = useState({type: "", text: ""})
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setmessage({type: "", text: ""})
    const formData = new FormData(e.currentTarget);
  const currentPassword = formData.get("currentPassword");
  const newPassword = formData.get("newPassword");

  try{
const {data} = await api.post("/auth/change-password", {currentPassword, newPassword});
 
if(!data.success) throw new Error(data.error || "Failed to change password");

setmessage({type: "success", text:  "Password changed successfully"});

e.target.reset();
  } catch(error){
setmessage({type: "error", text: error.response?.data?.message || error.message || "Failed to change password"})
  }finally{
setLoading(false);
  }}

  if(!open) return null;
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4' onClick={onClose}>
      <div className='absolute inset-0 bg-black/40 backdrop-blur-sm'/>
      <div className='relative  bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in' onClick={(e) => e.stopPropagation()}>
<div className="flex items-center justify-between p-6 pb-0 ">
  <h2 className="text-lg font-medium text-slate-900 flex items-center gap-2"><LockIcon className='w-4 h-4 text-slate-400'/> Change password</h2>
  <button className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-400 hover:slate-600" onClick={onClose}>Change</button>
</div>

<form action="" className='p-6 space-y-5' onSubmit={handleSubmit}>
{
  message.text && (
    <div className={`p-3 rounded-xl text-sm flex items-start gap-3 ${message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"}`}>
      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${message.type === "success" ? "bg-emerald-500" : "bg-rose-500"}`}/>
      {message.text}
    </div>
  )
}

<div className="">
  <label htmlFor="" className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
  <input type="password" name='currentPassword' required />
  
</div>
<div className="">
  <label htmlFor="" className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
  <input type="password" name='newPassword' required />
  
</div>

<div className=" flex gap-3 pt-2">
  <button type='button' onClick={onClose} className='btn-secondary flex-1'> Cancel</button>
    <button type='submit' disabled={loading} className='btn-primary flex-1 flex justify-center items-center gap-2'> 
      {loading && <Loader2Icon className='w-4 h-4 animate-spin'/>}
      Update Password</button>
</div>
</form>
      </div>
    
    
    
    </div>
  )
}

export default ChangePasswordModal