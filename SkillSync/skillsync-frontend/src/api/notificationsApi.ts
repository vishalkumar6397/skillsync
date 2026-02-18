import http from "./http";
import { ApiResponse } from "@/types";

/**
 * IMPORTANT:
 * This interface represents how NOTIFICATIONS ARE USED IN UI.
 * Backend field names are mapped if needed.
 */
export interface Notification {
  id: number;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

/**
 * Notifications API (Django-backed)
 */
export const notificationsApi = {
  /**
   * Get all notifications
   * GET /api/notifications/
   */
  async getAll(): Promise<ApiResponse<Notification[]>> {
    const res = await http.get("/api/notifications/");
    return {
      data: res.data,
      success: true,
    };
  },

  /**
   * Get unread notifications count
   * GET /api/notifications/unread-count/
   */
  async getUnreadCount(): Promise<ApiResponse<{ unread: number }>> {
    const res = await http.get("/api/notifications/unread-count/");
    return {
      data: res.data,
      success: true,
    };
  },

  /**
   * Mark a notification as read
   * PATCH /api/notifications/:id/read/
   */
  async markAsRead(id: number): Promise<ApiResponse<null>> {
    await http.patch(`/api/notifications/${id}/read/`);
    return {
      data: null,
      success: true,
    };
  },

  /**
   * Mark ALL notifications as read
   * POST /api/notifications/mark-all-read/
   */
  async markAllAsRead(): Promise<ApiResponse<null>> {
    await http.post("/api/notifications/mark-all-read/");
    return {
      data: null,
      success: true,
      message: "All notifications marked as read",
    };
  },

  /**
   * Delete a single notification
   * DELETE /api/notifications/:id/
   */
  async delete(id: number): Promise<ApiResponse<null>> {
    await http.delete(`/api/notifications/${id}/`);
    return {
      data: null,
      success: true,
      message: "Notification deleted",
    };
  },

  /**
   * Clear ALL notifications
   * DELETE /api/notifications/clear/
   */
  async clearAll(): Promise<ApiResponse<null>> {
    await http.delete("/api/notifications/clear/");
    return {
      data: null,
      success: true,
      message: "All notifications cleared",
    };
  },
};
