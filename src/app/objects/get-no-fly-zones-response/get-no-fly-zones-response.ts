import { EllipsoidNoFly } from "../ellipsoid-no-fly/ellipsoid-no-fly";
import { PolygonNoFly } from "../polygon-no-fly/polygon-no-fly";
import { RectangleNoFly } from "../rectangle-no-fly/rectangle-no-fly";

export class GetNoFlyZonesResponse {

    public _ellipsoidNoFlyZones: EllipsoidNoFly[];
    private _rectangleNoFlyZones: RectangleNoFly[];
    private _polygonNoFlyZones: PolygonNoFly[];
    


    public get ellipsoidNoFlyZones(): EllipsoidNoFly[] {
        return this._ellipsoidNoFlyZones;
    }

    public set ellipsoidNoFlyZones(value: EllipsoidNoFly[]) {
        this._ellipsoidNoFlyZones = value;
    }

    public get polygonNoFlyZones(): PolygonNoFly[] {
        return this._polygonNoFlyZones;
    }

    public set polygonNoFlyZones(value: PolygonNoFly[]) {
        this._polygonNoFlyZones = value;
    }

    public get rectangleNoFlyZones(): RectangleNoFly[] {
        return this._rectangleNoFlyZones;
    }

    public set rectangleNoFlyZones(value: RectangleNoFly[]) {
        this._rectangleNoFlyZones = value;
    }
}
