import React from 'react'
import { useState } from 'react';
import {dummyProfileData} from "../assets/assets"
import { useEffect } from 'react';
import Loading from '../components/Loading';
import { Lock } from 'lucide-react';
import ProfileForm from '../components/ProfileForm';
import ChangePasswordModal from '../components/ChangePasswordModal';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const Settings = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const {user} = useAuth();
  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile");
      const profile = res.data;
      if(profile) setProfile(profile);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  }

  useEffect(
    ()=>{
      fetchProfile()
    }, [user]
  )
  if(loading) return <Loading/>
  return (
    <div className="animate-fade-in">
<div className="page-header">
<h1 className="page-title">Settings</h1>
<p className="page-subtitle">Manage your account and preferences</p>
</div>

{
  profile && <ProfileForm  initialData={profile} onSubmit={fetchProfile}/>


}
  {/* // change password terigger */}
  <div className="card max-w-md p-6 flex items-center justify-between">

    <div className="flex items-center gap-3">
      <div className="p-2.5 bg-slate-100 rounded-lg">
<Lock className="w-5 h-5 text-slate-600" />


      </div>
      <div className="">

        <p className="font-medium text-slate-900">Password</p>
        <p className="text-sm text-slate-500">Update your account password</p>
      </div>

    </div>
    <button className="btn-secondary text-sm" onClick={() => setShowPassword(true)}  >
Change
    </button>
  </div>

  <ChangePasswordModal open={showPassword} onClose={() => setShowPassword(false)}/>
    </div>
  )
}

export default Settings