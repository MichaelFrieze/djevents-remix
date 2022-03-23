import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { Link, useLoaderData, Form, redirect, useActionData } from 'remix';
import { API_URL } from '~/config/index';
import eventStyles from '~/styles/routes/events/$slug.css';

export let links = () => {
  return [
    {
      rel: 'stylesheet',
      href: eventStyles,
    },
  ];
};

export let action = async ({ request }) => {
  let formData = await request.formData();
  let { _action, eventID } = Object.fromEntries(formData);

  if (_action === 'delete') {
    const res = await fetch(`${API_URL}/api/events/${eventID}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    } else {
      // to slow down the redirect
      await new Promise((res) => {
        setTimeout(res, 1000);
      });
      return redirect('/events');
    }
  }

  if (_action === 'edit') {
    // return redirect('/events');
    console.log('action: ', _action);
  }
  return formData;
};

export let loader = async ({ params: { slug } }) => {
  const res = await fetch(
    `${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=image`
  );
  let event = await res.json();

  return event.data[0];
};

export default function EventRoute() {
  let event = useLoaderData();
  let actionData = useActionData();

  return (
    <>
      <div className="event">
        <div className="controls">
          {/* <Form method="post">
            <input type="hidden" name="hiddenValue" value={event} />
            <button
              type="submit"
              className="btn-secondary"
              name="_action"
              value="edit"
            >
              <FaPencilAlt /> Edit Event
            </button>
          </Form> */}
          <Form method="post">
            <input type="hidden" name="eventID" value={event.id} />
            <button
              type="submit"
              className="btn-secondary"
              name="_action"
              value="delete"
            >
              <FaTimes /> Delete Event
            </button>
          </Form>
        </div>

        <span>
          {event.attributes.date} at {event.attributes.time}
        </span>
        <h1>{event.attributes.name}</h1>
        {event.attributes.image.data && (
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
