import http from "./http";
import { ApiResponse } from "@/types";

/* =======================
   Types (UNCHANGED)
   ======================= */

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyDigest: boolean;
  projectUpdates: boolean;
  skillReminders: boolean;
}

export interface UserSettings {
  language: "en" | "es" | "fr" | "de";
  timezone: string;
  theme: "light" | "dark" | "system";
  twoFactorEnabled: boolean;
}

/* =======================
   Settings API (REAL)
   ======================= */

export const settingsApi = {
  /**
   * Get notification settings
   * Django: GET /api/settings/notifications/
   */
  async getNotificationSettings(): Promise<ApiResponse<NotificationSettings>> {
    const res = await http.get("/api/settings/notifications/");
    return {
      data: res.data,
      success: true,
    };
  },

  /**
   * Update notification settings
   * Django: PUT /api/settings/notifications/
   */
  async updateNotificationSettings(
    settings: Partial<NotificationSettings>
  ): Promise<ApiResponse<NotificationSettings>> {
    const res = await http.put("/api/settings/notifications/", settings);
    return {
      data: res.data,
      success: true,
      message: "Notification settings updated",
    };
  },

  /**
   * Get user settings
   * Django: GET /api/settings/
   */
  async getUserSettings(): Promise<ApiResponse<UserSettings>> {
    const res = await http.get("/api/settings/");
    return {
      data: res.data,
      success: true,
    };
  },

  /**
   * Update user settings
   * Django: PUT /api/settings/
   */
  async updateUserSettings(
    settings: Partial<UserSettings>
  ): Promise<ApiResponse<UserSettings>> {
    const res = await http.put("/api/settings/", settings);
    return {
      data: res.data,
      success: true,
      message: "Settings updated successfully",
    };
  },

  /**
   * Enable two-factor authentication
   * Django: POST /api/settings/2fa/enable/
   */
  async enableTwoFactor(): Promise<
    ApiResponse<{ qrCode: string; secret?: string }>
  > {
    const res = await http.post("/api/settings/2fa/enable/");
    return {
      data: res.data,
      success: true,
      message: "Two-factor authentication enabled",
    };
  },

  /**
   * Disable two-factor authentication
   * Django: POST /api/settings/2fa/disable/
   */
  async disableTwoFactor(
    code: string
  ): Promise<ApiResponse<null>> {
    const res = await http.post("/api/settings/2fa/disable/", { code });
    return {
      data: null,
      success: true,
      message: "Two-factor authentication disabled",
    };
  },

  /**
   * Export user data (GDPR)
   * Django: GET /api/settings/export/
   */
  async exportUserData(): Promise<
    ApiResponse<{ downloadUrl: string }>
  > {
    const res = await http.get("/api/settings/export/", {
      responseType: "blob",
    });

    const downloadUrl = window.URL.createObjectURL(res.data);

    return {
      data: { downloadUrl },
      success: true,
      message: "Data export ready",
    };
  },
};
