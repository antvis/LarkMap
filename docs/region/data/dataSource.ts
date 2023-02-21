import { getFetch } from '../util';

export class DataVSource {
  public DataVSource = { type: 'FeatureCollection', features: [] };
  constructor() {
    this.init();
  }

  init = async () => {
    const dataVData = await fetch(getFetch('dataV', 'areas_v3', '100000_full'));
    this.DataVSource = await dataVData.json();
  };

  gitDataVData = async (code: number, full?: string) => {
    if (full) {
      return fetch(getFetch('dataV', 'areas_v3', `${code}_full`));
    } else {
      return fetch(getFetch('dataV', 'areas_v3', `${code}`));
    }
  };
}
