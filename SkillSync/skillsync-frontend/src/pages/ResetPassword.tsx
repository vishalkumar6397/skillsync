import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { authApi } from '@/api/authApi';
import { CustomButton } from '@/components/custom/CustomButton';
import { CustomInput } from '@/components/custom/CustomInput';
import { CustomCard, CustomCardHeader, CustomCardTitle, CustomCardDescription, CustomCardContent } from '@/components/custom/CustomCard';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || 'mock-token';

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const passwordStrength = (password: string): { strength: number; label: string; color: string } => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 1) return { strength: 20, label: 'Weak', color: 'bg-destructive' };
    if (strength <= 2) return { strength: 40, label: 'Fair', color: 'bg-warning' };
    if (strength <= 3) return { strength: 60, label: 'Good', color: 'bg-warning' };
    if (strength <= 4) return { strength: 80, label: 'Strong', color: 'bg-success' };
    return { strength: 100, label: 'Very Strong', color: 'bg-success' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.password) {
      setError('Please enter a new password');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await authApi.resetPassword(token, formData.password);
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const pwStrength = passwordStrength(formData.password);

  if (isSuccess) {
    return (
      <div className="w-full max-w-md mx-auto px-4 py-12">
        <CustomCard className="animate-scale-in">
          <CustomCardContent className="text-center py-8">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Password Reset Complete</h2>
            <p className="text-muted-foreground mb-6">
              Your password has been successfully reset. You can now sign in with your new password.
            </p>
            <Link to="/login">
              <CustomButton variant="gradient" size="lg" className="w-full">
                Sign In Now
              </CustomButton>
            </Link>
          </CustomCardContent>
        </CustomCard>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 py-12">
      <CustomCard className="animate-scale-in">
        <CustomCardHeader className="text-center">
          <CustomCardTitle className="text-2xl">Reset Password</CustomCardTitle>
          <CustomCardDescription>
            Enter your new password below
          </CustomCardDescription>
        </CustomCardHeader>

        <CustomCardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-fade-in">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <CustomInput
                label="New Password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                leftIcon={<Lock className="h-4 w-4" />}
                autoComplete="new-password"
              />
              {formData.password && (
                <div className="space-y-1.5 animate-fade-in">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Password strength</span>
                    <span className={`font-medium ${pwStrength.color.replace('bg-', 'text-')}`}>
                      {pwStrength.label}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${pwStrength.color}`}
                      style={{ width: `${pwStrength.strength}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <CustomInput
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                formData.confirmPassword && formData.password === formData.confirmPassword ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : null
              }
              autoComplete="new-password"
            />

            <CustomButton
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              Reset Password
            </CustomButton>
          </form>

          <div className="mt-6 text-center">
            <Link 
              to="/login" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Remember your password? <span className="text-primary">Sign in</span>
            </Link>
          </div>
        </CustomCardContent>
      </CustomCard>
    </div>
  );
};

export default ResetPassword;
