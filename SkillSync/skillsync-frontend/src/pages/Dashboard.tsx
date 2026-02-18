import React, { useState, useEffect, useMemo } from 'react';
import { 
  TrendingUp, 
  FolderKanban, 
  Zap, 
  CheckCircle2,
  ArrowUpRight,
  Plus,
  Loader2,
  Search,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { CustomCard, CustomCardHeader, CustomCardTitle, CustomCardContent } from '@/components/custom/CustomCard';
import { CustomButton } from '@/components/custom/CustomButton';
import { CustomInput } from '@/components/custom/CustomInput';
import { skillsApi, projectsApi } from '@/api/dataApi';
import { Skill, Project } from '@/types';
import { mockSkills, mockProjects } from '@/data/mockData';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  isLoading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType = 'neutral', icon, isLoading }) => (
  <CustomCard hover className="relative overflow-hidden">
    <CustomCardContent className="flex items-start justify-between">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{title}</p>
        {isLoading ? (
          <div className="h-9 w-16 bg-secondary rounded animate-pulse" />
        ) : (
          <p className="text-3xl font-bold text-foreground">{value}</p>
        )}
        {change && !isLoading && (
          <p className={`text-sm flex items-center gap-1 ${
            changeType === 'positive' ? 'text-success' : 
            changeType === 'negative' ? 'text-destructive' : 
            'text-muted-foreground'
          }`}>
            {changeType === 'positive' && <TrendingUp className="h-3 w-3" />}
            {change}
          </p>
        )}
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
    </CustomCardContent>
    <div className="absolute bottom-0 left-0 right-0 h-1 gradient-primary opacity-50" />
  </CustomCard>
);

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [skillsRes, projectsRes] = await Promise.all([
        skillsApi.getAll(),
        projectsApi.getAll(),
      ]);
      
      // Use localStorage data if available, otherwise fall back to mock data
      setSkills(skillsRes.data.length > 0 ? skillsRes.data : mockSkills);
      setProjects(projectsRes.data.length > 0 ? projectsRes.data : mockProjects);
    } catch (error) {
      // Fallback to mock data on error
      setSkills(mockSkills);
      setProjects(mockProjects);
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique categories from skills
  const categories = useMemo(() => {
    const cats = [...new Set(skills.map(s => s.category))];
    return ['all', ...cats.sort()];
  }, [skills]);

  // Filter data based on search query and category
  const filteredSkills = useMemo(() => {
    let result = skills;
    
    if (selectedCategory !== 'all') {
      result = result.filter(skill => skill.category === selectedCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(skill => 
        skill.name.toLowerCase().includes(query) ||
        skill.category.toLowerCase().includes(query) ||
        skill.proficiency.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [skills, searchQuery, selectedCategory]);

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    const query = searchQuery.toLowerCase();
    return projects.filter(project => 
      project.name.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.status.toLowerCase().includes(query) ||
      project.skills.some(skill => skill.toLowerCase().includes(query))
    );
  }, [projects, searchQuery]);

  const activeProjects = projects.filter(p => p.status === 'in-progress');
  const completedProjects = projects.filter(p => p.status === 'completed');
  const recentProjects = [...filteredProjects]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);

  const stats = [
    {
      title: 'Total Skills',
      value: skills.length,
      change: skills.length > 0 ? `${skills.length} tracked` : 'Start adding skills',
      changeType: skills.length > 0 ? 'positive' as const : 'neutral' as const,
      icon: <Zap className="h-6 w-6" />,
    },
    {
      title: 'Active Projects',
      value: activeProjects.length,
      change: activeProjects.length > 0 ? `${activeProjects.length} in progress` : 'No active projects',
      changeType: activeProjects.length > 0 ? 'neutral' as const : 'neutral' as const,
      icon: <FolderKanban className="h-6 w-6" />,
    },
    {
      title: 'Completed',
      value: completedProjects.length,
      change: completedProjects.length > 0 ? `${completedProjects.length} finished` : 'None yet',
      changeType: completedProjects.length > 0 ? 'positive' as const : 'neutral' as const,
      icon: <CheckCircle2 className="h-6 w-6" />,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success/10 text-success border-success/20';
      case 'in-progress': return 'bg-primary/10 text-primary border-primary/20';
      case 'planning': return 'bg-warning/10 text-warning border-warning/20';
      case 'on-hold': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getProficiencyPercent = (proficiency: string) => {
    const percents: Record<string, number> = {
      beginner: 25,
      intermediate: 50,
      advanced: 75,
      expert: 95,
    };
    return percents[proficiency] || 25;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Welcome back, {user?.name?.split(' ')[0] || 'there'}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your skills and projects.
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/skills">
            <CustomButton variant="outline" leftIcon={<Plus className="h-4 w-4" />}>
              Add Skill
            </CustomButton>
          </Link>
          <Link to="/projects">
            <CustomButton variant="default" leftIcon={<Plus className="h-4 w-4" />}>
              New Project
            </CustomButton>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search skills and projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results Info */}
      {searchQuery && (
        <div className="text-sm text-muted-foreground">
          Found {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} and {filteredSkills.length} skill{filteredSkills.length !== 1 ? 's' : ''} matching "{searchQuery}"
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} isLoading={isLoading} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Projects */}
        <CustomCard>
          <CustomCardHeader className="flex flex-row items-center justify-between">
            <CustomCardTitle className="text-lg">Recent Projects</CustomCardTitle>
            <Link to="/projects">
              <CustomButton variant="ghost" size="sm" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
                View All
              </CustomButton>
            </Link>
          </CustomCardHeader>
          <CustomCardContent className="space-y-4">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-24 rounded-lg bg-secondary/50 animate-pulse" />
                ))}
              </div>
            ) : recentProjects.length === 0 ? (
              <div className="text-center py-8">
                <FolderKanban className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground mb-3">
                  {searchQuery ? `No projects matching "${searchQuery}"` : 'No projects yet'}
                </p>
                {!searchQuery && (
                  <Link to="/projects">
                    <CustomButton variant="outline" size="sm">Create Your First Project</CustomButton>
                  </Link>
                )}
              </div>
            ) : (
              recentProjects.map((project) => (
                <Link 
                  key={project.id} 
                  to={`/projects/${project.id}`}
                  className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/30 transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{project.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(project.status)}`}>
                          {getStatusLabel(project.status)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {project.skills.length} skills
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </CustomCardContent>
        </CustomCard>

        {/* Skills Overview */}
        <CustomCard>
          <CustomCardHeader className="flex flex-col gap-3">
            <div className="flex flex-row items-center justify-between">
              <CustomCardTitle className="text-lg">Skills Overview</CustomCardTitle>
              <Link to="/skills">
                <CustomButton variant="ghost" size="sm" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
                  View All
                </CustomButton>
              </Link>
            </div>
            {/* Category Filter Buttons */}
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 capitalize ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
                    }`}
                  >
                    {category === 'all' ? 'All' : category}
                  </button>
                ))}
              </div>
            )}
          </CustomCardHeader>
          <CustomCardContent className="space-y-4">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-32 bg-secondary/50 rounded animate-pulse" />
                    <div className="h-2 w-full bg-secondary/50 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            ) : filteredSkills.length === 0 ? (
              <div className="text-center py-8">
                <Zap className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground mb-3">
                  {searchQuery ? `No skills matching "${searchQuery}"` : 'No skills tracked yet'}
                </p>
                {!searchQuery && (
                  <Link to="/skills">
                    <CustomButton variant="outline" size="sm">Add Your First Skill</CustomButton>
                  </Link>
                )}
              </div>
            ) : (
              filteredSkills.slice(0, 5).map((skill) => (
                <div key={skill.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground capitalize">
                        {skill.category}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground capitalize">{skill.proficiency}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div 
                      className="h-full rounded-full gradient-primary transition-all duration-500"
                      style={{ width: `${getProficiencyPercent(skill.proficiency)}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </CustomCardContent>
        </CustomCard>
      </div>

      {/* Quick Actions */}
      <CustomCard className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20">
        <CustomCardContent className="flex flex-col md:flex-row items-center justify-between gap-4 py-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Ready to level up?</h3>
            <p className="text-muted-foreground">Track a new skill or start a new project to keep growing.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/skills">
              <CustomButton variant="outline">Browse Skills</CustomButton>
            </Link>
            <Link to="/projects">
              <CustomButton variant="gradient">Start Project</CustomButton>
            </Link>
          </div>
        </CustomCardContent>
      </CustomCard>
    </div>
  );
};

export default Dashboard;
