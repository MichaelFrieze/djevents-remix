## What is this app?

This is the DJ Events app from [Brad Traversy's Next.js course](https://www.udemy.com/course/nextjs-dev-to-deployment/). Except, I built this using [Remix](https://remix.run/) rather than [NextJS](https://nextjs.org/). I built this app to learn Remix and I really enjoyed the process. Remix is awesome!

The backend is built using [Strapi v4](https://strapi.io/). You can find the repo [here](https://github.com/MichaelFrieze/djevents-strapi).

I used [Railway](https://railway.app/) to deploy this app and I prefer it over Heroku. It was easy to use and worked great for both Remix and Strapi.

Sometimes the Srapi deployment on Railway has an error:
`Connection Error: Connection terminated unexpectedly`

It is rare but it does happen. If you see an error when using the Remix app then just refresh the page and it should be fine.

On the bright side, getting an error when fetching from the Strapi backend gave me an oppertunity to learn how error handling works in Remix.

I have not had any problems with the Remix deployment on Railway. It's just the Strapi deployment. I was considering putting the Strapi backend on Heroku but the free tier has slow initial load times. If the error occured more often then I would use Heroku, but for now I prefer Railway.

Also, I built the NextJS version of this app. You can find it [here](https://github.com/MichaelFrieze/dj-events-frontend) if you would like to compare NextJS and Remix. It also uses a Strapi backend but it's v3 and deployed on Heroku rather than Railway.

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
