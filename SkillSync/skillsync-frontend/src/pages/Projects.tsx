import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FolderKanban, Plus, Search, Edit, Trash2, MoreVertical } from 'lucide-react';
import { CustomCard, CustomCardContent } from '@/components/custom/CustomCard';
import { CustomButton } from '@/components/custom/CustomButton';
import { ProjectFormModal } from '@/components/features/ProjectFormModal';
import { ConfirmModal } from '@/components/custom/CustomModal';
import { SkeletonCard } from '@/components/custom/SkeletonCard';
import { projectsApi, skillsApi, CreateProjectData } from '@/api/dataApi';
import { Project, Skill, ProjectStatus } from '@/types';
import { mockProjects, mockSkills } from '@/data/mockData';
import { toast } from 'sonner';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<ProjectStatus | 'all'>('all');

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [projectsRes, skillsRes] = await Promise.all([
        projectsApi.getAll(),
        skillsApi.getAll(),
      ]);
      setProjects(projectsRes.data.length > 0 ? projectsRes.data : mockProjects);
      setSkills(skillsRes.data.length > 0 ? skillsRes.data : mockSkills);
    } catch (error) {
      setProjects(mockProjects);
      setSkills(mockSkills);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedProject(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsFormModalOpen(true);
    setOpenMenuId(null);
  };

  const handleDeleteClick = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
    setOpenMenuId(null);
  };

  const handleFormSubmit = async (data: CreateProjectData) => {
    setIsSubmitting(true);
    try {
      if (selectedProject) {
        const response = await projectsApi.update(selectedProject.id, data);
        setProjects(prev => prev.map(p => p.id === selectedProject.id ? response.data : p));
        toast.success('Project updated', { description: `${data.title} has been updated successfully.` });
      } else {
        const response = await projectsApi.create(data);
        setProjects(prev => [...prev, response.data]);
        toast.success('Project created', { description: `${data.title} has been created successfully.` });
      }
      setIsFormModalOpen(false);
    } catch (error: any) {
      toast.error('Error', { description: error.message || 'Something went wrong' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProject) return;

    setIsSubmitting(true);
    try {
      await projectsApi.delete(selectedProject.id);
      setProjects(prev => prev.filter(p => p.id !== selectedProject.id));
      toast.success('Project deleted', { description: `${selectedProject.title} has been removed.` });
      setIsDeleteModalOpen(false);
    } catch (error: any) {
      toast.error('Error', { description: error.message || 'Failed to delete project' });
    } finally {
      setIsSubmitting(false);
    }
  };

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
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getSkillName = (skillId: string) => {
    const skill = skills.find(s => s.id === skillId);
    return skill?.name || 'Unknown';
  };

  const getCompletedMilestones = (project: Project) => {
    const completed = project.milestones.filter(m => m.completed).length;
    return `${completed}/${project.milestones.length}`;
  };

  // Filter projects
  const filteredProjects = projects.filter((project) => {
  const title = project.title ?? '';
  const description = project.description ?? '';
  const status = project.status ?? 'planned';

  const query = searchQuery.toLowerCase();

  const matchesSearch =
    title.toLowerCase().includes(query) ||
    description.toLowerCase().includes(query);

  const matchesStatus =
    filterStatus === 'all' || status === filterStatus;

  return matchesSearch && matchesStatus;
});


  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'planning', label: 'Planning' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'on-hold', label: 'On Hold' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">Track and manage your development projects</p>
        </div>
        <CustomButton variant="gradient" leftIcon={<Plus className="h-4 w-4" />} onClick={handleCreate}>
          New Project
        </CustomButton>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-secondary/50 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as ProjectStatus | 'all')}
          className="h-10 px-4 rounded-lg border border-border bg-secondary/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {statusOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} variant="project" />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <FolderKanban className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || filterStatus !== 'all' ? 'Try adjusting your filters' : 'Create your first project to get started'}
          </p>
          {!searchQuery && filterStatus === 'all' && (
            <CustomButton variant="default" onClick={handleCreate}>Create Your First Project</CustomButton>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <CustomCard key={project.id} hover animate animationDelay={index * 50} className="h-full group relative">
              <CustomCardContent className="space-y-4 h-full flex flex-col">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                      <FolderKanban className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link to={`/projects/${project.id}`}>
                        <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                      </Link>
                    </div>
                  </div>

                  {/* Actions Menu */}
                  <div className="relative flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenMenuId(openMenuId === project.id ? null : project.id);
                      }}
                      className="p-1.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {openMenuId === project.id && (
                      <div className="absolute right-0 top-full mt-1 w-32 bg-card border border-border rounded-lg shadow-lg z-10 py-1">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleEdit(project);
                          }}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-foreground hover:bg-secondary"
                        >
                          <Edit className="h-4 w-4" /> Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteClick(project);
                          }}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                  {project.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1">
{(project.skills ?? []).slice(0, 3).map((skillId) => (
                    <span key={skillId} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                      {getSkillName(skillId)}
                    </span>
                  ))}
{(project.skills?.length ?? 0) > 3 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                      +{project.skills.length - 3}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(project.status)}`}>
                    {getStatusLabel(project.status)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {getCompletedMilestones(project)} milestones
                  </span>
                </div>
              </CustomCardContent>
            </CustomCard>
          ))}
        </div>
      )}

      {/* Form Modal */}
      <ProjectFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        project={selectedProject}
        availableSkills={skills}
        isLoading={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Project"
        description={`Are you sure you want to delete "${selectedProject?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default Projects;
