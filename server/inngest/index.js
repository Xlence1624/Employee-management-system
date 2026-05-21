import { Inngest } from "inngest";
import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";
import leaveApplication from "../models/LeaveApplication.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "EMS" });

//Auto check out for employee
const autoCheckOut = inngest.createFunction(
  { id: "auto-check-out" },
  {event: "employee/check-out"},
  async ({ event, step }) => {
   const {employeeId, attendanceId} = event.data;

   //wait for 9hrs (don't know why it should take this long for a function to work😒)
   await step.sleepUntil("wait-for-the-9-hours", new Date(new Date().getTime() + 9 * 60 * 60 * 1000))

   // get Attendance
   let attendance = await Attendance.findById(attendanceId)
   if(!attendance?.checkOut){
    //Get employee data
    const employee = await Employee.findById(employeeId)

    //send reminder email

    //After 10 hrs, mark attendance as checkOut with status "LATE"
    await step.sleepUntil("wait for one hour", new Date(new Date().getTime() + 1 * 60 * 60 * 1000))

    attendance = await Attendance.findById(attendanceId)
    if (!attendance?.checkOut){
      attendance.checkOut = new Date(attendance.checkIn).getTime() + 4 * 60 * 60 * 1000;
      attendance.workingHours = 4;
      attendance.dayType = "Half Day";
      attendance.status = "LATE";
      await attendance.save();


    }
   }
  },
);



//Send email to admin if admin does not take action on leave application within 24hrs

const leaveApplicationReminder = inngest.createFunction(
  { id: "auto-check-out" },
  {event: "leave/pending"},
  async () => {
const {leaveApplicationId} = event.data;
// wait for 24hrs

await step.sleepUntil("wait for 24hrs", new Date(new Date().getTime() + 24 * 60 * 60 * 1000))

const leaveApplication = await leaveApplication.findById(leaveApplicationId)

if(leaveApplication?.status === "PENDING"){
  const employee = await Employee.findById(leaveApplication.employeeId)

  //send reminder email to admin to take action on leave application
}
  }
 
);

//cron: Check attendance at 11:30 AM IST (06:00 UTC) and email absent employees
const attendanceReminderCron = inngest.createFunction(
  { id: "attendance-reminder-cron" },
  {cron: "0 0 6 * * *"},) // 06:00 UTC = 11:30 AM IST
  async ({step} ) => {
    const today = await step.run("get-today-date")
    const startUTC = new Date(new Date().toLocaleDateString("en-CA", {timeZone: "Asia/Kolkata"}) + "T00:00:00 +05:30");
    const endUTC = new Date(startUTC.getTime() + 24 * 60 * 60 * 1000);
    return {startUTC: startUTC.toISOString(), endUTC: endUTC.toISOString()}

    //step 2: get all active , non-deleted employees
    const activeEmployees = await step.run("get-active-employees", async () => {
      const employees = await Employee.find({isDeleted: false,
        employmentStatus: "ACTIVE",
      }).lean();
      return employees.map(
        (e) => ({_id: e._id.toString(), firstName: e.firstName, lastName: e.lastName, department: e.department})
      )
    })

    //step 3 get employees Ids on Approved leave today
    const onLeaveIds = await step.run("get-on-leave-ids", async () => {
      const leaves = await leaveApplication.find({
        status: "APPROVED",
        startDate: {$lte: new Date(today.endUTC)},
        endDate: {$gte: new Date(today.endUTC)}
      }).lean();
      return leaves.map(
        (l)= l.employeeId.toString()
      )
    })


    //step 4: Get employee Id who already checked in today
    const checkedInIds = await step.run("get-checked-in-ids", ()=> {
      const attendances = await Attendance.find({
          startDate: {$lte: new Date(today.endUTC)},
        endDate: {$gte: new Date(today.endUTC)}
      
      }).lean();
      return attendances.map(
        (a)=> a.employeeId.toString()
      )
    })

  }

export const functions = [autoCheckOut , leaveApplicationReminder, attendanceReminderCron];