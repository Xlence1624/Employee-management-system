import React from 'react'
import { dummyLeaveData } from '../assets/assets'
import { useState, useEffect, useCallback } from 'react'
import Loading from '../components/Loading'

import { PlusIcon, PalmtreeIcon, ThermometerIcon, UmbrellaIcon  } from 'lucide-react'

const Leave = () => {
  const [leaves, setLeaves] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const isAdmin  = false

  const fetchLeaves = useCallback(
    () => {
      setLeaves(dummyLeaveData)
      setTimeout(
        () => {
          setLoading(false);
        }
      ,1000)
    }, []
  )

  useEffect(
    () => {
      fetchLeaves()
    }, [fetchLeaves]
  )
  if(loading) return <Loading/>

  const approvedLeaves = leaves.filter((l) => l.status === "APPROVED")
  const sickCount = approvedLeaves.filter((l) => l.type === "SICK").length
  const casualCount = approvedLeaves.filter((l) => l.type === "CASUAL").length
  const annualCount = approvedLeaves.filter((l) => l.type === "ANNUAL").length  

  const leaveStats = [

    {label: 'sick Leave', value: sickCount, icon  : ThermometerIcon},
    {label: 'Casual Leave', value: casualCount, icon  : UmbrellaIcon},
    {label: 'Annual Leave', value: annualCount, icon  : PalmtreeIcon},
  ]

  return (
    <div className="animate-fade-in">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
<div className="">
  <h1 className="">Leave Management</h1>
  <p className="">{isAdmin? "Manage leaves applications" : "Your leave history and requests"}</p>
</div>

{!isAdmin && !isDeleted && (
  <button className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center" onClick={() => setShowModal(true)}>
    <PlusIcon className="w-4 h-4" />
    Apply for Leave
  </button>
)}
      </div>

{
  !isAdmin && (
    <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-5 gap-4 mb-8">
 {
  leaveStats.map(
    (s) => (
     
  <div className="card card-hover p-5 sm:p-6 flex items-center gap-4 relative overflow-hidden group" key={s.label}>
<div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-500/70 group-hover:bg-indigo-500/70"/>
<div className="p-3 bg-slate-100 rounded-lg group-hover:bg-indigo-50 transition-colors duration-200">
<s.icon className = "w=5 h-5 text-slate-600 group-hover:text-indigo-600 transition-colors duration-200"/>
</div>
<div>
  <p className="text-sm text-slate-500">{s.label}</p>
  <p className="text-2xl font-bold text-slate-900">{s.value} <span className="text-sm font-normal text-slate-400">taken</span></p>
</div>

      </div>


     
    

    )
  )}
    </div>)
 }
  
  



    </div>
  )
}

export default Leave