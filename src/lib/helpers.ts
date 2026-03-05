// Download blob as file
export const downloadBlob = (
  blob: Blob, 
  filename: string
) => {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Get error message from API error
export interface ApiErrorResponse {
  response?: {
    data?: {
      message?: string
      detail?: string
    }
  }
  message?: string
}

export const getErrorMessage = (error: ApiErrorResponse | unknown): string => {
  if (error && typeof error === 'object' && 'response' in error) {
    const apiError = error as ApiErrorResponse
    if (apiError?.response?.data?.message) {
      return apiError.response.data.message
    }
    if (apiError?.response?.data?.detail) {
      return apiError.response.data.detail
    }
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return (error as { message: string }).message
  }
  return "An unexpected error occurred"
}

// Format currency
export const formatCurrency = (
  amount: number,
  currency: string = "USD"
): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount)
}

// Get initials from name
export const getInitials = (name: string): string => {
  if (!name) return "?"
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Check password strength
export const checkPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
  if (password.length < 6) return 'weak'
  
  const hasLower = /[a-z]/.test(password)
  const hasUpper = /[A-Z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  
  const score = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length
  
  if (score >= 3 && password.length >= 8) return 'strong'
  if (score >= 2 && password.length >= 6) return 'medium'
  return 'weak'
}

// Get password strength color and width
export const getPasswordStrengthProps = (strength: 'weak' | 'medium' | 'strong') => {
  switch (strength) {
    case 'weak':
      return { color: 'bg-red-500', width: 'w-1/3', textColor: 'text-red-500' }
    case 'medium':
      return { color: 'bg-orange-500', width: 'w-2/3', textColor: 'text-orange-500' }
    case 'strong':
      return { color: 'bg-green-500', width: 'w-full', textColor: 'text-green-500' }
  }
}
