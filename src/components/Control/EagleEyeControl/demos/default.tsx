import type { Scene } from '@antv/l7';
import { EagleEyeControl, LarkMap } from '@antv/larkmap';
import React from 'react';
import './default.less';
export default () => {
  const [mainScene, setMainScene] = React.useState<Scene>();
  return (
    <LarkMap className="default-demo" id="defaultMain" onSceneLoaded={setMainScene}>
      <LarkMap className="default-demo-eagle-container" id="defaultEagle">
        <EagleEyeControl mainScene={mainScene} options={{ padding: { top: 30, right: 30, left: 30, bottom: 30 } }} />
      </LarkMap>
    </LarkMap>
  );
};
