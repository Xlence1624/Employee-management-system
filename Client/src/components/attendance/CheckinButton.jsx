import React from 'react'
import { useState } from 'react'

const CheckinButton = ({todayRecord, onAction}) => {
  const [Loading, setLoading] = useState(false);
  const handleAttendance = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
      onAction();
    }, 1000)
  }
  if (todayRecord?.checkedOut){
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-slate rounded-2xl border border-slate-200">
      <h3 className="text-slate-500btext-sm mt-1">Work day completed</h3>
      <p>Great Job! See you tomorrow</p>
      </div>
    )
  }

  const isCheckedIn = !!todayRecord?.checkedIn;
  return (
    <div>CheckinButton</div>
  )
}

export default CheckinButton