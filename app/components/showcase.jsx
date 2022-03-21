import showcaseStyles from '~/styles/components/showcase.css';

export let links = () => [
  {
    rel: 'stylesheet',
    href: showcaseStyles,
  },
];

export let Showcase = () => {
  return (
    <div className="showcase">
      <h1>Welcome To The Party!</h1>
      <h2>Find the hottest DJ events</h2>
    </div>
  );
};
