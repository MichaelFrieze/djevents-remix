import { useLocation } from 'remix';
import { Header } from '~/components/header';
import { Footer } from '~/components/footer';
import { Showcase } from '~/components/showcase';

// export let links = () => [{ rel: 'stylesheet', href: layoutStyles }];

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
