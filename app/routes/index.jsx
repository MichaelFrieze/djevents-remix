import { Link, useLoaderData } from 'remix';
import { EventItem, links as eventItemLinks } from '~/components/event-item';

export let links = () => [...eventItemLinks()];

export let loader = async () => {
  let res = await fetch(
    `${process.env.API_URL}/api/events?sort=date&pagination[limit]=3&populate=*`
  );
  let events = await res.json();

  return events.data;
};

export default function IndexRoute() {
  let events = useLoaderData();

  return (
    <>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link prefetch="intent" to="/events" className="btn-secondary">
          View All Events
        </Link>
      )}
    </>
  );
}
