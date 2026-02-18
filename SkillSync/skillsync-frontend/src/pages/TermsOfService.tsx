import React from 'react';
import { FileText, CheckCircle2, XCircle, AlertTriangle, Scale, Mail } from 'lucide-react';
import { CustomCard, CustomCardHeader, CustomCardTitle, CustomCardContent } from '@/components/custom/CustomCard';

const TermsOfService: React.FC = () => {
  const lastUpdated = 'December 28, 2025';

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 mb-6">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold font-display text-foreground sm:text-5xl mb-4">
            Terms of Service
          </h1>
          <p className="text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Introduction */}
        <CustomCard className="mb-8 animate-fade-in">
          <CustomCardContent className="prose prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              Welcome to SkillSync. These Terms of Service govern your use of our platform and services. 
              By accessing or using SkillSync, you agree to be bound by these terms. If you disagree with 
              any part of these terms, you may not access the service.
            </p>
          </CustomCardContent>
        </CustomCard>

        {/* Acceptance */}
        <CustomCard className="mb-6 animate-fade-in">
          <CustomCardHeader>
            <CustomCardTitle className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              Acceptance of Terms
            </CustomCardTitle>
          </CustomCardHeader>
          <CustomCardContent className="space-y-4 text-muted-foreground">
            <p>
              By creating an account or using SkillSync, you acknowledge that you have read, understood, 
              and agree to be bound by these Terms of Service. You must be at least 13 years old to use 
              this service. If you are under 18, you must have parental consent.
            </p>
          </CustomCardContent>
        </CustomCard>

        {/* User Responsibilities */}
        <CustomCard className="mb-6 animate-fade-in">
          <CustomCardHeader>
            <CustomCardTitle className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Scale className="h-5 w-5" />
              </div>
              User Responsibilities
            </CustomCardTitle>
          </CustomCardHeader>
          <CustomCardContent className="space-y-4">
            <p className="text-muted-foreground">As a user of SkillSync, you agree to:</p>
            <ul className="space-y-3">
              {[
                'Provide accurate and complete information when creating your account',
                'Maintain the security of your account credentials',
                'Use the service in compliance with all applicable laws',
                'Not share your account with others',
                'Report any security vulnerabilities or breaches immediately',
                'Respect the intellectual property rights of others',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </CustomCardContent>
        </CustomCard>

        {/* Prohibited Activities */}
        <CustomCard className="mb-6 animate-fade-in">
          <CustomCardHeader>
            <CustomCardTitle className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                <XCircle className="h-5 w-5" />
              </div>
              Prohibited Activities
            </CustomCardTitle>
          </CustomCardHeader>
          <CustomCardContent className="space-y-4">
            <p className="text-muted-foreground">You may not use SkillSync to:</p>
            <ul className="space-y-3">
              {[
                'Violate any laws or regulations',
                'Harass, abuse, or harm other users',
                'Distribute malware or harmful code',
                'Attempt to gain unauthorized access to our systems',
                'Scrape or collect data without permission',
                'Use the service for any illegal purpose',
                'Impersonate others or provide false information',
                'Interfere with the proper functioning of the service',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-muted-foreground">
                  <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </CustomCardContent>
        </CustomCard>

        {/* Intellectual Property */}
        <CustomCard className="mb-6 animate-fade-in">
          <CustomCardHeader>
            <CustomCardTitle>Intellectual Property</CustomCardTitle>
          </CustomCardHeader>
          <CustomCardContent className="space-y-4 text-muted-foreground">
            <p>
              The SkillSync service and its original content, features, and functionality are owned by 
              SkillSync and are protected by international copyright, trademark, patent, trade secret, 
              and other intellectual property laws.
            </p>
            <p>
              You retain ownership of any content you create using our service. By using SkillSync, 
              you grant us a limited license to store and display your content as necessary to provide 
              the service.
            </p>
          </CustomCardContent>
        </CustomCard>

        {/* Disclaimer */}
        <CustomCard className="mb-6 animate-fade-in">
          <CustomCardHeader>
            <CustomCardTitle className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10 text-warning">
                <AlertTriangle className="h-5 w-5" />
              </div>
              Disclaimer & Limitation of Liability
            </CustomCardTitle>
          </CustomCardHeader>
          <CustomCardContent className="space-y-4 text-muted-foreground">
            <p>
              SkillSync is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, 
              expressed or implied, regarding the reliability, accuracy, or availability of the service.
            </p>
            <p>
              To the maximum extent permitted by law, SkillSync shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages resulting from your use of the service.
            </p>
          </CustomCardContent>
        </CustomCard>

        {/* Termination */}
        <CustomCard className="mb-6 animate-fade-in">
          <CustomCardHeader>
            <CustomCardTitle>Termination</CustomCardTitle>
          </CustomCardHeader>
          <CustomCardContent className="space-y-4 text-muted-foreground">
            <p>
              We may terminate or suspend your account immediately, without prior notice, for any reason, 
              including breach of these Terms. Upon termination, your right to use the service will cease 
              immediately.
            </p>
            <p>
              You may also delete your account at any time through your account settings. Upon deletion, 
              your data will be removed in accordance with our Privacy Policy.
            </p>
          </CustomCardContent>
        </CustomCard>

        {/* Changes to Terms */}
        <CustomCard className="mb-6 animate-fade-in">
          <CustomCardHeader>
            <CustomCardTitle>Changes to Terms</CustomCardTitle>
          </CustomCardHeader>
          <CustomCardContent className="text-muted-foreground">
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any material 
              changes by posting the new Terms of Service on this page and updating the "Last updated" date. 
              Your continued use of the service after any changes constitutes acceptance of the new terms.
            </p>
          </CustomCardContent>
        </CustomCard>

        {/* Contact */}
        <CustomCard className="mt-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20 animate-fade-in">
          <CustomCardContent className="flex items-center gap-4 py-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Questions About These Terms?</h3>
              <p className="text-muted-foreground text-sm">
                Contact us at legal@skillsync.dev for any questions regarding these terms.
              </p>
            </div>
          </CustomCardContent>
        </CustomCard>
      </div>
    </div>
  );
};

export default TermsOfService;
