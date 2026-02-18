import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Users, ArrowRight } from 'lucide-react';
import { CustomButton } from '@/components/custom/CustomButton';
import { CustomCard, CustomCardContent } from '@/components/custom/CustomCard';

const About: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 h-[300px] w-[300px] rounded-full bg-accent/15 blur-[80px]" />
        
        <div className="container relative mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center max-w-6xl mx-auto">
            {/* Left: Profile Info */}
            <div className="animate-fade-in">
              <span className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4">About Me</span>
              <h1 className="text-4xl font-bold font-display text-foreground sm:text-5xl mb-6">
                Hi, I'm <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Vishal Kumar</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                A Python Full Stack Developer (Fresher) with a strong foundation in building web applications using Django. 
                I enjoy learning by building real projects, writing clean code, and continuously improving my backend and frontend skills.
              </p>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Code2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Python Full Stack Developer</p>
                  <p className="text-sm text-muted-foreground">Fresher | Entry-Level Developer</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://github.com/vishalkumar6397" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <Code2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">GitHub</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/vishal-kumar-3b6478354" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Right: Skills */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CustomCard className="overflow-hidden border-primary/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                
                <CustomCardContent className="space-y-6 relative z-10">
                  <h3 className="text-xl font-semibold font-display text-foreground mb-4">Key Skills & Technologies</h3>
                  
                  {/* Backend */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-primary uppercase tracking-wider">Backend</p>
                    <div className="flex flex-wrap gap-2">
                      {['Python', 'Django', 'Django REST Framework'].map((skill, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Frontend */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-primary uppercase tracking-wider">Frontend</p>
                    <div className="flex flex-wrap gap-2">
                      {['HTML', 'CSS', 'JavaScript', 'React'].map((skill, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-secondary text-foreground text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Database */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-primary uppercase tracking-wider">Database</p>
                    <div className="flex flex-wrap gap-2">
                      {['SQLite', 'PostgreSQL'].map((skill, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-secondary text-foreground text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tools & Concepts */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-primary uppercase tracking-wider">Tools & Concepts</p>
                    <div className="flex flex-wrap gap-2">
                      {['Git', 'GitHub', 'VS Code', 'REST APIs', 'MVC/MVT', 'Clean Code'].map((skill, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CustomCardContent>
              </CustomCard>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-[2rem] bg-card border border-border p-12 text-center max-w-4xl mx-auto">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-primary/20 blur-[80px]" />
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold font-display text-foreground sm:text-4xl mb-4">
                Let's <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Connect</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Interested in collaborating or have a project in mind? Feel free to reach out!
              </p>
              <Link to="/contact">
                <CustomButton size="lg" variant="gradient" rightIcon={<ArrowRight className="h-5 w-5" />}>
                  Get in Touch
                </CustomButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
