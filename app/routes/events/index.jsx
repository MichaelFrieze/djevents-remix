import { useLoaderData } from 'remix';
import { EventItem, links as eventItemLinks } from '~/components/event-item';
import { Pagination } from '~/components/pagination';
import { API_URL, PER_PAGE } from '~/config/index';

export let links = () => [...eventItemLinks()];

export let loader = async ({ request }) => {
  // Get page from params
  let url = new URL(request.url);
  let page = Number(url.searchParams.get('page') ?? 1);

  // Fetch events
  let res = await fetch(
    `${API_URL}/api/events?sort=date&pagination[page]=${page}&pagination[pageSize]=${PER_PAGE}&populate=*`
  );
  let events = await res.json();

  return events;
};

export default function EventsIndexRoute() {
  let { data, meta } = useLoaderData();
  let page = meta.pagination.page;
  let pageCount = meta.pagination.pageCount;
  let events = data;

  return (
    <>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Pagination page={page} pageCount={pageCount} />
    </>
  );
}
