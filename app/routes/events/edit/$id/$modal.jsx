// import { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
import {
  Link,
  useLoaderData,
  Form,
  redirect,
  useActionData,
  useNavigate,
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

// export let action = async () => {};

export let loader = async ({ params }) => {
  return params;
};

export default function EditEventModalRoute() {
  let loaderData = useLoaderData();
  let navigate = useNavigate();

  let handleClose = () => {
    console.log('close modal');
    navigate(`/events/edit/${loaderData.id}`);
  };
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
              <Form method="post">
                <div className="file">
                  <input type="file" />
                </div>
                <input type="submit" value="Upload" className="btn" />
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
