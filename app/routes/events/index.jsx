import { useLoaderData } from 'remix';
import { EventItem, links as eventItemLinks } from '~/components/event-item';
import { API_URL } from '~/config/index';

export let links = () => [...eventItemLinks()];

export let loader = async () => {
  let res = await fetch(`${API_URL}/api/events`);
  let events = await res.json();

  return events;
};

export default function EventsIndexRoute() {
  let events = useLoaderData();

  return (
    <>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </>
  );
}
