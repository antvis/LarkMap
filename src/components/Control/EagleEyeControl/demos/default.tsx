import type { Scene } from '@antv/l7';
import { EagleEyeControl, LarkMap } from '@antv/larkmap';
import React from 'react';
import './default.less';
const MapOptions = {
  // animateEnable: false,
  style: 'light',
  token: 'pk.eyJ1IjoicWluZ3lpLWFudCIsImEiOiJjbGI3cjM0cHIwZGk2M3ZtdzY4NHk4d2JyIn0.LIUpxA8pC58-bl4Lc1rx1g',
};
export default () => {
  const [mainScene, setMainScene] = React.useState<Scene>();
  return (
    <div className="container">
      <LarkMap
        mapOptions={MapOptions}
        mapType="Mapbox"
        className="default-demo"
        id="defaultMain"
        onSceneLoaded={setMainScene}
      />
      <LarkMap mapOptions={MapOptions} mapType="Mapbox" className="default-demo-eagle-container" id="defaultEagle">
        <EagleEyeControl mainScene={mainScene} />
      </LarkMap>
    </div>
  );
};
