import qs from 'qs';
import { useLoaderData, Link } from 'remix';
import { EventItem, links as eventItemLinks } from '~/components/event-item';
import { API_URL } from '~/config/index';

export let links = () => [...eventItemLinks()];

export let loader = async ({ request }) => {
  let url = new URL(request.url);
  let term = url.searchParams.get('term');

  let query = qs.stringify(
    {
      filters: {
        $or: [
          {
            name: {
              $containsi: term,
            },
          },
          {
            performers: {
              $containsi: term,
            },
          },
          {
            description: {
              $containsi: term,
            },
          },
          {
            venue: {
              $containsi: term,
            },
          },
        ],
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  let res = await fetch(`${API_URL}/api/events?${query}&populate=image`);
  let { data } = await res.json();

  return {
    events: data,
    term,
  };
};

export default function EventsSearchRoute() {
  let { events, term } = useLoaderData();

  return (
    <>
      <Link to="/events">Go Back</Link>
      <h1>Search Results for "{term}"</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </>
  );
}
