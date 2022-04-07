import { Link, useLoaderData } from 'remix';
import { EventItem, links as eventItemLinks } from '~/components/event-item';

export let links = () => [...eventItemLinks()];

export let loader = async () => {
  let res = await fetch(
    `${process.env.API_URL}/api/events?sort=date&pagination[limit]=3&populate=*`
  );

  if (!res.ok) {
    console.error(res);

    let resObj = await res.json();
    throw new Error(
      `${resObj.error.status} | ${resObj.error.name} | Message: ${
        resObj.error.message
      } | Details: ${JSON.stringify(resObj.error.details)}`
    );
  }

  let resObj = await res.json();

  return resObj.data;
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

export function ErrorBoundary({ error }) {
  console.error(error);

  return <div className="error-container">{`${error}`}</div>;
}
