import http from "@/api/http";
import { User, LoginCredentials, RegisterData, ApiResponse } from "@/types";

const STORAGE_KEYS = {
  CURRENT_USER: "current_user",
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
};

export const authApi = {
  /**
   * LOGIN
   * POST /api/auth/login/
   */
  async login(
    credentials: LoginCredentials
  ): Promise<ApiResponse<User>> {
    const res = await http.post("/api/auth/login/", credentials);

    const { access, refresh, user } = res.data;

    // ✅ Store ONLY real JWT tokens
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh);
    localStorage.setItem(
      STORAGE_KEYS.CURRENT_USER,
      JSON.stringify(user)
    );

    return {
      data: user,
      success: true,
      message: "Login successful",
    };
  },

/**
 * REGISTER + AUTO LOGIN
 * POST /api/auth/register/
 */
async register(
  data: RegisterData
): Promise<ApiResponse<User>> {
  const payload = {
    email: data.email,
    name: data.name,
    password: data.password,
    // password2: data.confirmPassword,
  };

  // 1️⃣ Register user
  await http.post("/api/auth/register/", payload);

  // 2️⃣ Auto-login immediately after register
  const loginRes = await http.post("/api/auth/login/", {
    email: data.email,
    password: data.password,
  });

  const { access, refresh, user } = loginRes.data;

  // 3️⃣ Store tokens & user (SAME as login)
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh);
  localStorage.setItem(
    STORAGE_KEYS.CURRENT_USER,
    JSON.stringify(user)
  );

  return {
    data: user,
    success: true,
    message: "Registration & login successful",
  };
},


  /**
   * LOGOUT
   */
  async logout(): Promise<ApiResponse<null>> {
    try {
      await http.post("/api/auth/logout/");
    } catch {
      // ignore backend logout failure
    }

    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);

    return { data: null, success: true };
  },

  /**
   * GET CURRENT USER
   */
  async getCurrentUser(): Promise<ApiResponse<User | null>> {
    try {
      const res = await http.get("/api/auth/me/");
      localStorage.setItem(
        STORAGE_KEYS.CURRENT_USER,
        JSON.stringify(res.data)
      );
      return { data: res.data, success: true };
    } catch {
      return { data: null, success: false };
    }
  },

  /**
   * REFRESH TOKEN
   */
  async refreshToken(): Promise<ApiResponse<string>> {
    const refresh = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    if (!refresh) {
      return { data: "", success: false };
    }

    const res = await http.post("/api/auth/token/refresh/", { refresh });

    localStorage.setItem(
      STORAGE_KEYS.ACCESS_TOKEN,
      res.data.access
    );

    return { data: res.data.access, success: true };
  },

  /**
   * PASSWORD RESET
   */
  async requestPasswordReset(email: string): Promise<ApiResponse<null>> {
    await http.post("/api/auth/password/reset/", { email });
    return { data: null, success: true };
  },

  async resetPassword(
    token: string,
    newPassword: string
  ): Promise<ApiResponse<null>> {
    await http.post("/api/auth/password/reset/confirm/", {
      token,
      password: newPassword,
    });
    return { data: null, success: true };
  },

  /**
   * LOCAL USER CACHE
   */
  getStoredUser(): User | null {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },

  /**
 * GET STORED TOKENS
 * Used by AuthContext during app initialization
 */
getStoredTokens(): {
  access: string | null;
  refresh: string | null;
} {
  return {
    access: localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
    refresh: localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
  };
},

};

