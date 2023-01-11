export const by = (name) => {
  return (o, p) => {
    let a, b;
    if (typeof o === 'object' && typeof p === 'object' && o && p) {
      a = o[name];
      b = p[name];
      if (a === b) {
        return 0;
      }
      if (typeof a === typeof b) {
        return a < b ? -1 : 1;
      }
      return typeof a < typeof b ? -1 : 1;
    } else {
      throw 'error';
    }
  };
};

export const treeToArr = (data, res = []) => {
  data.forEach((item) => {
    res.push({ ...item, children: [] });
    if (item.children && item.children.length !== 0) {
      treeToArr(item.children, res);
    }
  });
  return res;
};
