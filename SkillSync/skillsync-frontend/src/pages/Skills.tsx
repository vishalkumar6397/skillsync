import React, { useState, useEffect } from 'react';
import { Zap, Plus, Search, Edit, Trash2, MoreVertical } from 'lucide-react';
import { CustomCard, CustomCardContent } from '@/components/custom/CustomCard';
import { CustomButton } from '@/components/custom/CustomButton';
import { SkillFormModal } from '@/components/features/SkillFormModal';
import { ConfirmModal } from '@/components/custom/CustomModal';
import { SkeletonCard } from '@/components/custom/SkeletonCard';
import { skillsApi, CreateSkillData } from '@/api/dataApi';
import { Skill, SkillCategory } from '@/types';
import { mockSkills } from '@/data/mockData';
import { toast } from 'sonner';

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<SkillCategory | 'all'>('all');
  
  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Load skills on mount
  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    setIsLoading(true);
    try {
      const response = await skillsApi.getAll();
      // If no skills in localStorage, use mock data
      setSkills(response.data.length > 0 ? response.data : mockSkills);
    } catch (error) {
      setSkills(mockSkills);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedSkill(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsFormModalOpen(true);
    setOpenMenuId(null);
  };

  const handleDeleteClick = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsDeleteModalOpen(true);
    setOpenMenuId(null);
  };

  const handleFormSubmit = async (data: CreateSkillData) => {
    setIsSubmitting(true);
    try {
      if (selectedSkill) {
        const response = await skillsApi.update(selectedSkill.id, data);
        setSkills(prev => prev.map(s => s.id === selectedSkill.id ? response.data : s));
        toast.success('Skill updated', { description: `${data.name} has been updated successfully.` });
      } else {
        const response = await skillsApi.create(data);
        setSkills(prev => [...prev, response.data]);
        toast.success('Skill added', { description: `${data.name} has been added to your skills.` });
      }
      setIsFormModalOpen(false);
    } catch (error: any) {
      toast.error('Error', { description: error.message || 'Something went wrong' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedSkill) return;
    
    setIsSubmitting(true);
    try {
      await skillsApi.delete(selectedSkill.id);
      setSkills(prev => prev.filter(s => s.id !== selectedSkill.id));
      toast.success('Skill deleted', { description: `${selectedSkill.name} has been removed.` });
      setIsDeleteModalOpen(false);
    } catch (error: any) {
      toast.error('Error', { description: error.message || 'Failed to delete skill' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      frontend: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      backend: 'bg-green-500/10 text-green-400 border-green-500/20',
      database: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      devops: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      mobile: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
      design: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      other: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    };
    return colors[category] || colors.other;
  };

  const getProficiencyWidth = (proficiency: string) => {
    const widths: Record<string, number> = {
      beginner: 25,
      intermediate: 50,
      advanced: 75,
      expert: 95,
    };
    return widths[proficiency] || 25;
  };

  // Filter skills
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || skill.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories: { value: SkillCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'database', label: 'Database' },
    { value: 'devops', label: 'DevOps' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'design', label: 'Design' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Skills</h1>
          <p className="text-muted-foreground mt-1">Manage and track your technical skills</p>
        </div>
        <CustomButton variant="gradient" leftIcon={<Plus className="h-4 w-4" />} onClick={handleCreate}>
          Add Skill
        </CustomButton>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-secondary/50 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value as SkillCategory | 'all')}
          className="h-10 px-4 rounded-lg border border-border bg-secondary/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>

      {/* Skills Grid */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} variant="skill" />
          ))}
        </div>
      ) : filteredSkills.length === 0 ? (
        <div className="text-center py-12">
          <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No skills found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || filterCategory !== 'all' ? 'Try adjusting your filters' : 'Add your first skill to get started'}
          </p>
          {!searchQuery && filterCategory === 'all' && (
            <CustomButton variant="default" onClick={handleCreate}>Add Your First Skill</CustomButton>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map((skill, index) => (
            <CustomCard key={skill.id} hover animate animationDelay={index * 50} className="relative group">
              <CustomCardContent className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{skill.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${getCategoryColor(skill.category)}`}>
                        {skill.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Actions Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === skill.id ? null : skill.id)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                    
                    {openMenuId === skill.id && (
                      <div className="absolute right-0 top-full mt-1 w-32 bg-card border border-border rounded-lg shadow-lg z-10 py-1">
                        <button
                          onClick={() => handleEdit(skill)}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-foreground hover:bg-secondary"
                        >
                          <Edit className="h-4 w-4" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(skill)}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Proficiency</span>
                    <span className="text-foreground capitalize">{skill.proficiency}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div 
                      className="h-full rounded-full gradient-primary"
                      style={{ width: `${getProficiencyWidth(skill.proficiency)}%` }}
                    />
                  </div>
                </div>

                {skill.yearsOfExperience && (
                  <p className="text-sm text-muted-foreground">
                    {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'year' : 'years'} of experience
                  </p>
                )}
              </CustomCardContent>
            </CustomCard>
          ))}
        </div>
      )}

      {/* Form Modal */}
      <SkillFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        skill={selectedSkill}
        isLoading={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Skill"
        description={`Are you sure you want to delete "${selectedSkill?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default Skills;
