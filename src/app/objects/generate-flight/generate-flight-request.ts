
export class GenerateFlightRequest {

    public airlineName: string;
    public flightIcao: string;
    public longitude: number;
    public latitude: number;
    public altitude: number;
    public longitudeChange: number;
    public latitudeChange: number;
    public altitudeChange: number;
    
    public getAirlineName(): string {
        return this.airlineName;
    }

    public getFlightIcao(): string {
        return this.flightIcao;
    }

    public getLongitude(): number {
        return this.longitude
    }

    public getLatitude(): number {
        return this.latitude;
    }

    public getAltitude(): number {
        return this.altitude;
    }


    public setAirlineName(airlineName: string): void {
        this.airlineName = airlineName;
    }

    public setFlightIcao(flightIcao: string): void {
        this.flightIcao = flightIcao;
    }

    public setLongitude(longitude: number): void {
        this.longitude = longitude;
    }

    public setLatitude(latitude: number): void {
        this.latitude = latitude;
    }

    public setAltitude(altitude: number): void {
        this.altitude = altitude;
    }

    public setLongitudeChange(longitudeChange: number): void {
        this.longitudeChange = longitudeChange;
    }

    public setLatitudeChange(latitudeChange: number): void {
        this.latitudeChange = latitudeChange;
    }

    public setAltitudeChange(altitudeChange: number): void {
        this.altitudeChange = altitudeChange;
    }
}
