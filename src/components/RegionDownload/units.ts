/**
 *
 * @param fetchType 数据类型
 * @param version 版本号
 * @param code 数据code
 * @returns
 */
export const getFetch = (fetchType: 'dataV' | 'L7', version: string, code: string | number) => {
  if (fetchType === 'dataV') {
    return `https://geo.datav.aliyun.com/${version}/bound/${code}.json`;
  } else {
    return `https://unpkg.com/${version}/data/${code}.pbf`;
  }
};
