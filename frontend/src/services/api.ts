import axios from 'axios';
import type {
  BoxDimensions,
  APIResponse,
  MaterialCostRequest,
  MaterialCostResult,
  CalculatorInfo,
  WeightRequest,
  PlanetAPIResponse
} from '../types/calculator';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging (development)
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export class CalculatorAPI {
  
  /**
   * Calculate box properties
   */
  static async calculateBox(dimensions: BoxDimensions): Promise<APIResponse> {
    try {
      const response = await api.post<APIResponse>('/box-calculator', dimensions);
      return response.data;
    } 
    catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to calculate box properties');
    }
  }

  /**
   * Calculate material cost
   */
  static async calculateMaterialCost(request: MaterialCostRequest): Promise<MaterialCostResult> {
    try {
      const response = await api.post<MaterialCostResult>('/material-cost', request);
      return response.data;
    } 
    catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to calculate material cost');
    }
  }

  /**
   * Get available materials
   */
  static async getMaterials(): Promise<Record<string, string>> {
    try {
      const response = await api.get<{data: Record<string, string>}>('/materials');
      return response.data.data;
    } 
    catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch materials');
    }
  }

  /**
   * Get calculator information
   */
  static async getCalculatorInfo(): Promise<Record<string, CalculatorInfo>> {
    try {
      const response = await api.get<{data: Record<string, CalculatorInfo>}>('/calculator-info');
      return response.data.data;
    } 
    catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch calculator info');
    }
  }

  /**
   * Health check
   */
  static async healthCheck(): Promise<{ status: string }> {
    try {
      const response = await api.get<{ status: string }>('/health');
      return response.data;
    } 
    catch (error: any) {
      throw new Error('Backend service unavailable');
    }
  }

  // Planet Calculator Methods
  /**
   * Calculate planet weights
   */
  static async calculatePlanetWeight(request: WeightRequest): Promise<PlanetAPIResponse> {
    try {
      const response = await api.post<PlanetAPIResponse>('/planet-weight', request);
      return response.data;
    } 
    catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to calculate planet weights');
    }
  }

  /**
   * Get planet information
   */
  static async getPlanets(): Promise<Record<string, any>> {
    try {
      const response = await api.get<{data: Record<string, any>}>('/planets');
      return response.data.data;
    } 
    catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch planet information');
    }
  }
}

export default CalculatorAPI;