export type SavedLocation = {
  name: string;
  longitude: number;
  latitude: number, 
  weather?: WeatherData;
};

export type GeoCodedLocation = {
  lat: number;
  lng: number;
};

export type WeatherData = {
  summary: string;
  temperature: number;
  low: number;
  high: number;
}