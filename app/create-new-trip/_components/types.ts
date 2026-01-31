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
    time_travel_each_location: string;
    best_time_to_visit: string;
};

export type Itinerary = {
    day: string | number;
    day_plan: string;
    best_time_to_visit_day: string;
    activities: Activity[];
};

export type Hotel = {
    hotel_name: string;
    hotel_address: string;
    price_per_night: string;
    hotel_image_url: string;
    geo_coordinates: {
        lat: number;
        lng: number;
    }
    rating: number;
    description: string;
}

export type TripInfo = {
    budget: string;
    destination: string;
    duration: string;
    group_size: string;
    origin: string;
    hotels: Hotel[];
    itinerary: Itinerary[];
};
