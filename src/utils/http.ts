import { apiRoot, apiRootClient } from '@/constants/api'
import { STORAGE } from '@/constants/storage'
import type { HttpClient, Method, RequestOptions } from '@/types/http-type'
import { isClient } from '@/utils/is-client'

const request = async <T = any>(
  method: Method,
  url: string,
  options: RequestOptions
): Promise<T | undefined> => {
  const baseUrl: string = options.baseUrl === undefined ? apiRoot : apiRootClient
  const fullUrl: string = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`
  const accessToken =
    isClient() && `Bearer ${JSON.parse(localStorage.getItem(STORAGE.ACCESS_TOKEN) as string)}`
  const baseHeaders: any = {
    'Content-Type': 'application/json',
    Authorization: accessToken
  }
  const body: BodyInit | null | undefined = options.body ? JSON.stringify(options.body) : null

  try {
    const response = await fetch(fullUrl, {
      method,
      headers: {
        ...baseHeaders,
        ...options.headers
      },
      body
    })

    // Failed
    if (!response.ok) {
      throw await response.json()
    }

    return await response.json()
  } catch (error: any) {
    throw error
  }
}

const http: HttpClient = {
  get: <Response>(url: string, options?: Omit<RequestOptions, 'body'>) =>
    request<Response>('GET', url, { ...options }),
  post: <Response>(url: string, body: any, options?: Omit<RequestOptions, 'body'>) =>
    request<Response>('POST', url, { ...options, body }),
  put: <Response>(url: string, body: any, options?: Omit<RequestOptions, 'body'>) =>
    request<Response>('PUT', url, { ...options, body }),
  patch: <Response>(url: string, body: any, options?: Omit<RequestOptions, 'body'>) =>
    request<Response>('PATCH', url, { ...options, body }),
  delete: <Response>(url: string, body: any, options?: Omit<RequestOptions, 'body'>) =>
    request<Response>('DELETE', url, { ...options, body })
}

export default http
