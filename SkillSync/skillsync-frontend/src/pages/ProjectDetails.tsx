import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, CheckCircle2, Circle, Edit, Trash2, Loader2 } from 'lucide-react';
import { CustomCard, CustomCardHeader, CustomCardTitle, CustomCardContent } from '@/components/custom/CustomCard';
import { CustomButton } from '@/components/custom/CustomButton';
import { ConfirmModal } from '@/components/custom/CustomModal';
import { ProjectFormModal } from '@/components/features/ProjectFormModal';
import { projectsApi, skillsApi, CreateProjectData } from '@/api/dataApi';
import { Project, Skill } from '@/types';
import { mockProjects, mockSkills } from '@/data/mockData';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [project, setProject] = useState<Project | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [togglingMilestone, setTogglingMilestone] = useState<string | null>(null);
  
  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [projectsRes, skillsRes] = await Promise.all([
        projectsApi.getAll(),
        skillsApi.getAll(),
      ]);
      
      const allProjects = projectsRes.data.length > 0 ? projectsRes.data : mockProjects;
      const foundProject = allProjects.find(p => p.id === id);
      setProject(foundProject || null);
      setSkills(skillsRes.data.length > 0 ? skillsRes.data : mockSkills);
    } catch (error) {
      const foundProject = mockProjects.find(p => p.id === id);
      setProject(foundProject || null);
      setSkills(mockSkills);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMilestoneToggle = async (milestoneId: string) => {
    if (!project || togglingMilestone) return;
    
    setTogglingMilestone(milestoneId);
    try {
      const response = await projectsApi.toggleMilestone(project.id, milestoneId);
      setProject(response.data);
      
      const milestone = response.data.milestones.find(m => m.id === milestoneId);
      toast.success(milestone?.completed ? 'Milestone completed!' : 'Milestone reopened', {
        description: milestone?.title,
      });
    } catch (error: any) {
      toast.error('Error', {
        description: error.message || 'Failed to update milestone',
      });
    } finally {
      setTogglingMilestone(null);
    }
  };

  const handleEditSubmit = async (data: CreateProjectData) => {
    if (!project) return;
    
    setIsSubmitting(true);
    try {
      const response = await projectsApi.update(project.id, data);
      setProject(response.data);
      setIsEditModalOpen(false);
      toast.success('Project updated', { description: 'Changes saved successfully.' });
    } catch (error: any) {
      toast.error('Error', { description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!project) return;
    
    setIsSubmitting(true);
    try {
      await projectsApi.delete(project.id);
      toast.success('Project deleted', { description: `${project.title
      } has been removed.` });
      navigate('/projects');
    } catch (error: any) {
      toast.error('Error', { description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Project not found</h2>
        <Link to="/projects">
          <CustomButton variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Back to Projects
          </CustomButton>
        </Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'completed': 'bg-success/10 text-success border-success/20',
      'in_progress': 'bg-primary/10 text-primary border-primary/20',
      'planning': 'bg-warning/10 text-warning border-warning/20',
      'on-hold': 'bg-muted text-muted-foreground border-border',
    };
    return colors[status] || colors['on-hold'];
  };

  const getStatusLabel = (status: string) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getSkillById = (skillId: string) => {
    return skills.find(s => s.id === skillId);
  };

  const completedMilestones = project.milestones.filter(m => m.completed).length;
  const progress = project.milestones.length > 0 
    ? Math.round((completedMilestones / project.milestones.length) * 100) 
    : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link to="/projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit">
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">{project.title}</h1>
              <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(project.status)}`}>
                {getStatusLabel(project.status)}
              </span>
            </div>
            <p className="text-muted-foreground max-w-2xl">{project.description}</p>
          </div>
          <div className="flex gap-2">
            <CustomButton variant="outline" leftIcon={<Edit className="h-4 w-4" />} onClick={() => setIsEditModalOpen(true)}>
              Edit
            </CustomButton>
            <CustomButton variant="outline" className="text-destructive hover:bg-destructive/10" onClick={() => setIsDeleteModalOpen(true)}>
              <Trash2 className="h-4 w-4" />
            </CustomButton>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <CustomCard animate animationDelay={0}>
          <CustomCardContent className="text-center py-4">
            <p className="text-3xl font-bold text-foreground">{progress}%</p>
            <p className="text-sm text-muted-foreground">Progress</p>
          </CustomCardContent>
        </CustomCard>
        <CustomCard animate animationDelay={50}>
          <CustomCardContent className="text-center py-4">
            <p className="text-3xl font-bold text-foreground">{project.milestones.length}</p>
            <p className="text-sm text-muted-foreground">Total Milestones</p>
          </CustomCardContent>
        </CustomCard>
        <CustomCard animate animationDelay={100}>
          <CustomCardContent className="text-center py-4">
            <p className="text-3xl font-bold text-success">{completedMilestones}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CustomCardContent>
        </CustomCard>
        <CustomCard animate animationDelay={150}>
          <CustomCardContent className="text-center py-4">
            <p className="text-3xl font-bold text-foreground">{project.skills.length}</p>
            <p className="text-sm text-muted-foreground">Skills Used</p>
          </CustomCardContent>
        </CustomCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Milestones */}
        <CustomCard>
          <CustomCardHeader>
            <CustomCardTitle>Milestones</CustomCardTitle>
          </CustomCardHeader>
          <CustomCardContent className="space-y-3">
            {project.milestones.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No milestones yet</p>
            ) : (
              project.milestones.map((milestone) => (
                <button
                  key={milestone.id}
                  onClick={() => handleMilestoneToggle(milestone.id)}
                  disabled={togglingMilestone === milestone.id}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-lg border w-full text-left transition-all duration-200',
                    'hover:border-primary/50 hover:bg-primary/5',
                    milestone.completed ? 'border-success/30 bg-success/5' : 'border-border',
                    togglingMilestone === milestone.id && 'opacity-50'
                  )}
                >
                  {togglingMilestone === milestone.id ? (
                    <Loader2 className="h-5 w-5 text-primary animate-spin flex-shrink-0" />
                  ) : milestone.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0 hover:text-primary" />
                  )}
                  <span className={cn(
                    'flex-1 transition-all',
                    milestone.completed ? 'text-muted-foreground line-through' : 'text-foreground'
                  )}>
                    {milestone.title}
                  </span>
                  {milestone.dueDate && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(milestone.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </button>
              ))
            )}
          </CustomCardContent>
        </CustomCard>

        {/* Skills Used */}
        <CustomCard>
          <CustomCardHeader>
            <CustomCardTitle>Skills Used</CustomCardTitle>
          </CustomCardHeader>
          <CustomCardContent className="space-y-3">
            {project.skills.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No skills linked</p>
            ) : (
              project.skills.map((skillId) => {
                const skill = getSkillById(skillId);
                if (!skill) return null;
                
                const proficiencyPercent = 
                  skill.proficiency === 'beginner' ? 25 :
                  skill.proficiency === 'intermediate' ? 50 :
                  skill.proficiency === 'advanced' ? 75 : 95;

                return (
                  <div key={skillId} className="p-3 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <span className="text-xs text-muted-foreground capitalize">{skill.proficiency}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div 
                        className="h-full rounded-full gradient-primary"
                        style={{ width: `${proficiencyPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </CustomCardContent>
        </CustomCard>
      </div>

      {/* Dates */}
      {(project.startDate || project.endDate) && (
        <CustomCard>
          <CustomCardContent className="flex flex-wrap gap-6 py-4">
            {project.startDate && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Started:</span>
                <span className="text-sm text-foreground">{new Date(project.startDate).toLocaleDateString()}</span>
              </div>
            )}
            {project.endDate && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Completed:</span>
                <span className="text-sm text-foreground">{new Date(project.endDate).toLocaleDateString()}</span>
              </div>
            )}
          </CustomCardContent>
        </CustomCard>
      )}

      {/* Edit Modal */}
      <ProjectFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        project={project}
        availableSkills={skills}
        isLoading={isSubmitting}
      />

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Project"
        description={`Are you sure you want to delete "${project.title}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default ProjectDetails;
