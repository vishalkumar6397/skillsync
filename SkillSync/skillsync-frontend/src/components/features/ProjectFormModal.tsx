import React, { useState, useEffect } from 'react';
import { Plus, Trash2, GripVertical, Calendar } from 'lucide-react';
import { CustomModal } from '@/components/custom/CustomModal';
import { CustomInput } from '@/components/custom/CustomInput';
import { CustomSelect } from '@/components/custom/CustomSelect';
import { CustomButton } from '@/components/custom/CustomButton';
import { Project, ProjectStatus, Skill } from '@/types';
import { CreateProjectData } from '@/api/dataApi';
import { cn } from '@/lib/utils';

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProjectData) => Promise<void>;
  project?: Project | null;
  availableSkills: Skill[];
  isLoading?: boolean;
}

interface MilestoneInput {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

const statusOptions = [
  { value: 'planning', label: 'Planning' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  // { value: 'on-hold', label: 'On Hold' },
];

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  project,
  availableSkills,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'plann' as ProjectStatus,
    skills: [] as string[],
    startDate: '',
    endDate: '',
  });
  const [milestones, setMilestones] = useState<MilestoneInput[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newMilestone, setNewMilestone] = useState('');

  const isEditing = !!project;

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.title,
        description: project.description,
        status: project.status,
        skills: project.skills,
        startDate: project.startDate || '',
        endDate: project.endDate || '',
      });
      setMilestones(project.milestones.map(m => ({ ...m, id: m.id })));
    } else {
      setFormData({
        name: '',
        description: '',
        status: 'planned',
        skills: [],
        startDate: '',
        endDate: '',
      });
      setMilestones([]);
    }
    setErrors({});
    setNewMilestone('');
  }, [project, isOpen]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Project name must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;

  await onSubmit({
    title: formData.name,           // ✅ backend expects "title"
    description: formData.description,
    status: formData.status,
    milestones: milestones.map(m => ({
      title: m.title,
      is_completed: m.completed,
    })),
  });
};


  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSkillToggle = (skillId: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skillId)
        ? prev.skills.filter(id => id !== skillId)
        : [...prev.skills, skillId],
    }));
  };

  const addMilestone = () => {
    if (!newMilestone.trim()) return;
    setMilestones(prev => [
      ...prev,
      { id: `temp-${Date.now()}`, title: newMilestone.trim(), completed: false },
    ]);
    setNewMilestone('');
  };

  const removeMilestone = (id: string) => {
    setMilestones(prev => prev.filter(m => m.id !== id));
  };

  const updateMilestone = (id: string, updates: Partial<MilestoneInput>) => {
    setMilestones(prev =>
      prev.map(m => (m.id === id ? { ...m, ...updates } : m))
    );
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Project' : 'Create New Project'}
      description={isEditing ? 'Update the project details below' : 'Set up a new project to track'}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <CustomInput
            label="Project Name"
            placeholder="e.g., E-commerce Platform"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={errors.name}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">Description</label>
            <textarea
              placeholder="Describe your project..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className={cn(
                'flex w-full rounded-lg border bg-secondary/50 px-4 py-3 text-sm text-foreground',
                'placeholder:text-muted-foreground resize-none',
                'transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
                errors.description
                  ? 'border-destructive focus:ring-destructive/50'
                  : 'border-border hover:border-primary/50'
              )}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <CustomSelect
              label="Status"
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value as ProjectStatus)}
              options={statusOptions}
            />
            <CustomInput
              label="Start Date (optional)"
              type="date"
              value={formData.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
            />
          </div>
        </div>

        {/* Skills Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">Skills Used</label>
          <div className="flex flex-wrap gap-2 p-4 rounded-lg border border-border bg-secondary/30 min-h-[60px]">
            {availableSkills.length === 0 ? (
              <p className="text-sm text-muted-foreground">No skills available. Add skills first.</p>
            ) : (
              availableSkills.map(skill => (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => handleSkillToggle(skill.id)}
                  className={cn(
                    'px-3 py-1.5 text-sm rounded-full border transition-all',
                    formData.skills.includes(skill.id)
                      ? 'bg-primary/20 border-primary/50 text-primary'
                      : 'bg-secondary border-border text-muted-foreground hover:border-primary/30'
                  )}
                >
                  {skill.name}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Milestones */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">Milestones</label>
          
          {/* Add new milestone */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a milestone..."
              value={newMilestone}
              onChange={(e) => setNewMilestone(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addMilestone())}
              className="flex-1 h-10 rounded-lg border border-border bg-secondary/50 px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <CustomButton type="button" variant="outline" onClick={addMilestone}>
              <Plus className="h-4 w-4" />
            </CustomButton>
          </div>

          {/* Milestone list */}
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-border bg-secondary/30 group"
              >
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                <input
                  type="checkbox"
                  checked={milestone.completed}
                  onChange={(e) => updateMilestone(milestone.id, { completed: e.target.checked })}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <input
                  type="text"
                  value={milestone.title}
                  onChange={(e) => updateMilestone(milestone.id, { title: e.target.value })}
                  className={cn(
                    'flex-1 bg-transparent text-sm text-foreground focus:outline-none',
                    milestone.completed && 'line-through text-muted-foreground'
                  )}
                />
                <input
                  type="date"
                  value={milestone.dueDate || ''}
                  onChange={(e) => updateMilestone(milestone.id, { dueDate: e.target.value })}
                  className="text-xs text-muted-foreground bg-transparent border-none focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeMilestone(milestone.id)}
                  className="p-1 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            {milestones.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No milestones yet. Add some to track your progress.
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4 border-t border-border">
          <CustomButton type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </CustomButton>
          <CustomButton type="submit" variant="gradient" isLoading={isLoading}>
            {isEditing ? 'Update Project' : 'Create Project'}
          </CustomButton>
        </div>
      </form>
    </CustomModal>
  );
};
