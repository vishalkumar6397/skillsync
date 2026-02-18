import React from 'react';
import { User, Mail, Calendar, Camera, Moon, Sun } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { CustomCard, CustomCardHeader, CustomCardTitle, CustomCardContent } from '@/components/custom/CustomCard';
import { CustomButton } from '@/components/custom/CustomButton';
import { CustomInput } from '@/components/custom/CustomInput';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings</p>
      </div>

      {/* Avatar Section */}
      <CustomCard>
        <CustomCardContent className="flex flex-col sm:flex-row items-center gap-6 py-6">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-12 w-12 text-primary" />
            </div>
            <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-semibold text-foreground">{user?.name}</h2>
            <p className="text-muted-foreground">{user?.email}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </CustomCardContent>
      </CustomCard>

      {/* Personal Information */}
      <CustomCard>
        <CustomCardHeader>
          <CustomCardTitle>Personal Information</CustomCardTitle>
        </CustomCardHeader>
        <CustomCardContent className="space-y-4">
          <CustomInput
            label="Full Name"
            type="text"
            defaultValue={user?.name}
            leftIcon={<User className="h-4 w-4" />}
          />
          <CustomInput
            label="Email Address"
            type="email"
            defaultValue={user?.email}
            leftIcon={<Mail className="h-4 w-4" />}
            disabled
            helperText="Email cannot be changed"
          />
          <div className="flex justify-end">
            <CustomButton variant="default">Save Changes</CustomButton>
          </div>
        </CustomCardContent>
      </CustomCard>

      {/* Preferences */}
      <CustomCard>
        <CustomCardHeader>
          <CustomCardTitle>Preferences</CustomCardTitle>
        </CustomCardHeader>
        <CustomCardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              {isDarkMode ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-warning" />}
              <div>
                <p className="font-medium text-foreground">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Toggle between light and dark theme</p>
              </div>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`relative h-6 w-11 rounded-full transition-colors ${isDarkMode ? 'bg-primary' : 'bg-secondary'}`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${isDarkMode ? 'left-6' : 'left-1'}`}
              />
            </button>
          </div>
        </CustomCardContent>
      </CustomCard>

      {/* Danger Zone */}
      <CustomCard className="border-destructive/20">
        <CustomCardHeader>
          <CustomCardTitle className="text-destructive">Danger Zone</CustomCardTitle>
        </CustomCardHeader>
        <CustomCardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg border border-destructive/20 bg-destructive/5">
            <div>
              <p className="font-medium text-foreground">Delete Account</p>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
            </div>
            <CustomButton variant="destructive">Delete Account</CustomButton>
          </div>
        </CustomCardContent>
      </CustomCard>
    </div>
  );
};

export default Profile;
