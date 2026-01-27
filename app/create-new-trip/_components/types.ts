export type Activity = {
    place_name: string;
    place_details: string;
    place_image_url: string;
    geo_coordinates:
    | {
        lat: number;
        lng: number;
    }
    | string;
    place_address: string;
    ticket_pricing: string;
    time_to_travel: string;
};

export type ItineraryDay = {
    day: string | number;
    plan: string;
    activities: Activity[];
};

export interface Hotel {
    hotel_name: string;
    hotel_address: string;
    price: string;
    rating: number;
    hotel_image_url: string;
}

export type TripInfo = {
    budget: string;
    destination: string;
    duration: string;
    group_size: string;
    origin: string;
    hotels: Hotel[];
    itinerary: ItineraryDay[];
};
