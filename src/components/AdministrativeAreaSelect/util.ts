export const treeToArr = (data, res = []) => {
  data.forEach((item) => {
    res.push({ ...item, children: [] });
    if (item.children && item.children.length !== 0) {
      treeToArr(item.children, res);
    }
  });
  return res;
};
