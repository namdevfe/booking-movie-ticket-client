export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type RequestOptions = RequestInit & {
  baseUrl?: string
}

export type HttpMethod = <TResponse>(
  url: string,
  body?: any,
  options?: RequestOptions
) => Promise<TResponse | undefined>

export interface HttpClient {
  get: <TResponse>(url: string, options?: Omit<RequestOptions, 'body'>) => Promise<TResponse | undefined>
  post: <TResponse>(url: string, body: any, options?: Omit<RequestOptions, 'body'>) => Promise<TResponse | undefined>
  put: <TResponse>(url: string, body: any, options?: Omit<RequestOptions, 'body'>) => Promise<TResponse | undefined>
  patch: <TResponse>(url: string, body: any, options?: Omit<RequestOptions, 'body'>) => Promise<TResponse | undefined>
  delete: <TResponse>(url: string, body: any, options?: Omit<RequestOptions, 'body'>) => Promise<TResponse | undefined>
}
