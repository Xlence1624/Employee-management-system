import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { dummyProfileData } from '../assets/assets'
import { MenuIcon, UserIcon } from 'lucide-react'

const Sidebar = () => {
const {pathname} = useLocation()
const [userName, setUserName] = useState("")
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

useEffect(() => {
setUserName(dummyProfileData.firstName + " " + dummyProfileData.lastName)


}, [])

//close mobile  sidebar on route change
useEffect(() => {
setUserName(dummyProfileData.firstName + " " + dummyProfileData.lastName)


}, [pathname])

//close mobile sidebar on route change
useEffect(() => {
setMobileMenuOpen(false)}, [pathname])

const sideBarContent = (
  <> 
  {/* Brand Header */}
  <div className='px-5 pt-6 pb-5 border-b border-white/6'>

  <div className='flex items-center justify-between'>
<div className='flex items-center gap-3'>
<UserIcon className='text-white size-7 '/>
</div>
<div>
  <p className='font-semibold text-[13px] text-white tracking-wide'> Employee MS</p>
  <p className='text-[11px] text-slate-500 font-medium'>Management system</p>
</div>
  </div>

  </div>

  {/* User profile card */}
 {/* Section label */}
  {/* navigation */}
  {/* logout */}
  
  
   </>
)
return (
 <> 
 {/* Mobile hamburger button */}
 <button className='lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg border border-white/10' onClick={() => setMobileMenuOpen(true)}>
  <MenuIcon  size={20} />
 </button>

 {/* Mobile Overlay */}
 {


  mobileMenuOpen && <div className='lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40' onClick={() => setMobileMenuOpen(false)}></div>
 }
 


 {/* sidebar desktop */}

<aside className=  {`lg:hidden fixed inset-y-0 left-0 w-72 bg-inear-to-b from-slate-900 via slate-900 to-slate-950 text-white z-50 flex flex-col transform transition-transform duration-300 $ {mobileMenuOpen ? 'translate-x-0' : '-translate-x-full' }`}>{sideBarContent}</aside>
 </>
)
}
export default Sidebar