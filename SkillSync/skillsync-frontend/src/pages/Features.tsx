import React from 'react';
import { CustomCard, CustomCardContent } from '@/components/custom/CustomCard';
import { CustomButton } from '@/components/custom/CustomButton';
import { Link } from 'react-router-dom';
import {
  Zap,
  Target,
  TrendingUp,
  Users,
  BarChart3,
  Award,
  Clock,
  Shield,
  Sparkles,
  Layers,
  GitBranch,
  Bell,
} from 'lucide-react';

const Features: React.FC = () => {
  const mainFeatures = [
    {
      icon: Target,
      title: 'Skill Tracking',
      description: 'Track your progress across multiple skills with detailed analytics and visualizations.',
      details: [
        'Set custom skill levels and goals',
        'Track progress over time with charts',
        'Categorize skills by domain',
        'Add notes and milestones',
      ],
    },
    {
      icon: Layers,
      title: 'Project Management',
      description: 'Organize and manage your projects with powerful tools and integrations.',
      details: [
        'Create and organize projects',
        'Link skills to projects',
        'Track project milestones',
        'Collaborate with team members',
      ],
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Get insights into your growth with comprehensive analytics and reports.',
      details: [
        'Visual progress charts',
        'Weekly and monthly reports',
        'Skill distribution analysis',
        'Growth trend predictions',
      ],
    },
    {
      icon: GitBranch,
      title: 'Learning Paths',
      description: 'Follow structured learning paths to master new skills efficiently.',
      details: [
        'Curated learning resources',
        'Step-by-step progression',
        'Prerequisite tracking',
        'Completion certificates',
      ],
    },
  ];

  const additionalFeatures = [
    {
      icon: TrendingUp,
      title: 'Progress Insights',
      description: 'AI-powered insights to help you understand your learning patterns.',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Work together with your team and share progress updates.',
    },
    {
      icon: Award,
      title: 'Achievements',
      description: 'Earn badges and achievements as you reach your goals.',
    },
    {
      icon: Clock,
      title: 'Time Tracking',
      description: 'Track time spent on learning and skill development.',
    },
    {
      icon: Shield,
      title: 'Data Security',
      description: 'Your data is encrypted and securely stored.',
    },
    {
      icon: Sparkles,
      title: 'Smart Suggestions',
      description: 'Get personalized recommendations for skill improvement.',
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Stay updated with reminders and progress notifications.',
    },
    {
      icon: Zap,
      title: 'Quick Actions',
      description: 'Perform common tasks quickly with keyboard shortcuts.',
    },
  ];

  return (
    <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Powerful Features</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Grow Your Skills
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              SkillSync provides all the tools you need to track, manage, and accelerate your skill development journey.
            </p>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-16 px-4 bg-card/30">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Core Features
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {mainFeatures.map((feature, index) => (
                <CustomCard key={index} variant="glass" hover className="p-6">
                  <CustomCardContent className="p-0">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">{feature.description}</p>
                        <ul className="space-y-2">
                          {feature.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CustomCardContent>
                </CustomCard>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Features */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-4">
              And Much More
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Discover all the features that make SkillSync the ultimate platform for skill development.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {additionalFeatures.map((feature, index) => (
                <CustomCard key={index} variant="glass" hover className="p-4">
                  <CustomCardContent className="p-0 text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-3">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CustomCardContent>
                </CustomCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 bg-card/30">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of developers who are already tracking their skills with SkillSync.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <CustomButton size="lg" className="gap-2">
                  <Zap className="h-5 w-5" />
                  Start Free Trial
                </CustomButton>
              </Link>
              <Link to="/how-it-works">
                <CustomButton variant="outline" size="lg">
                  See How It Works
                </CustomButton>
              </Link>
            </div>
          </div>
      </section>
    </div>
  );
};

export default Features;
