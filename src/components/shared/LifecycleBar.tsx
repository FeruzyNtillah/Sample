interface LifecycleBarProps {
  currentStage: string;
  stages: string[];
  className?: string;
}

export default function LifecycleBar({ currentStage, stages, className }: LifecycleBarProps) {
  const currentIndex = stages.findIndex(stage => stage.toLowerCase() === currentStage.toLowerCase());
  
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {stages.map((stage, index) => (
        <div key={stage} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
              index <= currentIndex
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {index + 1}
          </div>
          {index < stages.length - 1 && (
            <div
              className={`w-12 h-1 ${
                index < currentIndex
                  ? 'bg-primary'
                  : 'bg-muted'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
