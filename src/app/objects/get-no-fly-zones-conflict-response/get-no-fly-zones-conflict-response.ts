export class getNoFlyZonesConflictResponse {
    inConflict?: boolean;
    noFlyZoneName?: string;

    constructor(noFlyZoneName: string, inConflict: boolean) {
        this.noFlyZoneName = noFlyZoneName;
        this.inConflict = inConflict;
    }
}