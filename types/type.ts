export interface IHotels {
	hotels: IHotel[];
}

export interface IHotel {
	id: string;
	type: string;
	name: string;
	created: number;
	modified: number;
	address1: string;
	payment_status?: string;
	airportCode: string;
	amenityMask: number;
	city: string;
	facilities: string[];
	confidenceRating: number;
	countryCode: string;
	deepLink: string;
	highRate: number;
	hotelId: number;
	hotelInDestination: boolean;
	hotelRating: number;
	location: Location;
	locationDescription: string;
	lowRate: number;
	metadata: Metadata;
	postalCode: number;
	propertyCategory: number;
	proximityDistance: number;
	proximityUnit: string;
	rateCurrencyCode: string;
	shortDescription: string;
	stateProvinceCode: string;
	thumbNailUrl: string;
	tripAdvisorRating: number;
	tripAdvisorRatingUrl: string;
}

export enum AirportCode {
	Sea = "SEA",
}

export enum City {
	Burlingame = "Burlingame",
	Seattle = "Seattle",
}

export enum CountryCode {
	Us = "US",
}

export enum Facility {
	Iron = "iron",
	Parking = "parking",
	Pool = "pool",
	SPA = "spa",
	Wifi = "wifi",
}

export interface Location {
	latitude: number;
	longitude: number;
}

export enum LocationDescription {
	InSeattleUniversityDistrict = "In Seattle (University District)",
	NearPacificNorthwestBallet = "Near Pacific Northwest Ballet",
	NearPikePlaceMarket = "Near Pike Place Market",
}

export interface Metadata {
	path: string;
}

export enum ProximityUnit {
	Mi = "MI",
}

export enum RateCurrencyCode {
	Usd = "USD",
}

export enum StateProvinceCode {
	Wa = "WA",
}

type HotelType = "hotel" | "resort" | "hostel" | "inn";

export type IUserType = {
	user?:
		| {
				name?: string | undefined | null;
				email?: string | undefined | null;
				image?: string | undefined | null;
		  }
		| null
		| undefined;
};
