import { Link } from 'remix';
import eventItemStyles from '~/styles/components/event-item.css';

export let links = () => [
  {
    rel: 'stylesheet',
    href: eventItemStyles,
  },
];

export let EventItem = ({ evt }) => {
  return (
    <div className="event">
      <div className="img">
        <img
          src={evt.image ? evt.image : '/images/event-default.png'}
          alt="Event"
          width={170}
          height={100}
        />
      </div>

      <div className="info">
        <span>
          {evt.date} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>

      <div className="link">
        <Link prefetch="intent" to={`/events/${evt.slug}`} className="btn">
          Details
        </Link>
      </div>
    </div>
  );
};
