import React from 'react';
import { CustomCard, CustomCardContent } from '@/components/custom/CustomCard';
import { CustomButton } from '@/components/custom/CustomButton';
import { Link } from 'react-router-dom';
import {
  Zap,
  UserPlus,
  Target,
  TrendingUp,
  Award,
  ArrowRight,
  CheckCircle2,
  Play,
} from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: UserPlus,
      title: 'Create Your Account',
      description: 'Sign up for free and set up your developer profile in just a few minutes.',
      details: [
        'Quick email or social sign-up',
        'Customize your profile',
        'Set your skill focus areas',
        'Choose your goals',
      ],
    },
    {
      number: '02',
      icon: Target,
      title: 'Add Your Skills',
      description: 'Add the skills you want to track and set your current proficiency levels.',
      details: [
        'Choose from 100+ skill categories',
        'Set your current level (1-100)',
        'Add custom skills',
        'Organize by categories',
      ],
    },
    {
      number: '03',
      icon: TrendingUp,
      title: 'Track Your Progress',
      description: 'Log your learning activities and watch your skills grow over time.',
      details: [
        'Update skill levels as you learn',
        'Link skills to projects',
        'Add learning notes',
        'Set milestones',
      ],
    },
    {
      number: '04',
      icon: Award,
      title: 'Achieve Your Goals',
      description: 'Reach your targets, earn achievements, and celebrate your growth.',
      details: [
        'Earn badges and awards',
        'Track goal completion',
        'Share your progress',
        'Get personalized insights',
      ],
    },
  ];

  const benefits = [
    'Visual progress tracking with charts and graphs',
    'AI-powered skill recommendations',
    'Team collaboration features',
    'Export your skill portfolio',
    'Integration with learning platforms',
    'Mobile-friendly interface',
  ];

  return (
    <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-24 px-4">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 mb-6">
              <Play className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Simple Process</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              How{' '}
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                SkillSync
              </span>{' '}
              Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Get started in minutes and begin tracking your skill development journey with our simple 4-step process.
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16 px-4 bg-card/30">
          <div className="container mx-auto">
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className={`flex flex-col lg:flex-row gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Step Number & Icon */}
                    <div className="lg:w-1/3 text-center">
                      <div className="inline-block relative">
                        <span className="text-8xl font-bold text-primary/10">{step.number}</span>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
                            <step.icon className="h-8 w-8 text-primary" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step Content */}
                    <CustomCard variant="glass" className="lg:w-2/3 p-6">
                      <CustomCardContent className="p-0">
                        <h3 className="text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                        <p className="text-lg text-muted-foreground mb-4">{step.description}</p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {step.details.map((detail, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-muted-foreground">
                              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                              <span className="text-sm">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </CustomCardContent>
                    </CustomCard>
                  </div>

                  {/* Connector Arrow */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex justify-center py-6">
                      <ArrowRight className="h-8 w-8 text-primary/30 rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Why Developers Love SkillSync
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Join thousands of developers who use SkillSync to track and accelerate their skill development.
                </p>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3 text-muted-foreground">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      </div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <CustomCard variant="glass" className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </CustomCard>
                <CustomCard variant="glass" className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                  <div className="text-sm text-muted-foreground">Skills Tracked</div>
                </CustomCard>
                <CustomCard variant="glass" className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">100+</div>
                  <div className="text-sm text-muted-foreground">Skill Categories</div>
                </CustomCard>
                <CustomCard variant="glass" className="p-6 text-center">
                  <div className="text-4xl font-bold text-primary mb-2">4.9</div>
                  <div className="text-sm text-muted-foreground">User Rating</div>
                </CustomCard>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 bg-card/30">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Create your free account today and start tracking your skill development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <CustomButton size="lg" className="gap-2">
                  <Zap className="h-5 w-5" />
                  Get Started Free
                </CustomButton>
              </Link>
              <Link to="/features">
                <CustomButton variant="outline" size="lg">
                  Explore Features
                </CustomButton>
              </Link>
            </div>
          </div>
      </section>
    </div>
  );
};

export default HowItWorks;
