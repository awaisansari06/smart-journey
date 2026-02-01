import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';

export async function POST(req: NextRequest) {
  const { placeName } = await req.json();
  const apiKey = process.env.GOOGLE_PLACE_API_KEY;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'places.displayName,places.photos,places.id'
    }
  };

  try {
    const result = await axios.post(BASE_URL, {
      textQuery: placeName
    },
      config);

    if (result.data?.places?.[0]?.photos) {
      const photos = result.data.places[0].photos.slice(0, 3);
      const photoUrls = photos.map((photo: any) => {
        const placeRefName = photo.name;
        return `https://places.googleapis.com/v1/${placeRefName}/media?maxHeightPx=1000&maxWidthPx=1000&key=${apiKey}`;
      });
      return NextResponse.json(photoUrls);
    }
    return NextResponse.json([]);
  }
  catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) })
  }
}
