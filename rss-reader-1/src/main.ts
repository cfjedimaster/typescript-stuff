import Alpine from 'alpinejs';

import '@awesome.me/webawesome/dist/styles/webawesome.css';
import '@awesome.me/webawesome/dist/components/card/card.js';
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/dialog/dialog.js';
import '@awesome.me/webawesome/dist/components/input/input.js';
import '@awesome.me/webawesome/dist/components/page/page.js'

import './style.css';
import type { SavedFeed, FeedItem } from './types';
import { getFeeds, addFeed, removeFeed } from './storage';


Alpine.data('app', () => ({
  feeds: [] as SavedFeed[],
  feedItems: [] as FeedItem[],
  newFeedUrl: '',
  init() {
    this.feeds = getFeeds();
    this.getFeedItems();
  },
  async getFeedItems() {
    /*
    To do - it's possible this gets called while it is working (ie, a person quickly adds a feed), 
    we could/should throttle. 
    */
    if(this.feeds.length === 0) return;
    let req = await fetch('./.netlify/functions/get-feed-items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ feeds: this.feeds })
    });
    if(req.ok) {
      let data = await req.json();
      /*
      Feeds sometime return huge blocks of text, lets sanity check it a bit
      we can also format our date nicely
      */
      data = data.map((item: FeedItem) => {
        if(item.content.length > 1000) {
          item.content = item.content.substring(0, 1000) + '...';
          item.pubDate = this.formatDate(item.pubDate);
        }
        return item;
      });
      this.feedItems = data;
      //console.log(this.feedItems);
    }
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
    this.getFeedItems();
  },
  removeStoredFeed(index: number) {
    this.feeds.splice(index, 1);
    removeFeed(index);
    this.getFeedItems();
  }, 
  formatDate(dateString: string) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(dateString));
  }
}));

Alpine.start();

