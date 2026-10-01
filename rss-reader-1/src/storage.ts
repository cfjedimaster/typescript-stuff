import type { SavedFeed } from './types';

// This is where it's stored in localStorage. 
const KEY = 'rss-feeds';

// Type guard: checks at runtime that an unknown value really is a SavedFeed.
// localStorage can contain anything (old versions of your app, manual edits),
// so we validate instead of trusting it.
// Ray, in case you forget, the value is means that if the function returns true, 
// it's ok for TS to consider the value as of type SavedFeed
function isSavedFeed(value: unknown): value is SavedFeed {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.url === 'string'
  );
}

export function getFeeds(): SavedFeed[] {
  const feeds = localStorage.getItem(KEY);
  if(!feeds) return [];

  const parsed = JSON.parse(feeds);
  return Array.isArray(parsed) ? parsed.filter(isSavedFeed) : [];
}

export function addFeed(feed: SavedFeed): void {
  const feeds = getFeeds();
  feeds.push(feed);
  localStorage.setItem(KEY, JSON.stringify(feeds));
  console.log('wtf', feed);
}

export function removeFeed(index: number): void {
  const feeds = getFeeds();
  feeds.splice(index, 1);
  localStorage.setItem(KEY, JSON.stringify(feeds));
}