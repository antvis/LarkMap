export function urlStringify(url: string, params: Record<string, any>) {
  return `${url}?${Object.entries(params)
    .map(([key, value]) => `${key}=${window.encodeURIComponent(String(value))}`)
    .join('&')}`;
}
