import Alpine from 'alpinejs';

import '@awesome.me/webawesome/dist/styles/webawesome.css';
import '@awesome.me/webawesome/dist/components/card/card.js';
import '@awesome.me/webawesome/dist/components/input/input.js';
import '@awesome.me/webawesome/dist/components/button/button.js';
import './style.css';

import type { SavedLocation } from './types';
import { getLocations, addLocation, removeLocation } from './storage';
import { getWeather } from './weather';
import { geoCode } from './geocode';

Alpine.data('app', () => ({
  locations: [] as SavedLocation[],
  newLocation: '',
  init() {
    this.locations = getLocations();
    console.log('locations', JSON.stringify(this.locations));
    if(this.locations.length > 0) {
      this.hydrateWeather();
    }
  },
  async addLocation(location: string) {
    if(!location) return;
    const geo = await geoCode(location);
    console.log(geo);
    const newLoc: SavedLocation = { name: location, longitude: geo.lng, latitude: geo.lat };
    this.locations.push(newLoc);
    // just noticed my method is addLocation as is the imported one. works but - eww. 
    addLocation(newLoc);
    this.newLocation = '';
    // in theory it is wasteful to hydrate ALL of them, but it's a super quick call
    this.hydrateWeather();
  }, 
  removeLocation(index: number) {
    this.locations.splice(index, 1);
    // same issue with naming - advice?
    removeLocation(index);
  },
  async hydrateWeather() {
    for(const loc of this.locations) {
      const weather = await getWeather(loc.latitude, loc.longitude);
      console.log('weather', weather);
      loc.weather = weather;
    }
  }
}));

Alpine.start();
