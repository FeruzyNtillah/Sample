"use client"

import React, { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { User, Lock, Eye, EyeOff } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { getInitials, checkPasswordStrength, getPasswordStrengthProps } from '@/lib/helpers'

// Mock user data
const mockUser = {
  id: '1',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
  status: 'active'
}

// Profile update schema
const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Valid email required")
})

// Password change schema
const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine(
  data => data.newPassword === data.confirmPassword,
  { message: "Passwords do not match", path: ["confirmPassword"] }
)

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>
type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

export default function ProfilePage() {
  const user = mockUser
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  // Profile update form
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors }
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || ''
    }
  })

  // Password change form
  const passwordForm = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
    control
  } = passwordForm

  const newPassword = useWatch({ control, name: 'newPassword' })
  const passwordStrength = newPassword ? checkPasswordStrength(newPassword) : null
  const passwordStrengthProps = passwordStrength ? getPasswordStrengthProps(passwordStrength) : null


  const onProfileSubmit = () => {
    setIsUpdating(true)
    setTimeout(() => {
      setIsUpdating(false)
      alert('Profile updated (mock)')
    }, 1500)
  }

  const onPasswordSubmit = () => {
    setIsUpdating(true)
    setTimeout(() => {
      setIsUpdating(false)
      resetPassword()
      alert('Password changed (mock)')
    }, 1500)
  }

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-[#052e16] text-[#22c55e] border-[#166534]'
      case 'viewer':
        return 'bg-[#1e3a5f] text-[#3b82f6] border-[#1e40af]'
      case 'supplier':
        return 'bg-[#451a03] text-[#f97316] border-[#c2410c]'
      default:
        return 'bg-gray-600 text-gray-300 border-gray-500'
    }
  }


  return (
    <div className="space-y-6">
      <PageHeader
        icon={<User className="w-4 h-4 text-cyan-400" />}
        title="Profile"
        subtitle="Manage your account details"
      />

      {/* Profile Overview Card */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Avatar */}
          <div className="shrink-0">
            <div className="w-20 h-20 bg-[#1e3a5f] rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {getInitials(user.name)}
              </span>
            </div>
          </div>

          {/* User Details */}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-1">{user.name}</h2>
            <p className="text-sm text-gray-400 mb-3">{user.email}</p>
            
            <div className="flex flex-wrap items-center gap-3">
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs border ${getRoleBadgeClass(user.role)}`}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
              
              <span className="text-sm text-gray-400">
                Member since {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Card */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Edit Profile</h3>
        <div className="h-px bg-[#21262d] mb-6"></div>
        
        <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Name
            </label>
            <input
              {...registerProfile('name')}
              type="text"
              className="w-full px-3 py-2 bg-[#0d1117] border border-[#374151] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            {profileErrors.name && (
              <p className="text-red-500 text-xs mt-1">{profileErrors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Email
            </label>
            <input
              {...registerProfile('email')}
              type="email"
              className="w-full px-3 py-2 bg-[#0d1117] border border-[#374151] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            {profileErrors.email && (
              <p className="text-red-500 text-xs mt-1">{profileErrors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isUpdating && <LoadingSpinner size="sm" />}
            Save Changes
          </button>
        </form>
      </div>

      {/* Change Password Card */}
      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Change Password</h3>
        <div className="h-px bg-[#21262d] mb-6"></div>
        
        <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Current Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                {...registerPassword('currentPassword')}
                type={showCurrentPassword ? 'text' : 'password'}
                className="w-full pl-10 pr-10 py-2 bg-[#0d1117] border border-[#374151] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {passwordErrors.currentPassword && (
              <p className="text-red-500 text-xs mt-1">{passwordErrors.currentPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                {...registerPassword('newPassword')}
                type={showNewPassword ? 'text' : 'password'}
                className="w-full pl-10 pr-10 py-2 bg-[#0d1117] border border-[#374151] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {newPassword && passwordStrengthProps && (
              <div className="mt-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div className={`h-2 rounded-full transition-all duration-300 ${passwordStrengthProps.color} ${passwordStrengthProps.width}`}></div>
                  </div>
                  <span className={`text-xs font-medium ${passwordStrengthProps.textColor}`}>
                    {passwordStrength ? passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1) : ''}
                  </span>
                </div>
              </div>
            )}
            
            {passwordErrors.newPassword && (
              <p className="text-red-500 text-xs mt-1">{passwordErrors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                {...registerPassword('confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                className="w-full pl-10 pr-10 py-2 bg-[#0d1117] border border-[#374151] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {passwordErrors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{passwordErrors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isUpdating && <LoadingSpinner size="sm" />}
            Update Password
          </button>
        </form>
      </div>
    </div>
  )
}
