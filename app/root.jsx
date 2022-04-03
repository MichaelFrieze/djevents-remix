import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'remix';
import { getUser } from '~/utils/session.server.js';
import { Layout, links as layoutLinks } from '~/components/layout';

import globalStyles from '~/styles/global.css';

export let links = () => {
  return [
    {
      rel: 'stylesheet',
      href: globalStyles,
    },
    ...layoutLinks(),
  ];
};

export let meta = () => {
  return {
    charset: 'utf-8',
    title: 'DJ Events | Find the hottest parties',
    description: 'Find the latest DJ and other musical events',
    keywords: 'music, dj, edm, events',
    viewport: 'width=device-width,initial-scale=1',
  };
};

export let loader = async ({ request }) => {
  let user = await getUser(request);

  if (user) {
    return user;
  } else {
    throw new Error('Could not get user in the root.');
  }
};

export default function App() {
  let loaderData = useLoaderData();
  console.log(loaderData);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
