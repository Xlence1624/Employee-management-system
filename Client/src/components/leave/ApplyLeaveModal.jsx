import { CalendarDays, FileText, Loader2, SendIcon, X } from "lucide-react";
import React from "react";
import { useState } from "react";

const ApplyLeaveModal = ({ open, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm "
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
       
        <div className="flex flex-col items-center justify-between p-6 pb-0">
           {/* Header */}
          <div className="flex justify-between items-center w-full mb-4">

            <div >
<h2 className="text-lg font-semibold text-slate-800">
              Apply for Leave
            </h2>
            <p className="text-slate-400 text-sm mt-0.5">
              Submit your leave request for approval.
            </p>
            </div>
            
            <button
              className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form action="" className="p-6 space-y-5 w-full">
            {/* Leave type */}
            <div className="">
              <label
                htmlFor=""
                className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2"
              >
                <FileText className="w-4 h-4 text-slate-400" />
                Leave Type
              </label>
              <select name="type" required className="">
                <option value="SICK" className="">
                  {" "}
                  Sick Leave
                </option>
                <option value="CASUAL" className="">
                  {" "}
                  Casual Leave
                </option>
                <option value="MATERIALIZED" className="">
                  {" "}
                  Maternity Leave
                </option>
                <option value="ANNUAL" className="">
                  {" "}
                  Annual Leave
                </option>
              </select>
            </div>

            {/* duration */}
            <div className="">
              <label
                htmlFor=""
                className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2"
              >
                <CalendarDays className="w-4 h-4 text-slate-400" />
                Leave Duration
              </label>

              <div className="grid grid-cols-2 gap-4">
                <div className="">
                  <span className="block text-xs text-slate-400 mb-1">
                    From
                  </span>
                  <input
                    type="date"
                    name="startDate"
                    min={minDate}
                    className=""
                  />
                </div>

                <div>
                  <span className="block text-xs text-slate-400 mb-1">To</span>
                  <input
                    type="date"
                    name="endDate"
                    min={minDate}
                    className=""
                  />
                </div>
              </div>
            </div>
            {/* reason */}

            <div className="">
                    <label
                htmlFor=""
                className=" text-sm font-medium text-slate-700 mb-2 block"
              >
            
                Leave Reason
              </label>
<textarea name="reason"required rows={3} id="" className="resize-none" placeholder="please briefly describe why you need this leave"></textarea>
            </div>

            {/* buttons */}
<div className="flex gap-3 pt-2">
    <button type="button" className="btn-secondary flex-1" onclick={onClose}>
      Cancel
    </button>

      <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2" disabled={loading} >
    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <SendIcon className="w-4 h-4"/>}
    {loading ? "Submitting..." : "Submit "}
    </button>
</div>
        
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyLeaveModal;
