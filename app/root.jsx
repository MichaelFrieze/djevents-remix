import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
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
    { rel: 'icon', href: '/favicon.ico' },

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

  return user;
};

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

function Document({ children }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>{children}</Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document>
      <div className="error-container">
        <h1>
          {caught.status} {caught.statusText}
        </h1>
      </div>
    </Document>
  );
}

export function ErrorBoundary({ error }) {
  console.error(error);

  return (
    <Document>
      <div className="error-container">
        <h1>App Error</h1>
        <pre>{error.message}</pre>
      </div>
    </Document>
  );
}
