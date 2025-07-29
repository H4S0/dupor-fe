import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'sonner';

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
};

type BackendErrorResponse = {
  error?: {
    message?: string;
  };
  message?: string;
  success?: boolean;
};

export async function handleRequest<T>(
  request: Promise<AxiosResponse<T>>
): Promise<ApiResponse<T>> {
  try {
    const response = await request;
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return ErrorWrapper<T>(error);
  }
}

export function ErrorWrapper<T>(error: any): ApiResponse<T> {
  let errorMessage = 'Something went wrong. Please try again.';

  if (error instanceof AxiosError) {
    const responseData = error.response?.data as BackendErrorResponse;
    errorMessage =
      responseData?.error?.message ||
      responseData?.message ||
      error.message ||
      'Request failed. Please try again.';
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  toast.error(errorMessage);

  return {
    success: false,
    error: errorMessage,
  };
}

export async function apiGet<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return handleRequest(axios.get<T>(url, config));
}

export async function apiPost<T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return handleRequest(axios.post<T>(url, data, config));
}

export async function apiPut<T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return handleRequest(axios.put<T>(url, data, config));
}

export async function apiDelete<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  return handleRequest(axios.delete<T>(url, config));
}

export async function apiGetPaginated<T>(
  baseUrl: string,
  params: Record<string, any> = {},
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const queryString = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryString.append(key, String(value));
    }
  });

  const url = `${baseUrl}?${queryString.toString()}`;

  return handleRequest(axios.get<T>(url, config));
}
