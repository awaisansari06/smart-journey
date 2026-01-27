import React from 'react';

const TRIP_DATA={
    "destination": "London",
        "duration": "3 days",
        "origin": "Mumbai",
        "budget": "High",
        "group_size": "2",
        "hotels": [
            {
                "hotel_name": "The Savoy",
                "hotel_address": "Strand, London WC2R 0EZ, United Kingdom",
                "price_per_night": "£600",
                "hotel_image_url": "https://example.com/savoy.jpg",
                "geo_coordinates": {
                    "lat": 51.5114,
                    "lng": -0.1163
                },
                "rating": 4.8,
                "description": "An iconic luxury hotel with a rich history, offering exquisite dining and stunning views."
            },
            {
                "hotel_name": "The Langham",
                "hotel_address": "1C Portland Place, Regent Street, London W1B 1JA, United Kingdom",
                "price_per_night": "£550",
                "hotel_image_url": "https://example.com/langham.jpg",
                "geo_coordinates": {
                    "lat": 51.5162,
                    "lng": -0.1391
                },
                "rating": 4.7,
                "description": "A grand hotel known for its elegant rooms, exceptional service, and afternoon tea."
            },
            {
                "hotel_name": "Shangri-La Hotel at The Shard, London",
                "hotel_address": "31 St Thomas Street, London SE1 9QU, United Kingdom",
                "price_per_night": "£700",
                "hotel_image_url": "https://example.com/shangri-la.jpg",
                "geo_coordinates": {
                    "lat": 51.5045,
                    "lng": -0.0868
                },
                "rating": 4.9,
                "description": "Luxury hotel offering unparalleled views of London from its iconic Shard location."
            }
        ],
        "itinerary": [
            {
                "day": 1,
                "day_plan": "Explore historical landmarks and royal heritage.",
                "best_time_to_visit_day": "Morning",
                "activities": [
                    {
                        "place_name": "Tower of London",
                        "place_details": "Historic castle with royal history and crown jewels.",
                        "place_image_url": "https://example.com/toweroflondon.jpg",
                        "geo_coordinates": {
                            "lat": 51.5081,
                            "lng": -0.0759
                        },
                        "place_address": "London EC3N 4AB, United Kingdom",
                        "ticket_pricing": "£30",
                        "time_travel_each_location": "3 hours",
                        "best_time_to_visit": "Morning"
                    },
                    {
                        "place_name": "Buckingham Palace",
                        "place_details": "The Queen's official residence, witness the Changing of the Guard.",
                        "place_image_url": "https://example.com/buckingham.jpg",
                        "geo_coordinates": {
                            "lat": 51.5014,
                            "lng": -0.1419
                        },
                        "place_address": "London SW1A 1AA, United Kingdom",
                        "ticket_pricing": "N/A (free to view from outside)",
                        "time_travel_each_location": "2 hours",
                        "best_time_to_visit": "Morning (for Changing of the Guard)"
                    },
                    {
                        "place_name": "Westminster Abbey",
                        "place_details": "A stunning Gothic church with a rich history of royal coronations and burials.",
                        "place_image_url": "https://example.com/westminster.jpg",
                        "geo_coordinates": {
                            "lat": 51.4993,
                            "lng": -0.1295
                        },
                        "place_address": "20 Deans Yd, London SW1P 3PA, United Kingdom",
                        "ticket_pricing": "£27",
                        "time_travel_each_location": "2 hours",
                        "best_time_to_visit": "Afternoon"
                    }
                ]
            },
            {
                "day": 2,
                "day_plan": "Immerse yourself in art, culture, and the vibrant West End.",
                "best_time_to_visit_day": "Afternoon",
                "activities": [
                    {
                        "place_name": "British Museum",
                        "place_details": "World-renowned museum with artifacts from around the globe.",
                        "place_image_url": "https://example.com/britishmuseum.jpg",
                        "geo_coordinates": {
                            "lat": 51.5189,
                            "lng": -0.1267
                        },
                        "place_address": "Great Russell Street, London WC1B 3DG, United Kingdom",
                        "ticket_pricing": "Free (special exhibitions may require tickets)",
                        "time_travel_each_location": "3 hours",
                        "best_time_to_visit": "Morning"
                    },
                    {
                        "place_name": "National Gallery",
                        "place_details": "Housing a collection of Western European paintings from the 13th–19th centuries.",
                        "place_image_url": "https://example.com/nationalgallery.jpg",
                        "geo_coordinates": {
                            "lat": 51.5089,
                            "lng": -0.1283
                        },
                        "place_address": "Trafalgar Square, London WC2N 5DN, United Kingdom",
                        "ticket_pricing": "Free (special exhibitions may require tickets)",
                        "time_travel_each_location": "2 hours",
                        "best_time_to_visit": "Afternoon"
                    },
                    {
                        "place_name": "West End Show",
                        "place_details": "Experience a world-class theatrical performance.",
                        "place_image_url": "https://example.com/westend.jpg",
                        "geo_coordinates": {
                            "lat": 51.5128,
                            "lng": -0.1257
                        },
                        "place_address": "Various Theatres, London",
                        "ticket_pricing": "£50-£150",
                        "time_travel_each_location": "3 hours",
                        "best_time_to_visit": "Evening"
                    }
                ]
            },
            {
                "day": 3,
                "day_plan": "Explore modern London and enjoy panoramic views.",
                "best_time_to_visit_day": "Morning",
                "activities": [
                    {
                        "place_name": "London Eye",
                        "place_details": "Giant Ferris wheel offering stunning views of London.",
                        "place_image_url": "https://example.com/londoneye.jpg",
                        "geo_coordinates": {
                            "lat": 51.5033,
                            "lng": -0.1195
                        },
                        "place_address": "Riverside Building, County Hall, London SE1 7PB, United Kingdom",
                        "ticket_pricing": "£32.50",
                        "time_travel_each_location": "2 hours",
                        "best_time_to_visit": "Morning (to avoid crowds)"
                    },
                    {
                        "place_name": "Borough Market",
                        "place_details": "Historic food market with a wide variety of artisan foods and drinks.",
                        "place_image_url": "https://example.com/boroughmarket.jpg",
                        "geo_coordinates": {
                            "lat": 51.5054,
                            "lng": -0.0909
                        },
                        "place_address": "8 Southwark Street, London SE1 1TL, United Kingdom",
                        "ticket_pricing": "N/A (cost of food and drinks)",
                        "time_travel_each_location": "2 hours",
                        "best_time_to_visit": "Lunchtime"
                    },
                    {
                        "place_name": "Sky Garden",
                        "place_details": "Free public garden offering panoramic views of London.",
                        "place_image_url": "https://example.com/skygarden.jpg",
                        "geo_coordinates": {
                            "lat": 51.5105,
                            "lng": -0.0805
                        },
                        "place_address": "1 Sky Garden Walk, London EC3M 8AF, United Kingdom",
                        "ticket_pricing": "Free (but requires booking in advance)",
                        "time_travel_each_location": "2 hours",
                        "best_time_to_visit": "Afternoon/Evening"
                    }
            ]
        }
    ]
}


function Itinerary() {
  return (
    <div>Itinerary</div>
  )
}

export default Itinerary