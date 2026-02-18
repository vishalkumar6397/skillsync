import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { authApi } from '@/api/authApi';
import { CustomButton } from '@/components/custom/CustomButton';
import { CustomInput } from '@/components/custom/CustomInput';
import { CustomCard, CustomCardHeader, CustomCardTitle, CustomCardDescription, CustomCardContent, CustomCardFooter } from '@/components/custom/CustomCard';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      await authApi.requestPasswordReset(email);
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md mx-auto px-4 py-12">
        <CustomCard className="animate-scale-in">
          <CustomCardContent className="text-center py-8">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Check Your Email</h2>
            <p className="text-muted-foreground mb-6">
              If an account exists with <span className="text-foreground font-medium">{email}</span>, you'll receive password reset instructions shortly.
            </p>
            <div className="space-y-3">
              <Link to="/login">
                <CustomButton variant="default" className="w-full">
                  Back to Sign In
                </CustomButton>
              </Link>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail('');
                }}
                className="text-sm text-primary hover:underline"
              >
                Try a different email
              </button>
            </div>
          </CustomCardContent>
        </CustomCard>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 py-12">
      <CustomCard className="animate-scale-in">
        <CustomCardHeader className="text-center">
          <CustomCardTitle className="text-2xl">Forgot Password?</CustomCardTitle>
          <CustomCardDescription>
            No worries, we'll send you reset instructions
          </CustomCardDescription>
        </CustomCardHeader>

        <CustomCardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-fade-in">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <CustomInput
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              leftIcon={<Mail className="h-4 w-4" />}
              autoComplete="email"
              helperText="Enter the email associated with your account"
            />

            <CustomButton
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              Send Reset Instructions
            </CustomButton>
          </form>
        </CustomCardContent>

        <CustomCardFooter className="justify-center border-t border-border pt-6">
          <Link 
            to="/login" 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign In
          </Link>
        </CustomCardFooter>
      </CustomCard>
    </div>
  );
};

export default ForgotPassword;
