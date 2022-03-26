// import { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
import {
  Link,
  useLoaderData,
  Form,
  redirect,
  useActionData,
  useNavigate,
  unstable_parseMultipartFormData,
  unstable_createMemoryUploadHandler,
} from 'remix';
import { FaTimes } from 'react-icons/fa';
import { API_URL } from '~/config/index';
import modalStyles from '~/styles/modal.css';
import formStyles from '~/styles/form.css';

export let links = () => {
  return [
    {
      rel: 'stylesheet',
      href: modalStyles,
    },
    {
      rel: 'stylesheet',
      href: formStyles,
    },
  ];
};

export let action = async ({ request }) => {
  const uploadHandler = unstable_createMemoryUploadHandler({
    maxFileSize: 5_000_000,
  });

  let formData = await unstable_parseMultipartFormData(request, uploadHandler);
  let { eventID } = Object.fromEntries(formData);
  let formImage = formData.get('image');

  let uploadData = new FormData();
  uploadData.append('files', formImage);
  uploadData.append('ref', 'api::event.event');
  uploadData.append('refId', eventID);
  uploadData.append('field', 'image');

  let uploadResponse = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    body: uploadData,
  });

  if (!uploadResponse.ok) {
    throw new Error('Something Went Wrong');
  }

  let eventResponse = await fetch(`${API_URL}/api/events/${eventID}`);
  let event = await eventResponse.json();

  return redirect(`/events/${event.data.attributes.slug}`);
};

export let loader = async ({ params, request }) => {
  return params;
};

export default function EditEventModalRoute() {
  let loaderData = useLoaderData();

  return (
    <>
      <div className="overlay">
        <div className="modal">
          <div className="header">
            <Link to={`/events/edit/${loaderData.id}`}>
              <FaTimes />
            </Link>
          </div>
          <div className="body">
            <div className="form">
              <h1>Upload Event Image</h1>
              <Form method="post" encType="multipart/form-data">
                <div className="file">
                  <input type="file" id="image" name="image" />
                </div>
                <input type="hidden" name="eventID" value={loaderData.id} />
                <button className="btn btn-modal" type="submit">
                  Upload
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
