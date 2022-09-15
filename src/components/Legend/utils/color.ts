import Color from 'color';
import { forEach, round } from 'lodash';

export const getGradientColors = (colorStart: string, colorEnd: string, count = 5): string[] => {
  const singleColors: string[] = [colorStart]; // 初始颜色

  const colorMinInt = Color(colorStart).object();
  const colorMaxInt = Color(colorEnd).object();

  if (count < 2) {
    return count < 1 ? [] : singleColors;
  }

  const diffNumber = {
    r: (colorMinInt.r - colorMaxInt.r) / (count - 1),
    g: (colorMinInt.g - colorMaxInt.g) / (count - 1),
    b: (colorMinInt.b - colorMaxInt.b) / (count - 1),
  };

  forEach(new Array(count - 2), (item, index) =>
    singleColors.push(
      Color({
        r: round(colorMinInt.r - diffNumber.r * (index + 1), 0),
        g: round(colorMinInt.g - diffNumber.g * (index + 1), 0),
        b: round(colorMinInt.b - diffNumber.b * (index + 1), 0),
      }).hex(),
    ),
  );

  singleColors.push(colorEnd);

  return singleColors;
};
