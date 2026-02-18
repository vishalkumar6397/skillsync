import { ApiResponse } from '@/types';
import http from './http';

/* ============================
   FRONTEND TYPES (UNCHANGED)
============================ */

export interface DashboardStats {
  totalSkills: number;
  totalProjects: number;
  completedProjects: number;
  activeProjects: number;
  planningProjects: number;
  onHoldProjects: number;
  skillsByCategory: Record<string, number>;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type:
    | 'skill_added'
    | 'skill_updated'
    | 'project_created'
    | 'project_updated'
    | 'milestone_completed';
  title: string;
  description: string;
  timestamp: string;
}

/* ============================
   BACKEND RESPONSE TYPES
============================ */

interface BackendDashboardStats {
  total_skills: number;
  total_projects: number;
  completed_projects: number;
}

interface BackendSkillCategory {
  category: string;
  count: number;
}

interface BackendProjectProgress {
  project_id: number;
  title: string;
  progress: number;
}

interface BackendDashboardProgress {
  skills_by_category: BackendSkillCategory[];
  project_progress: BackendProjectProgress[];
}

interface BackendActivityItem {
  type: 'skill' | 'project' | 'notification';
  message: string;
  date: string;
}

/* ============================
   DASHBOARD API
============================ */

export const dashboardApi = {
  /**
   * Combined dashboard data
   * GET /api/dashboard/stats/
   * GET /api/dashboard/progress/
   * GET /api/dashboard/activity/
   */
  async getStats(): Promise<ApiResponse<DashboardStats>> {
    const [statsRes, progressRes, activityRes] = await Promise.all([
      http.get<BackendDashboardStats>('/api/dashboard/stats/'),
      http.get<BackendDashboardProgress>('/api/dashboard/progress/'),
      http.get<BackendActivityItem[]>('/api/dashboard/activity/'),
    ]);

    const stats = statsRes.data;
    const progress = progressRes.data;
    const activity = activityRes.data;

    /* ---- skills_by_category → Record<string, number> ---- */
    const skillsByCategory: Record<string, number> = {};
    progress.skills_by_category.forEach((item) => {
      skillsByCategory[item.category] = item.count;
    });

    /* ---- backend activity → frontend ActivityItem[] ---- */
    const recentActivity: ActivityItem[] = activity.map(
      (item, index) => ({
        id: `activity-${index}`,
        type: mapActivityType(item.type),
        title: item.message,
        description: item.message,
        timestamp: item.date,
      })
    );

    return {
      success: true,
      data: {
        totalSkills: stats.total_skills,
        totalProjects: stats.total_projects,
        completedProjects: stats.completed_projects,

        /* Derived frontend-only values */
        activeProjects:
          stats.total_projects - stats.completed_projects,
        planningProjects: 0,
        onHoldProjects: 0,

        skillsByCategory,
        recentActivity,
      },
    };
  },

  /**
   * Recent activity only
   * GET /api/dashboard/activity/
   */
  async getRecentActivity(
    limit: number = 10
  ): Promise<ApiResponse<ActivityItem[]>> {
    const res = await http.get<BackendActivityItem[]>(
      '/api/dashboard/activity/'
    );

    const activities = res.data.slice(0, limit).map(
      (item, index): ActivityItem => ({
        id: `activity-${index}`,
        type: mapActivityType(item.type),
        title: item.message,
        description: item.message,
        timestamp: item.date,
      })
    );

    return {
      success: true,
      data: activities,
    };
  },

  /**
   * Progress analytics
   * GET /api/dashboard/progress/
   */
  async getProgress(): Promise<
    ApiResponse<{
      overallProgress: number;
      milestonesCompleted: number;
      milestonesTotal: number;
      streakDays: number;
    }>
  > {
    const res = await http.get<BackendDashboardProgress>(
      '/api/dashboard/progress/'
    );

    const projects = res.data.project_progress;

    const milestonesTotal = projects.length;
    const milestonesCompleted = projects.filter(
      (p) => p.progress === 100
    ).length;

    const overallProgress =
      milestonesTotal > 0
        ? Math.round(
            projects.reduce(
              (sum, p) => sum + p.progress,
              0
            ) / milestonesTotal
          )
        : 0;

    return {
      success: true,
      data: {
        overallProgress,
        milestonesCompleted,
        milestonesTotal,
        streakDays: 7, // frontend-driven (can be backend later)
      },
    };
  },
};

/* ============================
   HELPERS
============================ */

function mapActivityType(
  type: BackendActivityItem['type']
): ActivityItem['type'] {
  switch (type) {
    case 'skill':
      return 'skill_added';
    case 'project':
      return 'project_created';
    case 'notification':
      return 'project_updated';
    default:
      return 'skill_added';
  }
}
