import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Target, 
  BarChart3, 
  FolderKanban, 
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Users,
  Code2,
  Layers,
  Rocket
} from 'lucide-react';
import { CustomButton } from '@/components/custom/CustomButton';
import { CustomCard, CustomCardContent } from '@/components/custom/CustomCard';

const Landing: React.FC = () => {
  const features = [
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Skill Tracking',
      description: 'Catalog your technical skills with proficiency levels and track your growth over time.',
    },
    {
      icon: <FolderKanban className="h-6 w-6" />,
      title: 'Project Management',
      description: 'Organize your projects, link required skills, and track milestones to completion.',
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Progress Analytics',
      description: 'Visualize your skill development with intuitive charts and detailed insights.',
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: 'Smart Recommendations',
      description: 'Get personalized suggestions for skills to learn based on your project goals.',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Skills Tracked', icon: <Code2 className="h-5 w-5" /> },
    { value: '5K+', label: 'Projects Managed', icon: <Layers className="h-5 w-5" /> },
    { value: '2K+', label: 'Active Users', icon: <Users className="h-5 w-5" /> },
  ];

  const steps = [
    {
      step: '01',
      title: 'Create Your Profile',
      description: 'Sign up and set up your developer profile in seconds.',
      icon: <Users className="h-6 w-6" />,
    },
    {
      step: '02',
      title: 'Add Your Skills',
      description: 'Catalog your skills with categories and proficiency levels.',
      icon: <Zap className="h-6 w-6" />,
    },
    {
      step: '03',
      title: 'Track Progress',
      description: 'Create projects, link skills, and monitor your growth.',
      icon: <Rocket className="h-6 w-6" />,
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Primary gradient orbs */}
          <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/30 blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-primary/20 blur-[100px]" />
          <div className="absolute top-1/2 right-1/3 h-[300px] w-[300px] rounded-full bg-accent/15 blur-[80px]" />
          
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), 
                               linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="container relative mx-auto px-4 py-20">
          <div className="mx-auto max-w-5xl text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm px-5 py-2.5 text-sm text-primary animate-fade-in">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span className="font-medium">Your Personal Skill Development Hub</span>
            </div>

            {/* Headline */}
            <h1 className="mb-8 font-display text-5xl font-bold leading-[1.1] text-foreground sm:text-6xl md:text-7xl lg:text-8xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Track Skills.
              <br />
              <span className="bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">Build Projects.</span>
              <br />
              Grow Faster.
            </h1>

            {/* Subheadline */}
            <p className="mb-12 text-lg text-muted-foreground sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              The all-in-one platform for developers to track technical skills, 
              manage projects, and visualize their growth journey.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Link to="/register">
                <CustomButton size="xl" variant="gradient" rightIcon={<ArrowRight className="h-5 w-5" />} className="group">
                  <span>Get Started Free</span>
                </CustomButton>
              </Link>
              <Link to="/login">
                <CustomButton size="xl" variant="outline" className="border-border/50 hover:border-primary/50">
                  Sign In
                </CustomButton>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-primary">{stat.icon}</div>
                    <span className="text-3xl font-bold font-display text-foreground">{stat.value}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
        
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-20">
            <span className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4">Features</span>
            <h2 className="text-4xl font-bold font-display text-foreground sm:text-5xl mb-6">
              Everything You Need to <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Level Up</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Powerful features designed to help you track, manage, and accelerate your skill development.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <CustomCard 
                key={index} 
                hover
                animate
                animationDelay={index * 100}
                className="group relative overflow-hidden"
              >
                <CustomCardContent className="space-y-4 relative z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold font-display text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CustomCardContent>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </CustomCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <span className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4">How It Works</span>
            <h2 className="text-4xl font-bold font-display text-foreground sm:text-5xl mb-6">
              Get Started in <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">3 Simple Steps</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Start tracking your skills and projects in minutes with our intuitive platform.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-full h-px">
                    <div className="w-full h-full bg-gradient-to-r from-primary/50 via-primary/30 to-transparent" />
                  </div>
                )}
                
                <div className="relative z-10 flex flex-col items-center text-center group">
                  {/* Step number with icon */}
                  <div className="relative mb-8">
                    <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-card border-2 border-border group-hover:border-primary/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/10">
                      <div className="text-primary">{step.icon}</div>
                    </div>
                    <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {step.step.slice(-1)}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold font-display text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground max-w-xs">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
        
        <div className="container relative mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div>
              <span className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4">Why SkillSync</span>
              <h2 className="text-4xl font-bold font-display text-foreground sm:text-5xl mb-8">
                Why Developers <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Love SkillSync</span>
              </h2>
              <div className="space-y-6">
                {[
                  { icon: <TrendingUp className="h-5 w-5" />, text: 'Track skill progression with visual timelines' },
                  { icon: <FolderKanban className="h-5 w-5" />, text: 'Link skills directly to real-world projects' },
                  { icon: <BarChart3 className="h-5 w-5" />, text: 'Get insights on your strongest areas' },
                  { icon: <Users className="h-5 w-5" />, text: 'Share your skill portfolio with employers' },
                ].map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-x-1 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <span className="text-foreground font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              {/* Decorative glow */}
              <div className="absolute inset-0 rounded-3xl bg-primary/10 blur-3xl" />
              
              <CustomCard className="relative border-primary/20 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                
                <CustomCardContent className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold font-display text-foreground">Skill Overview</h3>
                    <span className="text-sm text-primary font-medium flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      +15% this month
                    </span>
                  </div>
                  
                  {/* Mock skill bars */}
                  {[
                    { name: 'React', level: 85, color: 'from-blue-500 to-cyan-500' },
                    { name: 'TypeScript', level: 75, color: 'from-blue-600 to-blue-400' },
                    { name: 'Node.js', level: 60, color: 'from-green-500 to-emerald-500' },
                    { name: 'PostgreSQL', level: 45, color: 'from-indigo-500 to-purple-500' },
                  ].map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
                        <div 
                          className="h-full rounded-full gradient-primary transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CustomCardContent>
              </CustomCard>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-[2rem] bg-card border border-border p-12 md:p-20 text-center">
            {/* Background effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px]" />
            <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
            
            <div className="relative z-10">
              <span className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4">Get Started Today</span>
              <h2 className="text-4xl font-bold font-display text-foreground sm:text-5xl md:text-6xl mb-6">
                Ready to <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Accelerate</span> Your Growth?
              </h2>
              <p className="text-muted-foreground mb-10 max-w-2xl mx-auto text-lg">
                Join thousands of developers who are tracking their skills and building amazing projects with SkillSync.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register">
                  <CustomButton size="xl" variant="gradient" rightIcon={<ArrowRight className="h-5 w-5" />}>
                    Start Free Today
                  </CustomButton>
                </Link>
                <Link to="/login">
                  <CustomButton size="xl" variant="outline">
                    View Demo
                  </CustomButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
