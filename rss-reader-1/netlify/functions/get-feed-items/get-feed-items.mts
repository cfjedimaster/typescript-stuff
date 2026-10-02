import Parser from 'rss-parser';
import type { Context } from '@netlify/functions';

type FeedItem = {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  feedTitle: string;
};

export default async (request: Request, context: Context) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', {
      status: 405,
      headers: { Allow: 'POST' },
    })
  }

  try {
    const body: unknown = await request.json()
    const parser = new Parser();

    if (
      typeof body !== 'object' ||
      body === null ||
      !('feeds' in body) ||
      !Array.isArray(body.feeds)
    ) {
      return new Response('Request body must include a feeds array', {
        status: 400,
      })
    }
    console.log('Parsing feeds:', body.feeds);

    let reqs: Promise<any>[] = [];
    let items: FeedItem[] = [];

    for(const feed of body.feeds) {
      reqs.push(parser.parseURL(feed.url));
    }

    const results = await Promise.allSettled(reqs);
    for (const result of results) {
        if (result.status === 'fulfilled') {
            const feed = result.value;
            console.log(`Fetched feed: ${feed.title} with ${feed.items.length} items.`);
            let newItems:any[] = [];
            feed.items.forEach(item => {
                /*
                will use content as a grab all for different fields
                for example, netlify had summary, not content
                */
                let content = item.contentSnippet || item.summary || item.content || '';
                newItems.push({
                    title: item.title,
                    link: item.link,
                    content: content,
                    pubDate: item.pubDate,
                    feedTitle: feed.title
                });
            });

            items.push(...newItems);

            // cache the feed
            //const cacheKey = `feedcache-${encodeURIComponent(feed.feedUrl)}`;
            //console.log(`Caching feed data for ${feed.feedUrl}`);
            /*
            await store.setJSON(cacheKey, {
                timestamp: Date.now(),
                items: newItems
            });
            */
        } else {
            console.error('Error fetching/parsing feed:', result.reason);
        }
    }

    // now sort items by pubDate descending
    items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    return new Response(JSON.stringify(items), {
        status: 200,
        headers: {
        "Content-Type": "application/json",
        },
    });

  } catch(e) {
    console.log(e);
    return new Response('Request body must be valid JSON', {
      status: 400,
    })
  }
}
