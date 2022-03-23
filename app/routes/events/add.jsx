import { Link, Form, redirect, useActionData } from 'remix';
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

function validateForm(field, value) {
  switch (field) {
    case 'name': {
      if (typeof value !== 'string' || value.length < 1) {
        return `Event name must be at least 1 character long`;
      }
    }
    case 'performers': {
      if (typeof value !== 'string' || value.length < 1) {
        return `Performers must be at least 1 character long`;
      }
    }
    case 'venue': {
      if (typeof value !== 'string' || value.length < 1) {
        return `Venue must be at least 1 character long`;
      }
    }
    case 'address': {
      if (typeof value !== 'string' || value.length < 1) {
        return `Address must be at least 1 character long`;
      }
    }
    case 'date': {
      if (typeof value !== 'string' || value.length < 1) {
        return `Please enter a date`;
      }
    }
    case 'time': {
      if (typeof value !== 'string' || value.length < 1) {
        return `Please enter a time`;
      }
    }
    case 'description': {
      if (typeof value !== 'string' || value.length < 1) {
        return `Please enter a description`;
      }
    }
  }
}

export let action = async ({ request }) => {
  let formData = await request.formData();
  let fields = Object.fromEntries(formData);
  console.log(fields.date);

  let fieldErrors = {
    name: validateForm('name', fields.name),
    performers: validateForm('performers', fields.performers),
    venue: validateForm('venue', fields.venue),
    address: validateForm('address', fields.address),
    date: validateForm('date', fields.date),
    time: validateForm('time', fields.time),
    // description: validateForm('description', fields.description),
  };
  if (Object.values(fieldErrors).some(Boolean)) return { fieldErrors, fields };

  let strapiAddEventData = {
    data: {
      ...fields,
      slug: fields.name.toLowerCase().replace(/'/g, '').replace(/\s/g, '-'),
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
  // return fields;
};

export default function AddEventRoute() {
  let actionData = useActionData();

  return (
    <>
      <Link to="/events">Go Back</Link>
      <h1>Add Event</h1>
      <Form method="post" className="form">
        <div className="grid">
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={actionData?.fields?.name}
              aria-invalid={Boolean(actionData?.fieldErrors?.name)}
              aria-describedby={
                actionData?.fieldErrors?.name ? 'name-error' : undefined
              }
            />
            {actionData?.fieldErrors?.name ? (
              <p className="form-validation-error" role="alert" id="name-error">
                {actionData?.fieldErrors.name}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              defaultValue={actionData?.fields?.performers}
              aria-invalid={Boolean(actionData?.fieldErrors?.performers)}
              aria-describedby={
                actionData?.fieldErrors?.performers
                  ? 'performers-error'
                  : undefined
              }
            />
            {actionData?.fieldErrors?.performers ? (
              <p
                className="form-validation-error"
                role="alert"
                id="performers-error"
              >
                {actionData?.fieldErrors.performers}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              defaultValue={actionData?.fields?.venue}
              aria-invalid={Boolean(actionData?.fieldErrors?.venue)}
              aria-describedby={
                actionData?.fieldErrors?.venue ? 'venue-error' : undefined
              }
            />
            {actionData?.fieldErrors?.venue ? (
              <p
                className="form-validation-error"
                role="alert"
                id="venue-error"
              >
                {actionData?.fieldErrors.venue}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              defaultValue={actionData?.fields?.address}
              aria-invalid={Boolean(actionData?.fieldErrors?.address)}
              aria-describedby={
                actionData?.fieldErrors?.address ? 'address-error' : undefined
              }
            />
            {actionData?.fieldErrors?.address ? (
              <p
                className="form-validation-error"
                role="alert"
                id="address-error"
              >
                {actionData?.fieldErrors.address}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              aria-invalid={Boolean(actionData?.fieldErrors?.date)}
              aria-describedby={
                actionData?.fieldErrors?.date ? 'date-error' : undefined
              }
            />
            {actionData?.fieldErrors?.date ? (
              <p className="form-validation-error" role="alert" id="date-error">
                {actionData?.fieldErrors.date}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              defaultValue={actionData?.fields?.time}
              aria-invalid={Boolean(actionData?.fieldErrors?.time)}
              aria-describedby={
                actionData?.fieldErrors?.time ? 'time-error' : undefined
              }
            />
            {actionData?.fieldErrors?.time ? (
              <p className="form-validation-error" role="alert" id="time-error">
                {actionData?.fieldErrors.time}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            defaultValue={actionData?.fields?.description}
            aria-invalid={Boolean(actionData?.fieldErrors?.description)}
            aria-describedby={
              actionData?.fieldErrors?.description
                ? 'description-error'
                : undefined
            }
          ></textarea>
          {actionData?.fieldErrors?.description ? (
            <p
              className="form-validation-error"
              role="alert"
              id="description-error"
            >
              {actionData?.fieldErrors.description}
            </p>
          ) : null}
        </div>

        <button className="btn" type="submit">
          Add Event
        </button>
      </Form>
    </>
  );
}
