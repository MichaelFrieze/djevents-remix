import { Link, Form } from 'remix';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import dashboardEventStyles from '~/styles/dashboard-event.css';

export let links = () => [
  {
    rel: 'stylesheet',
    href: dashboardEventStyles,
  },
];

// action will be handled in the dashboard route
export let DashboardEvent = ({ event }) => {
  return (
    <div className="event">
      <h4>
        <Link prefetch="intent" to={`/events/${event.attributes.slug}`}>
          {event.attributes.name}
        </Link>
      </h4>

      <Form method="post">
        <input type="hidden" name="eventID" value={event.id} />
        <button
          type="submit"
          className="btn-secondary edit"
          name="_action"
          value="edit"
        >
          <FaPencilAlt /> Edit Event
        </button>
      </Form>
      <Form method="post">
        <input type="hidden" name="eventID" value={event.id} />
        <button
          type="submit"
          className="btn-secondary delete"
          name="_action"
          value="delete"
        >
          <FaTimes /> Delete
        </button>
      </Form>
    </div>
  );
};
