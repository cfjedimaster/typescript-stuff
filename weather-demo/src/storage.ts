import type { SavedLocation } from './types';

// This is where it's stored in localStorage. 
const KEY = 'weather-locations';

// Type guard: checks at runtime that an unknown value really is a SavedLocation.
// localStorage can contain anything (old versions of your app, manual edits),
// so we validate instead of trusting it.
// Ray, in case you forget, the value is means that if the function returns true, 
// it's ok for TS to consider the value as of type SavedLocation
function isSavedLocation(value: unknown): value is SavedLocation {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.name === 'string' &&
    typeof v.longitude === 'number' &&
    typeof v.latitude === 'number'
  );
}

export function getLocations(): SavedLocation[] {
  const locations = localStorage.getItem(KEY);
  if(!locations) return [];

  const parsed = JSON.parse(locations);
  return Array.isArray(parsed) ? parsed.filter(isSavedLocation) : [];
}

export function addLocation(location: SavedLocation): void {
  const locations = getLocations();
  locations.push(location);
  localStorage.setItem(KEY, JSON.stringify(locations));
  console.log('wtf', location);
}

export function removeLocation(index: number): void {
  const locations = getLocations();
  locations.splice(index, 1);
  localStorage.setItem(KEY, JSON.stringify(locations));
}