import React, { useEffect } from "react";
import { href, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { dummyProfileData } from "../assets/assets";
import {
  CalendarIcon,
  ChevronRightIcon,
  DollarSignIcon,
  FileTextIcon,
  LayoutGridIcon,
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
  UserIcon,
  XIcon,
} from "lucide-react";

const Sidebar = () => {
  const { pathname } = useLocation();
  const [userName, setUserName] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(true);

  useEffect(() => {
    setUserName(dummyProfileData.firstName + " " + dummyProfileData.lastName);
  }, []);

  //close mobile  sidebar on route change
  useEffect(() => {
    setUserName(dummyProfileData.firstName + " " + dummyProfileData.lastName);
  }, [pathname]);

  //close mobile sidebar on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const role = "ADMIN" || "Employee";

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutGridIcon,
    },

    role === "ADMIN"
      ? {
          name: "Employees",
          href: "/employees",
          icon: UserIcon,
        }
      : {
          name: "Attendance",
          href: "/attendance",
          icon: CalendarIcon,
        },
    {
      name: "Leave",
      href: "/leave",
      icon: FileTextIcon,
    },

    {
      name: "Payslips",
      href: "/payslips",
      icon: DollarSignIcon,
    },

    {
      name: "Settings",
      href: "/settings",
      icon: SettingsIcon,
    },
  ];

    const handleLogout = () => {
      window.location.href = "/login";
    }
  const sideBarContent = (
    <>
      {/* Brand Header */}
      <div className="px-5 pt-6 pb-5 border-b border-white/6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserIcon className="text-white size-7 " />

            <div>
              <p className="font-semibold text-[13px] text-white tracking-wide">
                {" "}
                Employee MS
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                Management system
              </p>
            </div>
          </div>
          {/* Close menu on mobile */}
          <button
            className="lg:hidden text-slate-400 hover:text-white p-1"
            onClick={() => setMobileMenuOpen(false)}
          >
            <XIcon size={20} />
          </button>
        </div>
      </div>

      {/* User profile card */}
      {userName && (
        <div className="mx-3 mt-4 mb-1 p-3 rounded-lg bg-white/3 border border-white/4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center ring-white/10 shrink-0">
              <span className="text-slate-400 text-xs font-semibold">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>

            <div className="min-w-0">
              <p className="text-[13px] font-medium text-slate-200 truncate">
                {userName}
              </p>
              <p className="text-[11px] text-slate-500">
                {role === "ADMIN" ? "Administrator" : "Employee"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Section label */}

      <div className="px-5 pt-5 pb-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
          Navigation
        </p>
      </div>
      {/* navigation */}

      <div className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map((options) => {
          const isActive = pathname.startsWith(options.href);
          return (
            <Link key={options.name} to={options.href} className={`group flex items-center gap-3 py-2.5 rounded-md text-[13px] font-medium transition-all duration-150 relative ${isActive ? "bg-indigo-500/12 text-indigo-300" : " text-slate-300 hover:text-white hover:bg-white/4"}`}>

              {/* The line that indicates active route */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-full rounded-r-full bg-indigo-400 "></div>
              )}
              <options.icon
                className={`w-[17px] h-[17px] shrink-0 ml-2 ${isActive ? "text-indigo-300" : "text-slate-400 group-hover:text-slate-300"}`}
              />
              <span className="flex-1">{options.name}</span>
              {isActive && <ChevronRightIcon className="w-3.5 h-3.5 text-indigo-500/50"/>}
            </Link>
          );
        })}
      </div>
      {/* logout */}

<div className="p-3 border-t border-white/6">
<button className="flex items-center gap-3 w-full px-3 p-2.5 rounded-md text-[13px] font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/8 transition-all duration-150" onClick={handleLogout}>
  <LogOutIcon className="w-[17px]  h-[17px]"/>
  <span>Logout</span>
</button>
</div>

    </>
  );
  return (
    <>
      {/* Mobile hamburger button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg border border-white/10"
        onClick={() => setMobileMenuOpen(true)}
      >
        <MenuIcon size={20} />
      </button>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* sidebar desktop */}

      <aside className="hidden lg:flex flex-col h-full w-65 bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white shrink-0 border-r border-white/4">
        {sideBarContent}
      </aside>

      {/* sidebar mobile */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white z-50 flex flex-col transform transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {sideBarContent}
      </aside>
    </>
  );
};
export default Sidebar;
