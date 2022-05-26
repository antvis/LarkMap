import type { ICompositeLayer, ICoreLayer, Scene } from '@antv/l7-composite-layers';

export type LayerManagerOptions = {
  scene: Scene;
};
export type Layer = ICoreLayer | ICompositeLayer;

let layerCounter = 0;

/**
 * 图层管理器
 */
export class LayerManager {
  /**
   * 地图容器
   */
  private scene: Scene;
  /**
   * 配置项
   */
  public options: LayerManagerOptions;
  /**
   * 图层
   */
  private layerMap = new Map<string, Layer>();

  constructor(options: LayerManagerOptions) {
    this.scene = options.scene;
    this.options = options;
  }

  /**
   * 是否有该图层
   */
  public hasLayer(id: string): boolean {
    return this.layerMap.has(id);
  }

  /**
   * 添加图层
   */
  public addLayer(layer: Layer) {
    const layerId = this.getLayerId(layer);

    this.layerMap.set(layerId, layer);

    layer.addTo(this.scene);
  }

  /**
   * 添加多个图层
   */
  public addLayers(layers: Layer[]) {
    layers.forEach((layer) => {
      this.addLayer(layer);
    });
  }

  /**
   * 根据图层 id 或图层实例移除 layer 图层
   */
  public removeLayer(id: string | Layer): boolean {
    const layerId = typeof id === 'string' ? id : this.getLayerId(id);
    const findLayer = this.layerMap.get(layerId);

    if (!findLayer) return false;

    this.layerMap.delete(layerId);

    findLayer.remove();

    return true;
  }

  /**
   * 获取图层组所有的图层
   */
  public getLayers(): Layer[] {
    return Array.from(this.layerMap.values());
  }

  /**
   * 根据图层 ID 获取图层
   */
  public getLayer(id: string): Layer | undefined {
    return this.layerMap.get(id);
  }

  /**
   * 移除所有的图层对象
   */
  public removeAllLayer() {
    for (const layer of this.layerMap.values()) {
      layer.remove();
    }
    this.layerMap.clear();
  }

  /**
   * 是否图层为空
   */
  public isEmpty() {
    return this.layerMap.size === 0;
  }

  /**
   * 根据图层获取图层 ID
   */
  public getLayerId(layer: Layer) {
    if ('id' in layer) {
      return layer.id;
    }

    return `${layerCounter++}`;
  }

  public destroy() {
    this.removeAllLayer();
  }
}
