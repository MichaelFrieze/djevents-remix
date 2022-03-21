import { Link, useLoaderData } from 'remix';
import { EventItem, links as eventItemLinks } from '~/components/event-item';
import { API_URL } from '~/config/index';

export let links = () => [...eventItemLinks()];

export let loader = async () => {
  let res = await fetch(`${API_URL}/api/events`);
  let events = await res.json();

  return events.slice(0, 3);
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
