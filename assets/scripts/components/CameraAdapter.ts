const { ccclass, property } = cc._decorator;

@ccclass('ZoomResizeMap')
class ZoomResizeMap {
    @property({})
    public sizeRatio: number = 0;
    @property({})
    public portraitZoom: number = 0;
    @property({})
    public landscapeZoom: number = 0;
}

@ccclass
export class CameraAdapter extends cc.Component {
    @property({ type: [ZoomResizeMap] })
    public settings: ZoomResizeMap[] = [];

    @property({ type: [cc.Camera] })
    public cameras: cc.Camera[] = [];

    protected onLoad(): void {
        this._handleResizeEvents(true);
        this.onTransformEvent();

        const camera = this.getComponent(cc.Camera);
        if (this.cameras.length === 0 && camera) {
            this.cameras = [camera];
        }
    }

    protected _handleResizeEvents(isOn: boolean): void {
        const func = isOn ? 'on' : 'off';

        cc.view[func]('design-resolution-changed', this.onTransformEvent, this);
        cc.view[func]('canvas-resize', this.onTransformEvent, this);
        cc.director[func](cc.Director.EVENT_AFTER_SCENE_LAUNCH, this.onTransformEvent, this);
    }

    protected _getTargetMap(ratio: number): ZoomResizeMap {
        return this.settings
            .sort((a, b) => b.sizeRatio - a.sizeRatio)
            .find((map: ZoomResizeMap) => map.sizeRatio < ratio);
    }

    public onTransformEvent(): void {
        const viewSize: cc.Size = cc.view.getVisibleSize();
        const isHorizontal: boolean = viewSize.width > viewSize.height;
        const sizeRatio: number = Math.max(viewSize.width / viewSize.height, viewSize.height / viewSize.width);
        const map: ZoomResizeMap = this._getTargetMap(sizeRatio);
        
        if (map) {
            this.cameras.forEach(camera => {
                camera.zoomRatio = map[isHorizontal ? 'landscapeZoom' : 'portraitZoom'];
            });
        }
    }
}