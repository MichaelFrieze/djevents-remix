import { Link, Form, redirect } from 'remix';
import { API_URL } from '~/config/index';
import addEventStyles from '~/styles/routes/events/add.css';

export let links = () => {
  return [
    {
      rel: 'stylesheet',
      href: addEventStyles,
    },
  ];
};

export let leader = async () => {};

export let action = async ({ request }) => {
  let formData = await request.formData();
  let values = Object.fromEntries(formData);

  let strapiAddEventData = {
    data: {
      ...values,
      slug: values.name.toLowerCase().replace(/'/g, '').replace(/\s/g, '-'),
    },
  };

  let res = await fetch(`${API_URL}/api/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(strapiAddEventData),
  });

  if (!res.ok) {
    throw new Error('Something Went Wrong');
  }

  let evt = await res.json();

  return redirect(`/events/${evt.data.attributes.slug}`);
};

export default function AddEventRoute() {
  return (
    <>
      <Link to="/events">Go Back</Link>
      <h1>Add Event</h1>
      <Form method="post" className="form">
        <div className="grid">
          <div>
            <label htmlFor="name">Event Name</label>
            <input type="text" id="name" name="name" />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input type="text" name="performers" id="performers" />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input type="text" name="venue" id="venue" />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input type="text" name="address" id="address" />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input type="date" name="date" id="date" />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input type="text" name="time" id="time" />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea type="text" name="description" id="description"></textarea>
        </div>

        <button className="btn" type="submit">
          Add Event
        </button>
      </Form>
    </>
  );
}
