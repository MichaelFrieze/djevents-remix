import { events } from '~/data/events';

export let loader = async ({ params }) => {
  let evt = events.filter((ev) => ev.slug === params.slug);

  return evt;
};
