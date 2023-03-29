export class FlightDetails {
    flightId?: number;
    flightNumber?: string;
    longitude?: number;
    latitude?: number;
    elevation?: number;
    flightSpeed?: number
    takeoffLocation?: string;
    takeoffTime?: string;
    arrivalLocation?: string;
    arrivalTime?: string;
    currentlyOver?: string;
    inNoFlyZone?: boolean;
    
    constructor(flightId: number, flightNumber: string, longitude: number,
        latitude: number, elevation: number, flightSpeed: number, takeoffLocation: string,
        takeoffTime: string, arrivalLocation: string, arrivalTime: string,
        currentlyOver: string, inNoFlyZone: boolean){
            this.flightId = flightId;
            this.flightNumber = flightNumber; 
            this.longitude = longitude;
            this.latitude = latitude;
            this.elevation = elevation;
            this.flightSpeed = flightSpeed;
            this.takeoffLocation = takeoffLocation;
            this.takeoffTime = takeoffTime;
            this.arrivalLocation = arrivalLocation;
            this.arrivalTime = arrivalTime;
            this.currentlyOver = currentlyOver;
            this.inNoFlyZone = inNoFlyZone;
        }
}
