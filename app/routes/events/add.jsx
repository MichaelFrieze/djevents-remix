import { Link, useLoaderData } from 'remix';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

export let loader = async () => {
  return API_URL;
};

export default function AddEventRoute() {
  let navigate = useNavigate();
  let strapiURL = useLoaderData();

  let [values, setValues] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  });

  let handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    let hasEmptyFields = Object.values(values).some(
      (element) => element === ''
    );
    if (hasEmptyFields) {
      alert('Please fill in all fields');
      return;
    }

    let strapiAddEventData = {
      data: {
        ...values,
        slug: values.name.toLowerCase().replace(/'/g, '').replace(/\s/g, '-'),
      },
    };

    // remove apostrophes from a string
    let removeApostrophes = (str) => {
      return str.replace(/'/g, '');
    };

    let res = await fetch(`${strapiURL}/api/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(strapiAddEventData),
    });
    if (!res.ok) {
      throw new Error('Something Went Wrong');
    } else {
      let evt = await res.json();
      console.log(evt);
      navigate(`/events/${evt.data.attributes.slug}`);
    }
  };

  let handleInputChange = (e) => {
    let { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <>
      <Link to="/events">Go Back</Link>
      <h1>Add Event</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="grid">
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type="submit" value="Add Event" className="btn" />
      </form>
    </>
  );
}
