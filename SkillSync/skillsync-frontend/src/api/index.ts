// Central API exports - Ready to swap with real backend endpoints
export { authApi } from './authApi';
export { skillsApi, projectsApi } from './dataApi';
export { userApi } from './userApi';
export { settingsApi } from './settingsApi';
export { notificationsApi } from './notificationsApi';
export { dashboardApi } from './dashboardApi';

export type { 
  CreateSkillData, 
  UpdateSkillData, 
  CreateProjectData, 
  UpdateProjectData 
} from './dataApi';

export type { 
  UpdateProfileData, 
  ChangePasswordData 
} from './userApi';

export type { 
  NotificationSettings, 
  UserSettings 
} from './settingsApi';

export type { 
  DashboardStats, 
  ActivityItem 
} from './dashboardApi';
