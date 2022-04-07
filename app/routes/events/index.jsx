import { useLoaderData } from 'remix';
import { EventItem, links as eventItemLinks } from '~/components/event-item';
import { Pagination } from '~/components/pagination';

export let links = () => [...eventItemLinks()];

export let loader = async ({ request }) => {
  // Get page from params
  let url = new URL(request.url);
  let page = Number(url.searchParams.get('page') ?? 1);

  // Fetch events
  let res = await fetch(
    `${process.env.API_URL}/api/events?sort=date&pagination[page]=${page}&pagination[pageSize]=${process.env.PER_PAGE}&populate=image`
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

  let loaderData = {
    events: resObj.data,
    page: resObj.meta.pagination.page,
    pageCount: resObj.meta.pagination.pageCount,
  };

  // console.log('Events: ', loaderData);

  return loaderData;
};

export default function EventsIndexRoute() {
  let { events, page, pageCount } = useLoaderData();

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

export function ErrorBoundary({ error }) {
  console.error(error);

  return <div className="error-container">{`${error}`}</div>;
}
