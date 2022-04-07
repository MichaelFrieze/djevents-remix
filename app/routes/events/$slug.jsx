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

  if (!res.ok) {
    console.error(res);

    let resObj = await res.json();
    throw new Error(
      `${resObj.error.status} | ${resObj.error.name} | Message: ${
        resObj.error.message
      } | Details: ${JSON.stringify(resObj.error.details)}`
    );
  }

  let resObj = await res.json();

  return resObj.data[0];
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
        {event.attributes.image?.data?.attributes?.formats?.medium?.url && (
          <div className="image">
            <picture>
              <source
                media="(max-width: 300px)"
                srcSet={
                  event.attributes.image.data.attributes.formats.medium.url
                }
                width={200}
                height={125}
              />

              <source
                media="(max-width: 360px)"
                srcSet={
                  event.attributes.image.data.attributes.formats.medium.url
                }
                width={250}
                height={156}
              />

              <source
                media="(max-width: 460px)"
                srcSet={
                  event.attributes.image.data.attributes.formats.medium.url
                }
                width={300}
                height={187}
              />

              <source
                media="(max-width: 592px)"
                srcSet={
                  event.attributes.image.data.attributes.formats.medium.url
                }
                width={400}
                height={250}
              />

              <source
                media="(max-width: 670px)"
                srcSet={
                  event.attributes.image.data.attributes.formats.medium.url
                }
                width={500}
                height={312}
              />

              <source
                media="(max-width: 850px)"
                srcSet={
                  event.attributes.image.data.attributes.formats.medium.url
                }
                width={600}
                height={375}
              />

              <source
                media="(max-width: 1000px)"
                srcSet={
                  event.attributes.image.data.attributes.formats.medium.url
                }
                width={750}
                height={468}
              />

              <source
                media="(max-width: 1250px)"
                srcSet={
                  event.attributes.image.data.attributes.formats.medium.url
                }
                width={900}
                height={562}
              />

              <img
                alt="Event"
                srcSet={
                  event.attributes.image.data.attributes.formats.medium.url
                }
                width={960}
                height={600}
              />
            </picture>
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

export function ErrorBoundary({ error }) {
  console.error(error);

  return <div className="error-container">{`${error}`}</div>;
}
