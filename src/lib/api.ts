import axios from "axios";

// API Base URL
export const API_BASE_URL = "https://angela-daughter-admin.onrender.com/api/v1";

// Auth Token Key
export const AUTH_TOKEN_KEY = "angela_auth_token";

// Create Axios Client
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interface Types
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
}

export interface HomeData {
  _id?: string;
  id?: string;
  PPG: string;
  RPG: string;
  BPG: string;
  DOUBLE_DOUBLES: string;
  REBOUNDS: string;
  frist_img: string; // URL of the uploaded image
  second_img: string; // URL of the uploaded image
  createdAt?: string;
  updatedAt?: string;
}

export interface HighlightData {
  _id?: string;
  id?: string;
  MainVideo_url: string; // URL of primary video
  video_type: string; // tag/category
  video_name: string; // display name
  videos: string[]; // supporting video URLs
  feedVideos: string[]; // feed video URLs
  title: string; // feed title
  createdAt?: string;
  updatedAt?: string;
}

// API Call Functions
export const apiService = {
  // --- AUTH ---
  login: async (
    credentials: Record<string, string>,
  ): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", credentials);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
  },

  // --- HOME PAGE ---
  getActiveHome: async (): Promise<HomeData> => {
    const response = await api.get<HomeData>("/home/active");
    return response.data;
  },

  createHome: async (formData: FormData): Promise<HomeData> => {
    const response = await api.post<HomeData>("/home/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateHome: async (id: string, formData: FormData): Promise<HomeData> => {
    const response = await api.patch<HomeData>(`/home/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteHome: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(
      `/home/delete/${id}`,
    );
    return response.data;
  },

  // --- HIGHLIGHTS ---
  getActiveHighlights: async (): Promise<HighlightData[]> => {
    const response = await api.get<HighlightData[]>("/highlights/active");
    return response.data;
  },

  getAllHighlights: async (): Promise<HighlightData[]> => {
    const response = await api.get<HighlightData[]>("/highlights/getAll");
    return response.data;
  },

  createHighlight: async (formData: FormData): Promise<HighlightData> => {
    const response = await api.post<HighlightData>(
      "/highlights/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },

  updateHighlight: async (
    id: string,
    formData: FormData,
  ): Promise<HighlightData> => {
    const response = await api.patch<HighlightData>(
      `/highlights/update/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },

  deleteHighlight: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(
      `/highlights/delete/${id}`,
    );
    return response.data;
  },
};
