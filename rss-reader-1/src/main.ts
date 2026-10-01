import Alpine from 'alpinejs';

import '@awesome.me/webawesome/dist/styles/webawesome.css';
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/dialog/dialog.js';
import '@awesome.me/webawesome/dist/components/input/input.js';
import '@awesome.me/webawesome/dist/components/page/page.js'

import './style.css';
import type { SavedFeed } from './types';
import { getFeeds, addFeed, removeFeed } from './storage';


Alpine.data('app', () => ({
  feeds: [] as SavedFeed[],
  newFeedUrl: '',
  init() {
    this.feeds = getFeeds();
  },
  showDialog() {
    const dialog = this.$refs.feedsDialog as HTMLDialogElement;
    if(!dialog) return;
    dialog.open = true;
  },
  storeFeed(url: string) {
    if(!url) return;
    const newFeed: SavedFeed = { url };
    this.feeds.push(newFeed);
    addFeed(newFeed);
    this.newFeedUrl = '';
  },
  removeStoredFeed(index: number) {
    this.feeds.splice(index, 1);
    removeFeed(index);
  }
}));

Alpine.start();
