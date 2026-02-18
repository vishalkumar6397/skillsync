import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { CustomButton } from '@/components/custom/CustomButton';
import { CustomInput } from '@/components/custom/CustomInput';
import {
  CustomCard,
  CustomCardHeader,
  CustomCardTitle,
  CustomCardDescription,
  CustomCardContent,
  CustomCardFooter,
} from '@/components/custom/CustomCard';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  /* ------------------ handlers ------------------ */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setFieldErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    // Match Django password rules better
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* ------------------ submit ------------------ */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    try {
      // 🚨 SEND ONLY WHAT BACKEND EXPECTS
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      /**
       * Django returns errors like:
       * { name: ["..."], password: ["..."] }
       */
      if (err?.response?.data) {
        const apiErrors: Record<string, string> = {};
        Object.entries(err.response.data).forEach(([key, value]) => {
          apiErrors[key] = Array.isArray(value) ? value[0] : String(value);
        });
        setFieldErrors(apiErrors);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  /* ------------------ password strength ------------------ */

  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 1) return { strength: 25, label: 'Weak', color: 'bg-destructive' };
    if (strength === 2) return { strength: 50, label: 'Fair', color: 'bg-warning' };
    if (strength === 3) return { strength: 75, label: 'Strong', color: 'bg-success' };
    return { strength: 100, label: 'Very Strong', color: 'bg-success' };
  };

  const pwStrength = passwordStrength(formData.password);

  /* ------------------ UI ------------------ */

  return (
    <div className="w-full max-w-md mx-auto px-4 py-12">
      <CustomCard className="animate-scale-in">
        <CustomCardHeader className="text-center">
          <CustomCardTitle className="text-2xl">Create Account</CustomCardTitle>
          <CustomCardDescription>
            Get started with SkillSync today
          </CustomCardDescription>
        </CustomCardHeader>

        <CustomCardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <CustomInput
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              leftIcon={<User className="h-4 w-4" />}
              error={fieldErrors.name}
            />

            <CustomInput
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              leftIcon={<Mail className="h-4 w-4" />}
              error={fieldErrors.email}
            />

            <div className="space-y-2">
              <CustomInput
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                leftIcon={<Lock className="h-4 w-4" />}
                error={fieldErrors.password}
              />

              {formData.password && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span>Password strength</span>
                    <span className={pwStrength.color.replace('bg-', 'text-')}>
                      {pwStrength.label}
                    </span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full ${pwStrength.color}`}
                      style={{ width: `${pwStrength.strength}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <CustomInput
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              leftIcon={<Lock className="h-4 w-4" />}
              error={fieldErrors.confirmPassword}
              rightIcon={
                formData.confirmPassword &&
                formData.password === formData.confirmPassword ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : null
              }
            />

            <CustomButton
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              Create Account
            </CustomButton>
          </form>
        </CustomCardContent>

        <CustomCardFooter className="justify-center border-t pt-6">
          <p className="text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-medium">
              Sign in
            </Link>
          </p>
        </CustomCardFooter>
      </CustomCard>
    </div>
  );
};

export default Register;
