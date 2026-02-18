import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { CustomButton } from '@/components/custom/CustomButton';
import { cn } from '@/lib/utils';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Skill<span className="text-primary">Sync</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              to="/how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How it Works
            </Link>
            <Link
              to="/contact"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/about"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Auth Buttons */}
          {!isAuthPage && (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <CustomButton variant="ghost" size="sm">
                  Log in
                </CustomButton>
              </Link>
              <Link to="/register">
                <CustomButton variant="default" size="sm">
                  Get Started
                </CustomButton>
              </Link>
            </div>
          )}

          {isAuthPage && (
            <Link to="/">
              <CustomButton variant="ghost" size="sm">
                Back to Home
              </CustomButton>
            </Link>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className={cn('pt-16', isAuthPage && 'flex items-center justify-center min-h-screen')}>
        {children}
      </main>

      {/* Footer - Only show on landing page */}
      {!isAuthPage && (
        <footer className="border-t border-border/50 bg-card/50">
          <div className="container mx-auto px-4 py-12">
            <div className="grid gap-8 md:grid-cols-4">
              {/* Brand */}
              <div className="space-y-4">
                <Link to="/" className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xl font-bold text-foreground">
                    Skill<span className="text-primary">Sync</span>
                  </span>
                </Link>
                <p className="text-sm text-muted-foreground">
                  Track your skills, manage projects, and accelerate your growth.
                </p>
              </div>

              {/* Product */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground">Product</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      How it Works
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link to="/api" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      API Reference
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 border-t border-border/50 pt-8 text-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} SkillSync. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};
