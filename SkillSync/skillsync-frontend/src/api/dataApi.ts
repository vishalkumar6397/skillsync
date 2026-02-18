import http from "./http";
import {
  Skill,
  Project,
  ApiResponse,
  SkillCategory,
  ProficiencyLevel,
  ProjectStatus,
} from "@/types";

/* =======================
   SKILLS API
======================= */

export interface CreateSkillData {
  name: string;
  category: SkillCategory;
  proficiency: ProficiencyLevel;
  yearsOfExperience?: number;
}

export interface UpdateSkillData extends Partial<CreateSkillData> {}

export const skillsApi = {
  /**
   * GET /api/skills/
   */
  async getAll(): Promise<ApiResponse<Skill[]>> {
    const res = await http.get("/api/skills/");
    return { data: res.data, success: true };
  },

  /**
   * GET /api/skills/:id/
   */
  async getById(id: number): Promise<ApiResponse<Skill>> {
    const res = await http.get(`/api/skills/${id}/`);
    return { data: res.data, success: true };
  },

  /**
   * POST /api/skills/
   */
  async create(data: CreateSkillData): Promise<ApiResponse<Skill>> {
    const res = await http.post("/api/skills/", {
      name: data.name,
      category: data.category,
      proficiency: data.proficiency,
      years_of_experience: data.yearsOfExperience ?? 0,
    });

    return {
      data: res.data,
      success: true,
      message: "Skill created successfully",
    };
  },

  /**
   * PUT /api/skills/:id/
   */
  async update(
    id: number,
    data: UpdateSkillData
  ): Promise<ApiResponse<Skill>> {
    const res = await http.put(`/api/skills/${id}/`, {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.category !== undefined && { category: data.category }),
      ...(data.proficiency !== undefined && {
        proficiency: data.proficiency,
      }),
      ...(data.yearsOfExperience !== undefined && {
        years_of_experience: data.yearsOfExperience,
      }),
    });

    return {
      data: res.data,
      success: true,
      message: "Skill updated successfully",
    };
  },

  /**
   * DELETE /api/skills/:id/
   */
  async delete(id: number): Promise<ApiResponse<null>> {
    await http.delete(`/api/skills/${id}/`);
    return {
      data: null,
      success: true,
      message: "Skill deleted successfully",
    };
  },
};

/* =======================
   PROJECTS API
======================= */

export interface CreateProjectData {
  title: string;          // ✅ matches Django
  description: string;
  status: ProjectStatus;
}
export interface UpdateProjectData
  extends Partial<CreateProjectData> {}

export const projectsApi = {
  /**
   * GET /api/projects/
   */
  async getAll(): Promise<ApiResponse<Project[]>> {
    const res = await http.get("/api/projects/");
    return { data: res.data, success: true };
  },

  /**
   * GET /api/projects/:id/
   */
  async getById(id: number): Promise<ApiResponse<Project>> {
    const res = await http.get(`/api/projects/${id}/`);
    return { data: res.data, success: true };
  },

  /**
   * POST /api/projects/
   */
  async create(data: CreateProjectData): Promise<ApiResponse<Project>> {
  const res = await http.post("/api/projects/", {
    title: data.title,
    description: data.description,
    status: data.status,
  });

  return {
    data: res.data,
    success: true,
    message: "Project created successfully",
  };
},
  /**
   * PUT /api/projects/:id/
   */
  async update(
    id: number,
    data: UpdateProjectData
  ): Promise<ApiResponse<Project>> {
    const res = await http.put(`/api/projects/${id}/`, {
...(data.title !== undefined && { title: data.title }),
      ...(data.description !== undefined && {
        description: data.description,
      }),
      ...(data.status !== undefined && { status: data.status }),
    });

    return {
      data: res.data,
      success: true,
      message: "Project updated successfully",
    };
  },

  /**
   * DELETE /api/projects/:id/
   */
  async delete(id: number): Promise<ApiResponse<null>> {
    await http.delete(`/api/projects/${id}/`);
    return {
      data: null,
      success: true,
      message: "Project deleted successfully",
    };
  },

  /**
   * PATCH /api/projects/:projectId/milestones/:milestoneId/
   */
  async toggleMilestone(
    projectId: number,
    milestoneId: number
  ): Promise<ApiResponse<{ status: string }>> {
    const res = await http.patch(
      `/api/projects/${projectId}/milestones/${milestoneId}/`
    );

    return {
      data: res.data,
      success: true,
    };
  },
};
