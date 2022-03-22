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
          src={
            evt.attributes.image
              ? evt.attributes.image.data.attributes.formats.thumbnail.url
              : '/images/event-default.png'
          }
          alt="Event"
          width={170}
          height={100}
        />
      </div>

      <div className="info">
        <span>
          {evt.attributes.date} at {evt.attributes.time}
        </span>
        <h3>{evt.attributes.name}</h3>
      </div>

      <div className="link">
        <Link
          prefetch="intent"
          to={`/events/${evt.attributes.slug}`}
          className="btn"
        >
          Details
        </Link>
      </div>
    </div>
  );
};
