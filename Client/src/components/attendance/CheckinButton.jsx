import { LogInIcon, LogOutIcon } from "lucide-react";
import React from "react";
import { useState } from "react";

const CheckinButton = ({ todayRecord, onAction }) => {
  const [Loading, setLoading] = useState(false);
  const handleAttendance = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAction();
    }, 1000);
  };
  if (todayRecord?.checkedOut) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-slate rounded-2xl border border-slate-200">
        <h3 className="text-slate-500btext-sm mt-1">Work day completed</h3>
        <p>Great Job! See you tomorrow</p>
      </div>
    );
  }

  const isCheckedIn = !!todayRecord?.checkedIn;
  return (
    <div className="absolute bottom-4 right-4 flex flex-col z-1">
      <button
        className={`w-full max-w-xs flex justify-between items-center gap-8 p-4 rounded-xl bg-linear-to-br text-white ${isCheckedIn ? "from-slate-700 to-slate-900" : "from-indigo-600 to-indigo-700"} shadow-lg hover:shadow-xl transition-shadow duration-300`}
        onClick={handleAttendance}
        disabled={Loading}
      >
        {Loading ? (
          <Loader2Icon className="animate-spin size-7" />
        ) : isCheckedIn ? (
          <LogOutIcon className="size-7" />
        ) : (
          <LogInIcon className="size-7" />
        )}

        <div className="relative flex flex-col items-center text-center">
          <h2 className="text-lg font-medium mb-1">
            {Loading ? "Processing..." : isCheckedIn ? "Clock Out" : "Clock In"}
          </h2>
          <p className="text-xs opacity-80">
            {isCheckedIn ? "Click to start your shift" : "Start your work shift"}
          </p>
        </div>
      </button>
    </div>
  );
};

export default CheckinButton;
