import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { Link, useLoaderData } from 'remix';
import { API_URL } from '~/config/index';
import eventStyles from '~/styles/routes/event.css';

export let links = () => {
  return [
    {
      rel: 'stylesheet',
      href: eventStyles,
    },
  ];
};

export let loader = async ({ params: { slug } }) => {
  const res = await fetch(`${API_URL}/api/events/${slug}`);
  let event = await res.json();

  // this should should only one event in the terminal
  console.log(event);
  // console.log(events[0]) should show the same
  // console.log(events[1]) should show undefined

  return event[0];
};

export default function EventRoute() {
  let event = useLoaderData();

  const deleteEvent = (e) => {
    console.log('delete');
  };

  return (
    <>
      <div className="event">
        <div className="controls">
          <Link to={`/events/edit/${event.id}`}>
            <FaPencilAlt /> Edit Event
          </Link>
          <a href="#" className="delete" onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {event.date} at {event.time}
        </span>
        <h1>{event.name}</h1>
        {event.image && (
          <div className="image">
            <img alt="Event" src={event.image} width={960} height={600} />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{event.performers}</p>
        <h3>Description:</h3>
        <p>{event.description}</p>
        <h3>Venue: {event.venue}</h3>
        <p>{event.address}</p>

        <Link to="/events" className="back">
          {'<'} Go Back
        </Link>
      </div>
    </>
  );
}
