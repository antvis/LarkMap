import React from 'react';
import { getGradientColors } from '../utils/color';
import styles from './index.less';

export interface LegendRampProps {
  labels: any[];
  lableUnit: string;
  colors: { startColor: string; endColor: string } | string[];
  isContinuous?: boolean;
}

export function LegendRamp(props: LegendRampProps) {
  const { isContinuous, labels, colors, lableUnit } = props;
  const barWidth = 200;

  function Continuous({ gradient }: Record<string, string>) {
    return <div className={styles.continuousBar} style={{ background: `linear-gradient(to right,${gradient})` }} />;
  }

  function Equidistant({ color }: Record<string, any>) {
    return (
      <div className={styles.equidistantBar}>
        {color.map((item: string) => (
          <div className={styles.bar} style={{ background: item, width: barWidth / color.length }} key={item} />
        ))}
      </div>
    );
  }

  function Conent(color: string[]) {
    const gradient = color.join(',');
    const [min, max] = [labels[0], labels[labels.length - 1]];
    return (
      <div style={{ width: barWidth }}>
        {isContinuous ? <Continuous gradient={gradient} /> : <Equidistant colors={colors} />}
        <div className={styles.labelbar}>
          <div>{`${min}${lableUnit} ${isContinuous ? '' : '<'}`}</div>
          <div>{`${isContinuous ? '' : '≥'} ${max}${lableUnit}`}</div>
        </div>
      </div>
    );
  }

  function Renders() {
    if (Array.isArray(colors)) {
      return Conent(colors);
    }
    const colorGradient = getGradientColors(colors.startColor, colors.endColor, labels.length);
    return Conent(colorGradient);
  }

  return <Renders />;
}
