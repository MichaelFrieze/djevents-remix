import { events } from '~/data/events';

export let loader = async ({ params }) => {
  const evt = events.filter((ev) => ev.slug === params.slug);

  return evt;
};
