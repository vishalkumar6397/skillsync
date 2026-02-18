import http from "./http";
import { User, ApiResponse } from "@/types";

/* =========================
   Types
========================= */

export interface UpdateProfileData {
  name?: string;
  avatar?: string; // URL or handled separately via uploadAvatar
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

/* =========================
   User API
========================= */

export const userApi = {
  /**
   * Get user profile
   * Django: GET /api/users/:id/
   */
  async getProfile(userId: string): Promise<ApiResponse<User>> {
    const res = await http.get(`/api/users/${userId}/`);

    return {
      data: res.data,
      success: true,
    };
  },

  /**
   * Update user profile
   * Django: PUT /api/users/:id/
   */
  async updateProfile(
    userId: string,
    data: UpdateProfileData
  ): Promise<ApiResponse<User>> {
    const res = await http.put(`/api/users/${userId}/`, data);

    return {
      data: res.data,
      success: true,
      message: "Profile updated successfully",
    };
  },

  /**
   * Change password
   * Django: POST /api/users/:id/change-password/
   */
  async changePassword(
    userId: string,
    data: ChangePasswordData
  ): Promise<ApiResponse<null>> {
    await http.post(`/api/users/${userId}/change-password/`, {
      current_password: data.currentPassword,
      new_password: data.newPassword,
    });

    return {
      data: null,
      success: true,
      message: "Password changed successfully",
    };
  },

  /**
   * Upload avatar
   * Django: POST /api/users/:id/avatar/
   */
  async uploadAvatar(
    userId: string,
    file: File
  ): Promise<ApiResponse<{ avatarUrl: string }>> {
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await http.post(
      `/api/users/${userId}/avatar/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return {
      data: {
        avatarUrl: res.data.avatar, // Django returns avatar URL
      },
      success: true,
      message: "Avatar uploaded successfully",
    };
  },

  /**
   * Delete user account
   * Django: DELETE /api/users/:id/
   */
  async deleteAccount(userId: string): Promise<ApiResponse<null>> {
    await http.delete(`/api/users/${userId}/`);

    // Cleanup frontend auth state
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    return {
      data: null,
      success: true,
      message: "Account deleted successfully",
    };
  },

  /**
   * User statistics
   * Django: GET /api/users/:id/stats/
   */
  async getStats(
    userId: string
  ): Promise<
    ApiResponse<{
      totalSkills: number;
      totalProjects: number;
      completedProjects: number;
      activeProjects: number;
      memberSince: string;
    }>
  > {
    const res = await http.get(`/api/users/${userId}/stats/`);

    return {
      data: res.data,
      success: true,
    };
  },
};
