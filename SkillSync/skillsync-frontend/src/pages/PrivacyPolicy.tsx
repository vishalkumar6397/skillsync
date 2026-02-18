import React from 'react';
import { Shield, Eye, Lock, Database, Bell, Trash2, Mail } from 'lucide-react';
import { CustomCard, CustomCardHeader, CustomCardTitle, CustomCardContent } from '@/components/custom/CustomCard';

const PrivacyPolicy: React.FC = () => {
  const lastUpdated = 'December 28, 2025';

  const sections = [
    {
      icon: <Eye className="h-5 w-5" />,
      title: 'Information We Collect',
      content: [
        'Account information (name, email address, password)',
        'Profile information (skills, projects, proficiency levels)',
        'Usage data (how you interact with our services)',
        'Device information (browser type, IP address, device type)',
        'Cookies and similar tracking technologies',
      ],
    },
    {
      icon: <Database className="h-5 w-5" />,
      title: 'How We Use Your Information',
      content: [
        'To provide and maintain our services',
        'To personalize your experience and skill recommendations',
        'To communicate with you about updates and features',
        'To analyze usage patterns and improve our platform',
        'To ensure security and prevent fraud',
      ],
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: 'Data Security',
      content: [
        'We use industry-standard encryption (TLS/SSL) for data transmission',
        'Passwords are hashed using secure algorithms',
        'Regular security audits and vulnerability assessments',
        'Access controls and authentication for all systems',
        'Data is stored in secure, SOC 2 compliant data centers',
      ],
    },
    {
      icon: <Bell className="h-5 w-5" />,
      title: 'Communications',
      content: [
        'We may send you service-related emails (account verification, security alerts)',
        'Marketing emails are optional and you can unsubscribe at any time',
        'We will never share your email with third-party marketers',
        'You can manage your notification preferences in settings',
      ],
    },
    {
      icon: <Trash2 className="h-5 w-5" />,
      title: 'Data Retention & Deletion',
      content: [
        'We retain your data for as long as your account is active',
        'You can request data deletion at any time from your settings',
        'Upon account deletion, your data is removed within 30 days',
        'Some data may be retained for legal compliance purposes',
        'Backup data is purged according to our retention schedule',
      ],
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 mb-6">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold font-display text-foreground sm:text-5xl mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Introduction */}
        <CustomCard className="mb-8 animate-fade-in">
          <CustomCardContent className="prose prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              At SkillSync, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our platform. Please read this 
              privacy policy carefully. If you do not agree with the terms of this privacy policy, 
              please do not access the platform.
            </p>
          </CustomCardContent>
        </CustomCard>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <CustomCard key={index} animate animationDelay={index * 100}>
              <CustomCardHeader>
                <CustomCardTitle className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {section.icon}
                  </div>
                  {section.title}
                </CustomCardTitle>
              </CustomCardHeader>
              <CustomCardContent>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3 text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CustomCardContent>
            </CustomCard>
          ))}
        </div>

        {/* Your Rights */}
        <CustomCard className="mt-8 animate-fade-in">
          <CustomCardHeader>
            <CustomCardTitle>Your Rights</CustomCardTitle>
          </CustomCardHeader>
          <CustomCardContent className="space-y-4">
            <p className="text-muted-foreground">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                'Right to access your data',
                'Right to correct inaccurate data',
                'Right to delete your data',
                'Right to data portability',
                'Right to restrict processing',
                'Right to withdraw consent',
              ].map((right, index) => (
                <div key={index} className="flex items-center gap-2 text-foreground">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  {right}
                </div>
              ))}
            </div>
          </CustomCardContent>
        </CustomCard>

        {/* Contact */}
        <CustomCard className="mt-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20 animate-fade-in">
          <CustomCardContent className="flex items-center gap-4 py-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Questions About Privacy?</h3>
              <p className="text-muted-foreground text-sm">
                Contact us at privacy@skillsync.dev for any privacy-related inquiries.
              </p>
            </div>
          </CustomCardContent>
        </CustomCard>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
