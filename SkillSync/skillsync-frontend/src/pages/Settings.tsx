import React from 'react';
import { Bell, Shield, Key, Globe } from 'lucide-react';
import { CustomCard, CustomCardHeader, CustomCardTitle, CustomCardContent } from '@/components/custom/CustomCard';
import { CustomButton } from '@/components/custom/CustomButton';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure your application preferences</p>
      </div>

      {/* Notifications */}
      <CustomCard>
        <CustomCardHeader>
          <CustomCardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
          </CustomCardTitle>
        </CustomCardHeader>
        <CustomCardContent className="space-y-4">
          {[
            { title: 'Email Notifications', desc: 'Receive updates about your projects' },
            { title: 'Push Notifications', desc: 'Get notified about important events' },
            { title: 'Weekly Digest', desc: 'Weekly summary of your progress' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div>
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
              <button className="relative h-6 w-11 rounded-full bg-primary transition-colors">
                <span className="absolute top-1 left-6 h-4 w-4 rounded-full bg-white" />
              </button>
            </div>
          ))}
        </CustomCardContent>
      </CustomCard>

      {/* Security */}
      <CustomCard>
        <CustomCardHeader>
          <CustomCardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Security
          </CustomCardTitle>
        </CustomCardHeader>
        <CustomCardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <Key className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Change Password</p>
                <p className="text-sm text-muted-foreground">Update your password regularly</p>
              </div>
            </div>
            <CustomButton variant="outline" size="sm">Change</CustomButton>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
            </div>
            <CustomButton variant="outline" size="sm">Enable</CustomButton>
          </div>
        </CustomCardContent>
      </CustomCard>

      {/* Language & Region */}
      <CustomCard>
        <CustomCardHeader>
          <CustomCardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Language & Region
          </CustomCardTitle>
        </CustomCardHeader>
        <CustomCardContent>
          <div className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div>
              <p className="font-medium text-foreground">Language</p>
              <p className="text-sm text-muted-foreground">Select your preferred language</p>
            </div>
            <select className="h-9 px-3 rounded-lg border border-border bg-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </CustomCardContent>
      </CustomCard>
    </div>
  );
};

export default Settings;
