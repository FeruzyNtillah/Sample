import React from 'react'
import { Check } from 'lucide-react'

interface WizardStep {
  label: string
  description: string
}

interface WizardStepsProps {
  currentStep: 1 | 2 | 3
  steps?: WizardStep[]
}

const DEFAULT_STEPS: WizardStep[] = [
  { 
    label: "Validation", 
    description: "Check for errors" 
  },
  { 
    label: "Preview", 
    description: "Review your data" 
  },
  { 
    label: "Submit", 
    description: "Send to Microsoft" 
  }
]

export function WizardSteps({ currentStep, steps = DEFAULT_STEPS }: WizardStepsProps) {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex items-center gap-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep

          return (
            <React.Fragment key={stepNumber}>
              <div className="flex flex-col items-center">
                {/* Step Circle */}
                <div
                  className={`
                    w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200
                    ${isCompleted 
                      ? 'bg-teal-400 text-white' 
                      : isCurrent 
                      ? 'bg-teal-400 text-white' 
                      : 'bg-gray-700 text-gray-400'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    stepNumber
                  )}
                </div>
                
                {/* Step Label */}
                <div className={`mt-2 text-sm font-medium ${
                  isCurrent ? 'text-white' : 'text-gray-400'
                }`}>
                  {step.label}
                </div>
                
                {/* Step Description */}
                <div className="mt-1 text-xs text-gray-400 text-center max-w-[100px]">
                  {step.description}
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`
                    w-16 h-0.5 mx-2
                    ${isCompleted 
                      ? 'bg-teal-400' 
                      : 'bg-[#374151]'
                    }
                  `}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
