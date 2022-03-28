import { useLocation } from 'remix';
import { Header, links as headerLinks } from '~/components/header';
import { Footer, links as footerLinks } from '~/components/footer';
import { Showcase, links as showcaseLinks } from '~/components/showcase';
import layoutStyles from '~/styles/layout.css';

export let links = () => [
  { rel: 'stylesheet', href: layoutStyles },
  ...headerLinks(),
  ...showcaseLinks(),
  ...footerLinks(),
];

export let Layout = ({ children }) => {
  let routeLocation = useLocation();
  return (
    <div>
      <Header />
      {routeLocation.pathname === '/' && <Showcase />}
      <div className="container">{children}</div>
      <Footer />
    </div>
  );
};
