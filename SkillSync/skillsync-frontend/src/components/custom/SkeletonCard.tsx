import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
  variant?: 'default' | 'skill' | 'project' | 'stat';
}

export const SkeletonCard = ({ className, variant = 'default' }: SkeletonCardProps) => {
  const baseClasses = "rounded-xl border border-border bg-card p-6 animate-pulse";

  if (variant === 'skill') {
    return (
      <div className={cn(baseClasses, className)}>
        <div className="flex items-start gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-muted" />
          <div className="space-y-2 flex-1">
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-3 w-16 bg-muted rounded" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full bg-muted rounded" />
          <div className="h-2 w-full bg-muted rounded-full" />
        </div>
      </div>
    );
  }

  if (variant === 'project') {
    return (
      <div className={cn(baseClasses, className)}>
        <div className="flex items-start gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-muted" />
          <div className="space-y-2 flex-1">
            <div className="h-4 w-32 bg-muted rounded" />
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-3 w-full bg-muted rounded" />
          <div className="h-3 w-3/4 bg-muted rounded" />
        </div>
        <div className="flex gap-1 mb-4">
          <div className="h-5 w-16 bg-muted rounded-full" />
          <div className="h-5 w-16 bg-muted rounded-full" />
        </div>
        <div className="flex justify-between pt-3 border-t border-border">
          <div className="h-5 w-20 bg-muted rounded-full" />
          <div className="h-4 w-24 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (variant === 'stat') {
    return (
      <div className={cn(baseClasses, "text-center", className)}>
        <div className="h-8 w-16 bg-muted rounded mx-auto mb-2" />
        <div className="h-3 w-20 bg-muted rounded mx-auto" />
      </div>
    );
  }

  return (
    <div className={cn(baseClasses, className)}>
      <div className="space-y-3">
        <div className="h-4 w-3/4 bg-muted rounded" />
        <div className="h-4 w-1/2 bg-muted rounded" />
      </div>
    </div>
  );
};

export const SkeletonText = ({ className, lines = 3 }: { className?: string; lines?: number }) => {
  return (
    <div className={cn("space-y-2 animate-pulse", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-muted rounded"
          style={{ width: `${100 - i * 15}%` }}
        />
      ))}
    </div>
  );
};
