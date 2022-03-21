import { useLocation } from 'remix';
import { Header, links as headerLinks } from '~/components/header';
import { Footer, links as footerLinks } from '~/components/footer';
import { Showcase, links as showcaseLinks } from '~/components/showcase';
import layoutStyles from '~/styles/components/layout.css';

export let links = () => [
  { rel: 'stylesheet', href: layoutStyles },
  ...headerLinks(),
  ...showcaseLinks(),
  ...footerLinks(),
];

export let Layout = ({ children }) => {
  const routeLocation = useLocation();
  return (
    <div>
      <Header />
      {routeLocation.pathname === '/' && <Showcase />}
      <div>{children}</div>
      <Footer />
    </div>
  );
};
