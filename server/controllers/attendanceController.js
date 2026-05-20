//clock in and out for employee
// POST /api/attendance
export const clockInOut = async (req, res)=> {
try {
  const session = req.session;
  const employee = await Employee.findOne({userId: session.userId})
  if (!employee) return res.status(404).json({error: "Employee not found"});
  if (employee.isDeleted){
    return res.status(403).json({error: "Your account is deactivated. You cannot clock in/out"})
  }
  const today = new Date();
  today.setHours(0,0,0,0);
  const existing = await getAttendance.findOne({employeeId: employee._id,
    date: today,
  })
  const now = new Date();
  if (!existing) {
    const isLate = now.getHours() >= 9 && now.getMinutes() > 0;
    const attendance = await Attendance.create({
      employeeId: employee._id,
      date: today,
      checkIn: now,
      status: isLate ? "LATE" : "PRESENT"
    })
    return res.json({success: true, type: "CHECK_IN", 
      data: attendance
    })
  } else if(!existing.clockInOut){
    const checkInTime = new Date(existing.checkIn).getTime()
    const diffMs = now.getTime() - checkInTime;
  }
} catch (error)
 {
  
}
}


//get attendance for employee
// GET /api/attendance
export const getAttendance = async (req, res)=> {
  
}