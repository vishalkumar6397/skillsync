import React, { useState, useEffect } from 'react';
import { CustomModal } from '@/components/custom/CustomModal';
import { CustomInput } from '@/components/custom/CustomInput';
import { CustomSelect } from '@/components/custom/CustomSelect';
import { CustomButton } from '@/components/custom/CustomButton';
import { Skill, SkillCategory, ProficiencyLevel } from '@/types';
import { CreateSkillData } from '@/api/dataApi';

interface SkillFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateSkillData) => Promise<void>;
  skill?: Skill | null;
  isLoading?: boolean;
}

const categoryOptions = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'database', label: 'Database' },
  { value: 'devops', label: 'DevOps' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'design', label: 'Design' },
  { value: 'other', label: 'Other' },
];

const proficiencyOptions = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' },
];

export const SkillFormModal: React.FC<SkillFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  skill,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<CreateSkillData>({
    name: '',
    category: 'frontend',
    proficiency: 'beginner',
    yearsOfExperience: undefined,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditing = !!skill;

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name,
        category: skill.category,
        proficiency: skill.proficiency,
        yearsOfExperience: skill.yearsOfExperience,
      });
    } else {
      setFormData({
        name: '',
        category: 'frontend',
        proficiency: 'beginner',
        yearsOfExperience: undefined,
      });
    }
    setErrors({});
  }, [skill, isOpen]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Skill name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Skill name must be at least 2 characters';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Skill name must be less than 50 characters';
    }

    if (formData.yearsOfExperience !== undefined) {
      if (formData.yearsOfExperience < 0) {
        newErrors.yearsOfExperience = 'Years cannot be negative';
      } else if (formData.yearsOfExperience > 50) {
        newErrors.yearsOfExperience = 'Years cannot exceed 50';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    await onSubmit(formData);
  };

  const handleChange = (field: keyof CreateSkillData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Skill' : 'Add New Skill'}
      description={isEditing ? 'Update the skill details below' : 'Track a new skill in your portfolio'}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <CustomInput
          label="Skill Name"
          placeholder="e.g., React, Python, Docker"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
        />

        <CustomSelect
          label="Category"
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value as SkillCategory)}
          options={categoryOptions}
        />

        <CustomSelect
          label="Proficiency Level"
          value={formData.proficiency}
          onChange={(e) => handleChange('proficiency', e.target.value as ProficiencyLevel)}
          options={proficiencyOptions}
        />

        <CustomInput
          label="Years of Experience (optional)"
          type="number"
          placeholder="e.g., 3"
          value={formData.yearsOfExperience || ''}
          onChange={(e) => handleChange('yearsOfExperience', e.target.value ? Number(e.target.value) : undefined)}
          error={errors.yearsOfExperience}
          min={0}
          max={50}
        />

        <div className="flex gap-3 justify-end pt-4 border-t border-border">
          <CustomButton type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </CustomButton>
          <CustomButton type="submit" variant="gradient" isLoading={isLoading}>
            {isEditing ? 'Update Skill' : 'Add Skill'}
          </CustomButton>
        </div>
      </form>
    </CustomModal>
  );
};
