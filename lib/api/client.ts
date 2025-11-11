interface ApiClientConfig {
  baseUrl?: string
  defaultHeaders?: Record<string, string>
  cache?: RequestCache
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

class ApiClient {
  private baseUrl: string
  private defaultHeaders: Record<string, string>
  private defaultCache: RequestCache

  constructor(config: ApiClientConfig = {}) {
    this.baseUrl = config.baseUrl || ''
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.defaultHeaders,
    }
    this.defaultCache = config.cache || 'default'
  }

  async request<T>(
    endpoint: string,
    options: RequestInit & {
      cache?: RequestCache
      next?: { revalidate?: number | false; tags?: string[] }
    } = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = this.baseUrl ? `${this.baseUrl}${endpoint}` : endpoint

      const { headers, cache, next, ...restOptions } = options
      const shouldOmitCache = typeof next?.revalidate !== 'undefined'

      const fetchOptions: RequestInit & {
        next?: { revalidate?: number | false; tags?: string[] }
      } = {
        ...restOptions,
        headers: {
          ...this.defaultHeaders,
          ...headers,
        },
        ...(shouldOmitCache
          ? {}
          : {
              cache: cache ?? this.defaultCache,
            }),
        ...(next ? { next } : {}),
      }

      const response = await fetch(url, fetchOptions as RequestInit)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return { success: true, data }
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }

  // Convenience method for GET requests
  async get<T>(
    endpoint: string,
    options: RequestInit & {
      cache?: RequestCache
      next?: { revalidate?: number | false; tags?: string[] }
    } = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  // Convenience method for POST requests
  async post<T>(
    endpoint: string,
    body?: unknown,
    options: RequestInit & { cache?: RequestCache } = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    })
  }
}

// Create default client instances
export const crmClient = new ApiClient({
  baseUrl: 'https://panel.citysresidences.com/api',
})

export const panelClient = new ApiClient({
  baseUrl: 'https://panel.citysresidences.com/api',
  // cache: 'no-store', // Default to no cache for panel API
})

export { ApiClient, type ApiResponse, type ApiClientConfig }
