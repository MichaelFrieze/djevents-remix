## What is this app?

This is the DJ Events app from [Brad Traversy's Next.js course](https://www.udemy.com/course/nextjs-dev-to-deployment/). Except I built this using [Remix](https://remix.run/) rather than [NextJS](https://nextjs.org/). The backend is built using [Strapi v4](https://strapi.io/) and you can find the repo [here](https://github.com/MichaelFrieze/djevents-strapi).

I built this app to learn Remix and I really enjoyed the process. Remix is awesome!

I used [Railway](https://railway.app/) to deploy this app and I prefer it over Heroku. It worked great for both Remix and Strapi.

I also built the NextJS version of this app. You can find it [here](https://github.com/MichaelFrieze/dj-events-frontend) if you would like to compare NextJS and Remix.

## Development

Setup `.env` file with the following:

```
SESSION_SECRET = ''
API_URL = 'https://djevents-strapi.up.railway.app'
REMIX_URL = 'http://localhost:3000'
PER_PAGE = 4
```

- You can set the `API_URL` to your own strapi instance or use the one I provided.
- You can set the `SESSION_SECRET` to any string you like.
- `PER_PAGE` is the number of events to show on the events route.

Install dependencies:

```sh
npm install
```

From your terminal:

```sh
npm run dev
```
