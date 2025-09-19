import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    phone?: string;
    businessVerified: boolean;
    createdAt: string;
  };
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone?: string;
  businessVerified: boolean;
  createdAt: string;
}

class AuthService {
  private readonly apiClient;

  constructor() {
    this.apiClient = axios.create({
      baseURL: `${API_BASE_URL}/auth`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.apiClient.interceptors.request.use((config: any) => {
      const token = this.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor to handle token expiration
    this.apiClient.interceptors.response.use(
      (response: any) => response,
      (error: any) => {
        if (error.response?.status === 401) {
          this.logout();
          window.location.href = '/';
        }
        return Promise.reject(error);
      }
    );
  }

  async login(loginData: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await this.apiClient.post<AuthResponse>('/login', loginData);
      const { accessToken } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('accessToken', accessToken);
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || '로그인에 실패했습니다.');
    }
  }

  async register(registerData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await this.apiClient.post<AuthResponse>('/register', registerData);
      const { accessToken } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('accessToken', accessToken);
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || '회원가입에 실패했습니다.');
    }
  }

  async getProfile(): Promise<UserProfile> {
    try {
      const response = await this.apiClient.get<UserProfile>('/profile');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || '프로필 조회에 실패했습니다.');
    }
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    // Clear any other user-related data
    localStorage.removeItem('userProfile');
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Basic token validation (you might want to check expiration)
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  // Auth context helper methods
  getCurrentUser(): UserProfile | null {
    const userProfile = localStorage.getItem('userProfile');
    return userProfile ? JSON.parse(userProfile) : null;
  }

  setCurrentUser(user: UserProfile): void {
    localStorage.setItem('userProfile', JSON.stringify(user));
  }
}

export const authService = new AuthService();
export default authService;