import { useLoaderData } from 'remix';
import {
  DashboardEvent,
  links as dashboardEventLinks,
} from '~/components/dashboard-event';
import { getUser } from '~/utils/session.server';

import dashboardStyles from '~/styles/dashboard.css';

export let links = () => [
  {
    rel: 'stylesheet',
    href: dashboardStyles,
  },
  ...dashboardEventLinks(),
];

export let loader = async ({ request }) => {
  let user = await getUser(request);
  let userID = user.id;

  let res = await fetch(
    `${process.env.API_URL}/api/events?filters[user][id][$eq]=${userID}&populate=*`
  );

  let events = await res.json();

  return events.data;
};

export default function DashboardRoute() {
  let events = useLoaderData();
  let deleteEvent = (id) => {
    console.log(id);
  };

  return (
    <>
      <div className="dash">
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events.map((event) => (
          <DashboardEvent
            key={event.id}
            event={event}
            handleDelete={deleteEvent}
          />
        ))}
      </div>
    </>
  );
}
