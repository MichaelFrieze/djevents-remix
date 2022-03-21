import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix';
import { Layout, links as layoutLinks } from '~/components/layout';

import rootStyles from '~/styles/root.css';

export const links = () => {
  return [
    {
      rel: 'stylesheet',
      href: rootStyles,
    },
    ...layoutLinks(),
  ];
};

export function meta() {
  return {
    charset: 'utf-8',
    title: 'DJ Events | Find the hottest parties',
    description: 'Find the latest DJ and other musical events',
    keywords: 'music, dj, edm, events',
    viewport: 'width=device-width,initial-scale=1',
  };
}

export default function App() {
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
