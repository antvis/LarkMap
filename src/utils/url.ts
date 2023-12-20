/**
 * 将 params 参数对象转换成 query string
 * @param params
 * @param encode
 * @returns
 */
export function getQueryString(params: Record<string, any>, encode = false) {
  return Object.entries(params)
    .sort(([key1], [key2]) => key1.localeCompare(key2))
    .map(([key, value]) => {
      let valueStr = String(value);
      if (encode) {
        valueStr = window.encodeURI(String(value));
      }
      return `${key}=${valueStr}`;
    })
    .join('&');
}

/**
 * 将 baseUrl 和 query 拼接成 url
 * @param baseUrl
 * @param params
 * @returns
 */
export function urlStringify(baseUrl: string, params: Record<string, any>) {
  return `${baseUrl}?${getQueryString(params, true)}`;
}
