"use client"

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Mail } from 'lucide-react'
import { useUpdateUser, useRoles } from '@/hooks/useSettings'

const editUserSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  role: z.string().min(1, "Role required")
})

type EditUserFormData = z.infer<typeof editUserSchema>

interface User {
  id: string
  name: string
  email: string
  role: string
  status?: string
  createdAt?: string
  updatedAt?: string
}

interface EditUserModalProps {
  isOpen: boolean
  onClose: () => void
  user: User | null
  onSuccess: () => void
}

export function EditUserModal({ isOpen, onClose, user, onSuccess }: EditUserModalProps) {
  const { mutate: updateUser, isPending } = useUpdateUser()
  const { data: rolesData } = useRoles()
  
  const roles = rolesData || ["admin", "viewer", "supplier"]
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError
  } = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: '',
      email: '',
      role: ''
    }
  })

  // Pre-fill form when user data changes
  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        role: user.role
      })
    }
  }, [user, reset])

  const onSubmit = (data: EditUserFormData) => {
    if (!user) return
    
    updateUser({ id: user.id, data }, {
      onSuccess: () => {
        onSuccess()
        onClose()
      },
      onError: (error: unknown) => {
        if (error && typeof error === 'object' && 'response' in error) {
          const errorResponse = error as { response?: { data?: { errors?: Record<string, string> } } }
          if (errorResponse.response?.data?.errors) {
            Object.entries(errorResponse.response.data.errors).forEach(([field, message]) => {
              setError(field as keyof EditUserFormData, { message: message as string })
            })
          }
        }
      }
    })
  }

  if (!isOpen || !user) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-100 flex items-center justify-center">
      <div className="bg-[#161b22] border border-[#21262d] rounded-2xl p-8 w-[480px] max-w-[90vw]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-semibold text-lg">Edit User</h2>
          <button
            onClick={onClose}
            title="Close modal"
            className="text-gray-400 hover:text-white transition-colors"
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
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
