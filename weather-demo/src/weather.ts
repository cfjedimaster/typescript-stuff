import type { WeatherData } from './types';

const KEY = import.meta.env.VITE_PIRATE_KEY as string;

export async function getWeather(lat: number, lng: number): Promise<WeatherData> {
    console.log('getWeather', lat, lng);
    const req = await fetch(`https://api.pirateweather.net/forecast/${KEY}/${lat},${lng}?units=us&exclude=minutely,hourly,alerts,flags`);
    const res = await req.json();

    return {
        summary: res.currently.summary,
        temperature: res.currently.temperature,
        low: res.daily.data[0].temperatureLow,
        high: res.daily.data[0].temperatureHigh
    };
    //return res;
}