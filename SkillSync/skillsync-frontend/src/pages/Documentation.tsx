import React from 'react';
import { Book, Code2, Zap, FolderKanban, BarChart3, Settings, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CustomCard, CustomCardContent } from '@/components/custom/CustomCard';
import { CustomButton } from '@/components/custom/CustomButton';

const Documentation: React.FC = () => {
  const sections = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Getting Started',
      description: 'Learn how to set up your SkillSync account and start tracking your skills.',
      links: [
        { title: 'Create Your Account', href: '/register' },
        { title: 'Setting Up Your Profile', href: '/register' },
        { title: 'Adding Your First Skill', href: '/register' },
      ],
    },
    {
      icon: <FolderKanban className="h-6 w-6" />,
      title: 'Project Management',
      description: 'Discover how to create, manage, and track your development projects.',
      links: [
        { title: 'Creating Projects', href: '/register' },
        { title: 'Managing Milestones', href: '/register' },
        { title: 'Linking Skills to Projects', href: '/register' },
      ],
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Analytics & Insights',
      description: 'Understand your skill progression with detailed analytics.',
      links: [
        { title: 'Dashboard Overview', href: '/register' },
        { title: 'Progress Tracking', href: '/register' },
        { title: 'Skill Reports', href: '/register' },
      ],
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: 'Account Settings',
      description: 'Customize your SkillSync experience with account settings.',
      links: [
        { title: 'Profile Settings', href: '/register' },
        { title: 'Notification Preferences', href: '/register' },
        { title: 'Security Options', href: '/register' },
      ],
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 mb-6">
            <Book className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold font-display text-foreground sm:text-5xl mb-4">
            Documentation
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Everything you need to know about using SkillSync to track your skills and manage your projects effectively.
          </p>
        </div>

        {/* Quick Start */}
        <CustomCard className="mb-12 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20 animate-fade-in">
          <CustomCardContent className="flex flex-col md:flex-row items-center justify-between gap-6 py-8">
            <div>
              <h2 className="text-2xl font-bold font-display text-foreground mb-2">Quick Start Guide</h2>
              <p className="text-muted-foreground">
                New to SkillSync? Get up and running in less than 5 minutes with our quick start guide.
              </p>
            </div>
            <Link to="/register">
              <CustomButton variant="gradient" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Start Now
              </CustomButton>
            </Link>
          </CustomCardContent>
        </CustomCard>

        {/* Documentation Sections */}
        <div className="grid gap-8 md:grid-cols-2">
          {sections.map((section, index) => (
            <CustomCard 
              key={index} 
              hover 
              animate 
              animationDelay={index * 100}
              className="h-full"
            >
              <CustomCardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold font-display text-foreground">{section.title}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground">{section.description}</p>
                <ul className="space-y-2 pt-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        to={link.href}
                        className="text-primary hover:text-primary/80 text-sm flex items-center gap-2 transition-colors"
                      >
                        <ArrowRight className="h-3 w-3" />
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CustomCardContent>
            </CustomCard>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-16 text-center animate-fade-in">
          <h2 className="text-2xl font-bold font-display text-foreground mb-4">Need More Help?</h2>
          <p className="text-muted-foreground mb-6">
            Cannot find what you are looking for? Our support team is here to help.
          </p>
          <CustomButton variant="outline">Contact Support</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
