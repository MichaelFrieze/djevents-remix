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
    maxFileSize: 500_000,
  });

  let formData = await unstable_parseMultipartFormData(request, uploadHandler);

  let image = formData.get('image');

  return image;
};

export let loader = async ({ params, request }) => {
  return params;
};

export default function EditEventModalRoute() {
  let loaderData = useLoaderData();
  let actionData = useActionData();

  return (
    <>
      <div className="overlay">
        <div className="modal">
          <div className="header">
            <Link to={`/events/edit/${loaderData.id}`}>
              <FaTimes />
            </Link>
          </div>
          {/* {title && <div>{title}</div>} */}
          <div className="body">
            <div className="form">
              <h1>Upload Event Image</h1>
              <Form method="post" encType="multipart/form-data">
                <div className="file">
                  <input type="file" id="image" name="image" />
                </div>
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
