import React from 'react';
import { cn } from '@/lib/utils';

interface CustomCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient';
  hover?: boolean;
  animate?: boolean;
  animationDelay?: number;
}

const CustomCard = React.forwardRef<HTMLDivElement, CustomCardProps>(
  ({ className, variant = 'default', hover = false, animate = false, animationDelay = 0, children, style, ...props }, ref) => {
    const variants = {
      default: 'bg-card border border-border',
      glass: 'glass',
      gradient: 'gradient-subtle border border-border',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl p-6',
          variants[variant],
          hover && 'transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1',
          animate && 'opacity-0 animate-fade-in',
          className
        )}
        style={{
          ...style,
          ...(animate && animationDelay > 0 ? { animationDelay: `${animationDelay}ms` } : {}),
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CustomCard.displayName = 'CustomCard';

const CustomCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 pb-4', className)} {...props} />
  )
);

CustomCardHeader.displayName = 'CustomCardHeader';

const CustomCardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-xl font-semibold leading-none tracking-tight text-foreground', className)}
      {...props}
    />
  )
);

CustomCardTitle.displayName = 'CustomCardTitle';

const CustomCardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
);

CustomCardDescription.displayName = 'CustomCardDescription';

const CustomCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  )
);

CustomCardContent.displayName = 'CustomCardContent';

const CustomCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center pt-4', className)} {...props} />
  )
);

CustomCardFooter.displayName = 'CustomCardFooter';

export {
  CustomCard,
  CustomCardHeader,
  CustomCardTitle,
  CustomCardDescription,
  CustomCardContent,
  CustomCardFooter,
};
