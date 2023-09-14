/**
 * 将 baseUrl 和 query 拼接成 url
 * @param baseUrl
 * @param params
 * @returns
 */
export function urlStringify(baseUrl: string, params: Record<string, any>) {
  return `${baseUrl}?${Object.entries(params)
    .map(([key, value]) => `${key}=${window.encodeURIComponent(String(value))}`)
    .join('&')}`;
}
