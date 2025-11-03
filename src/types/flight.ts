export interface Airport {
  code: string;
  name: string;
  city: string;
}

export interface FlightTiming {
  scheduled: string;
  actual?: string;
  estimated?: string;
  terminal: string;
  gate: string;
}

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: Airport;
  destination: Airport;
  departure: FlightTiming;
  arrival: FlightTiming;
  status: string;
  aircraft: string;
  duration: string;
  delay: number;
}