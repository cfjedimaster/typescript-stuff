import type { GeoCodedLocation } from './types';

// Only the fields we use from Geocodio's "simple" format
type GeocodioSimpleResponse = {
  lat?: number;
  lng?: number;
};

const KEY = import.meta.env.VITE_GEOCODIO_KEY as string;

export async function geoCode(location: string): Promise<GeoCodedLocation> {
    const req = await fetch(`https://api.geocod.io/v1.7/geocode?q=${encodeURIComponent(location)}&format=simple&api_key=${KEY}`);
    const res = (await req.json()) as GeocodioSimpleResponse;

    if(!res || !res.lat || !res.lng) {
        throw new Error('No results');
    }

    return { lat: res.lat, lng: res.lng };
}