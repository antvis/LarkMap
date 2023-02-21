export class DataVSource {
  public DataVSource = { type: 'FeatureCollection', features: [] };
  constructor() {
    this.init();
  }

  getFetch = (version: string, code: string | number) => {
    return `https://geo.datav.aliyun.com/${version}/bound/${code}.json`;
  };

  init = async () => {
    const dataVData = await fetch(this.getFetch('areas_v3', '100000_full'));
    this.DataVSource = await dataVData.json();
  };

  gitDataVData = async (code: number, full?: string) => {
    if (full) {
      return fetch(this.getFetch('areas_v3', `${code}_full`));
    } else {
      return fetch(this.getFetch('areas_v3', `${code}`));
    }
  };
}
