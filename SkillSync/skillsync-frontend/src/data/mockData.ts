import { User, Skill, Project } from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'demo@skillsync.com',
    name: 'Demo User',
    avatar: undefined,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
];

// Mock Skills
export const mockSkills: Skill[] = [
  {
    id: 'skill-1',
    userId: 'user-1',
    name: 'React',
    category: 'frontend',
    proficiency: 'advanced',
    yearsOfExperience: 3,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'skill-2',
    userId: 'user-1',
    name: 'TypeScript',
    category: 'frontend',
    proficiency: 'advanced',
    yearsOfExperience: 2,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'skill-3',
    userId: 'user-1',
    name: 'Node.js',
    category: 'backend',
    proficiency: 'intermediate',
    yearsOfExperience: 2,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'skill-4',
    userId: 'user-1',
    name: 'PostgreSQL',
    category: 'database',
    proficiency: 'intermediate',
    yearsOfExperience: 1,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'skill-5',
    userId: 'user-1',
    name: 'Docker',
    category: 'devops',
    proficiency: 'beginner',
    yearsOfExperience: 1,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'skill-6',
    userId: 'user-1',
    name: 'Figma',
    category: 'design',
    proficiency: 'intermediate',
    yearsOfExperience: 2,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: 'project-1',
    userId: 'user-1',
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce platform with payment integration, user authentication, and admin dashboard.',
    status: 'in_progress',
    skills: ['skill-1', 'skill-2', 'skill-3', 'skill-4'],
    milestones: [
      { id: 'm1', title: 'Setup project structure', completed: true },
      { id: 'm2', title: 'Implement authentication', completed: true },
      { id: 'm3', title: 'Build product catalog', completed: false },
      { id: 'm4', title: 'Integrate payment gateway', completed: false },
    ],
    startDate: '2024-01-01',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'project-2',
    userId: 'user-1',
    title: 'Portfolio Website',
    description: 'Personal portfolio website showcasing projects and skills with a modern design.',
    status: 'completed',
    skills: ['skill-1', 'skill-2', 'skill-6'],
    milestones: [
      { id: 'm1', title: 'Design mockups', completed: true },
      { id: 'm2', title: 'Build landing page', completed: true },
      { id: 'm3', title: 'Add project gallery', completed: true },
      { id: 'm4', title: 'Deploy to production', completed: true },
    ],
    startDate: '2023-11-01',
    endDate: '2023-12-15',
    createdAt: '2023-11-01T10:00:00Z',
    updatedAt: '2023-12-15T10:00:00Z',
  },
  {
    id: 'project-3',
    userId: 'user-1',
    title: 'Task Management API',
    description: 'RESTful API for task management with user roles and permissions.',
    status: 'planned',
    skills: ['skill-3', 'skill-4', 'skill-5'],
    milestones: [
      { id: 'm1', title: 'Define API specifications', completed: false },
      { id: 'm2', title: 'Set up database schema', completed: false },
      { id: 'm3', title: 'Implement CRUD operations', completed: false },
    ],
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z',
  },
];

// Helper to generate unique IDs
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Simulate API delay
export const delay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
