import { Link, useLoaderData } from 'remix';
import eventStyles from '~/styles/event.css';

export let links = () => {
  return [
    {
      rel: 'stylesheet',
      href: eventStyles,
    },
  ];
};

export let loader = async ({ params: { slug } }) => {
  let res = await fetch(
    `${process.env.API_URL}/api/events?filters[slug][$eq]=${slug}&populate=image`
  );
  let event = await res.json();

  return event.data[0];
};

export default function EventRoute() {
  let event = useLoaderData();

  return (
    <>
      <div className="event">
        <span>
          {event.attributes.date} at {event.attributes.time}
        </span>
        <h1>{event.attributes.name}</h1>
        {event.attributes.image.data?.attributes.formats.medium?.url && (
          <div className="image">
            <img
              alt="Event"
              src={event.attributes.image.data.attributes.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{event.attributes.performers}</p>
        <h3>Description:</h3>
        <p>{event.attributes.description}</p>
        <h3>Venue: {event.attributes.venue}</h3>
        <p>{event.attributes.address}</p>

        <Link to="/events" className="back">
          {'<'} Go Back
        </Link>
      </div>
    </>
  );
}
