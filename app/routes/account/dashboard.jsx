import { useLoaderData, redirect } from 'remix';
import {
  DashboardEvent,
  links as dashboardEventLinks,
} from '~/components/dashboard-event';
import { getUser, getUserToken } from '~/utils/session.server';

import dashboardStyles from '~/styles/dashboard.css';

export let links = () => [
  {
    rel: 'stylesheet',
    href: dashboardStyles,
  },
  ...dashboardEventLinks(),
];

export let meta = () => {
  return {
    title: 'DJ Events | Dashboard',
  };
};

export let action = async ({ request }) => {
  let formData = await request.formData();
  let { _action, eventID } = Object.fromEntries(formData);
  let userToken = await getUserToken(request);

  if (_action === 'delete') {
    let res = await fetch(`${process.env.API_URL}/api/events/${eventID}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    let data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    } else {
      return redirect('/account/dashboard');
    }
  }

  if (_action === 'edit') {
    return redirect(`/events/edit/${eventID}`);
  }

  return formData;
};

export let loader = async ({ request }) => {
  let user = await getUser(request);

  if (!user) {
    return redirect('/');
  }

  let userToken = await getUserToken(request);

  let res = await fetch(`${process.env.API_URL}/api/events/me?populate=*`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  let events = await res.json();

  return events.data.attributes.results;
};

export default function DashboardRoute() {
  let events = useLoaderData();
  console.log(events);

  return (
    <>
      <div className="dash">
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events.map((event) => (
          <DashboardEvent key={event.id} event={event} />
        ))}
      </div>
    </>
  );
}
