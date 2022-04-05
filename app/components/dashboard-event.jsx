import { Link } from 'remix';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import dashboardEventStyles from '~/styles/dashboard-event.css';

export let links = () => [
  {
    rel: 'stylesheet',
    href: dashboardEventStyles,
  },
];

export let Footer = ({ event, handleDelete }) => {
  return (
    <div className="event">
      <h4>
        <Link prefetch="intent" to={`/events/${event.slug}`}>
          {event.name}
        </Link>
      </h4>
      <Link to={`/events/edit/${event.id}`} className="edit">
        <FaPencilAlt /> <span>Edit Event</span>
      </Link>
      <a href="#" className="delete" onClick={() => handleDelete(event.id)}>
        <FaTimes /> <span>Delete</span>
      </a>
    </div>
  );
};
