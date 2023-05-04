export interface FlightDataFa_Id {
    ident: string;
    ident_icao: string;
    ident_iata: string;
    fa_flight_id: string;
    actual_off: string;
    actual_on: string;
    foresight_predictions_available: string;
    predicted_out: string;
    predicted_off: string;
    predicted_on: string;
    predicted_in: string;
    predicted_out_source: string;
    predicted_off_source: string;
    predicted_on_source: string;
    predicted_in_source: string;
    
    origin: BasicAirport;
    destination: BasicAirport;

    waypoints: number[];
    first_position_time: string;

    last_position: Position;

    bounding_box: number[];
    ident_prefix: string;
    aircraft_type: string;
}

export interface FlightDataIdent {
    ident: string;
    ident_icao: string;
    ident_iata: string;
    fa_flight_id: string;
    operator: string;
    operator_iata: string;
    flight_number: string;
    registration: string;
    atc_ident: string;
    inbound_fa_flight_id: string;

    codeshares: string;
    codeshares_iata: string;
    
    blocked: boolean;
    diverted: boolean;
    cancelled: boolean;
    position_only: boolean;

    origin: BasicAirport;
    destination: BasicAirport;
    
    departure_delay: number;
    arrival_delay: number;
    filed_ete: number;
    progress_percent: number;

    status: string;
    aircraft_type: string;
    
    route_distance: number;
    filed_airspeed: number;
    filed_altitude: number;

    route: string;
    baggage_claim: string;

    seats_cabin_business: number;
    seats_cabin_coach: number;
    seats_cabin_first: number;

    gate_origin: string;
    gate_destination: string;
    terminal_origin: string;
    terminal_destination: string;
    type: string;
    scheduled_out: string;
    estimated_out: string;
    actual_out: string;
    scheduled_off: string;
    estimated_off: string;
    actual_off: string;
    scheduled_on: string;
    estimated_on: string;
    actual_on: string;
    scheduled_in: string;
    estimated_in: string;
    actual_in: string;
    
    foresight_predictions_available: boolean;
}

export interface BasicAirport {
    code : string;
    code_icao : string;
    code_iata : string;
    code_lid : string;
    timezone : string;
    name : string;
    city : string;
    airport_info_url : string;
}

export interface Position {
    altitude: number;
    altitude_change: string;
    groundspeed: number;
    heading: number;
    latitude: number;
    longitude: number;
    timestamp: string;
    update_type: string;
}

export interface Operator {
    icao: string;
    iata: string;
    callsign: string;
    name: string;
    country: string;
    location: string;
    phone: string;
    shortname: string;
    url: string;
    wiki_url: string;
    alternatives: Operator[];
}