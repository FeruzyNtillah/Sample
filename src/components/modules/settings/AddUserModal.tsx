"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useCreateUser, useRoles } from '@/hooks/useSettings'

const createUserSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  role: z.string().min(1, "Role required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine(
  data => data.password === data.confirmPassword,
  { message: "Passwords do not match", path: ["confirmPassword"] }
)

type CreateUserFormData = z.infer<typeof createUserSchema>

interface AddUserModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AddUserModal({ isOpen, onClose, onSuccess }: AddUserModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  
  const { mutate: createUser, isPending } = useCreateUser()
  const { data: rolesData } = useRoles()
  
  const roles = rolesData || ["admin", "viewer", "supplier"]
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      email: '',
      role: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = (data: CreateUserFormData) => {
    createUser(data, {
      onSuccess: () => {
        reset()
        onSuccess()
        onClose()
      },
      onError: (error: unknown) => {
        if (error && typeof error === 'object' && 'response' in error) {
          const errorResponse = error as { response?: { data?: { errors?: Record<string, string> } } }
          if (errorResponse.response?.data?.errors) {
            Object.entries(errorResponse.response.data.errors).forEach(([field, message]) => {
              setError(field as keyof CreateUserFormData, { message: message as string })
            })
          }
        }
      }
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-100 flex items-center justify-center">
      <div className="bg-[#161b22] border border-[#21262d] rounded-2xl p-8 w-[480px] max-w-[90vw]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-semibold text-lg">Add User</h2>
          <button
            onClick={onClose}
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="h-px bg-[#21262d] mb-6"></div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Name
            </label>
            <input
              {...register('name')}
              type="text"
              placeholder="Full name"
              className="w-full px-3 py-2 bg-[#0d1117] border border-[#374151] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                {...register('email')}
                type="email"
                placeholder="email@example.com"
                className="w-full pl-10 pr-3 py-2 bg-[#0d1117] border border-[#374151] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Role Field */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Role
            </label>
            <select
              {...register('role')}
              className="w-full px-3 py-2 bg-[#0d1117] border border-[#374151] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="">Select a role</option>
              {roles.map((role: string) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full pl-10 pr-10 py-2 bg-[#0d1117] border border-[#374151] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                title="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                {...register('confirmPassword')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                className="w-full pl-10 pr-3 py-2 bg-[#0d1117] border border-[#374151] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-[#374151] text-white rounded-lg hover:bg-[#161b22] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isPending && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
