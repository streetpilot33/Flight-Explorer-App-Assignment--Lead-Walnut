export interface AirportRef {
	code: string;
	name: string;
	city: string;
}

export const AIRPORTS: AirportRef[] = [
	{ code: 'JFK', name: 'John F. Kennedy International', city: 'New York' },
	{ code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles' },
	{ code: 'SFO', name: 'San Francisco International', city: 'San Francisco' },
	{ code: 'SEA', name: 'Seattle-Tacoma International', city: 'Seattle' },
	{ code: 'ORD', name: 'O’Hare International', city: 'Chicago' },
	{ code: 'DFW', name: 'Dallas/Fort Worth International', city: 'Dallas' },
	{ code: 'MIA', name: 'Miami International', city: 'Miami' },
	{ code: 'BOS', name: 'Logan International', city: 'Boston' },
	{ code: 'ATL', name: 'Hartsfield–Jackson Atlanta International', city: 'Atlanta' },
	{ code: 'DEN', name: 'Denver International', city: 'Denver' },
	{ code: 'IAD', name: 'Washington Dulles International', city: 'Washington' },
	{ code: 'PHX', name: 'Phoenix Sky Harbor International', city: 'Phoenix' },
	{ code: 'LAS', name: 'Harry Reid International', city: 'Las Vegas' },
	{ code: 'CLT', name: 'Charlotte Douglas International', city: 'Charlotte' },
	{ code: 'MSP', name: 'Minneapolis–Saint Paul International', city: 'Minneapolis' },
];
