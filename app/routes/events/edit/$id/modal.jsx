import {
  Link,
  useLoaderData,
  Form,
  redirect,
  unstable_parseMultipartFormData,
  unstable_createMemoryUploadHandler,
  useTransition,
} from 'remix';
import { useState } from 'react';
import { getUserToken } from '~/utils/session.server';
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
  let userToken = await getUserToken(request);

  let uploadHandler = unstable_createMemoryUploadHandler({
    maxFileSize: 20_000_000,
  });

  let formData = await unstable_parseMultipartFormData(request, uploadHandler);
  let { eventID } = Object.fromEntries(formData);
  let formImage = formData.get('image-input');

  let uploadData = new FormData();
  uploadData.append('files', formImage);
  uploadData.append('ref', 'api::event.event');
  uploadData.append('refId', eventID);
  uploadData.append('field', 'image');

  // get event
  let eventRes = await fetch(
    `${process.env.API_URL}/api/events/${eventID}?populate=image`
  );

  if (!eventRes.ok) {
    console.log(eventRes);

    let eventResObj = await eventRes.json();
    throw new Error(
      `${eventResObj.error.status} | ${eventResObj.error.name} | Message: ${
        eventResObj.error.message
      } | Details: ${JSON.stringify(eventResObj.error.details)}`
    );
  }

  let eventResObj = await eventRes.json();

  // Delete previous image if exists
  if (eventResObj.data.attributes.image?.data?.id) {
    let imageID = eventResObj.data.attributes.image.data.id;
    let deletePrevImgRes = await fetch(
      `${process.env.API_URL}/api/upload/files/${imageID}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    if (!deletePrevImgRes.ok) {
      console.log(deletePrevImgRes);

      let deletePrevImgResObj = await deletePrevImgRes.json();
      throw new Error(
        `${deletePrevImgResObj.error.status} | ${
          deletePrevImgResObj.error.name
        } | Message: ${
          deletePrevImgResObj.error.message
        } | Details: ${JSON.stringify(deletePrevImgResObj.error.details)}`
      );
    }
  }

  // Upload new image
  let uploadRes = await fetch(`${process.env.API_URL}/api/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    body: uploadData,
  });

  if (!uploadRes.ok) {
    console.log(uploadRes);

    let uploadResObj = await uploadRes.json();
    throw new Error(
      `${uploadResObj.error.status} | ${uploadResObj.error.name} | Message: ${
        uploadResObj.error.message
      } | Details: ${JSON.stringify(uploadResObj.error.details)}`
    );
  }

  return redirect(`/events/${eventResObj.data.attributes.slug}`);
};

export let loader = async ({ params, request }) => {
  return params;
};

export default function EditEventModalRoute() {
  let loaderData = useLoaderData();
  let transition = useTransition();

  let [uploadBtnDisabled, setUploadBtnDisabled] = useState(() => true);

  let isUploadingImage = transition.state === 'submitting';

  if (isUploadingImage) {
    if (!uploadBtnDisabled) {
      setUploadBtnDisabled(true);
    }
  }

  let fileValidation = () => {
    let fi = document.getElementById('image-input');

    // File size validation
    if (fi.files.length > 0) {
      setUploadBtnDisabled(false);
      for (let i = 0; i <= fi.files.length - 1; i++) {
        let fsize = fi.files.item(i).size;
        let file = Math.round(fsize / 1024);
        // The size of the file.
        if (file >= 10096) {
          setUploadBtnDisabled(true);
          alert('File too Big! Please upload an image file less than 10mb.');
          fi.value = '';
          return;
        }
      }
    } else {
      setUploadBtnDisabled(true);
    }

    // You can also display filesize with this line:
    // document.getElementById('size').innerHTML = '<b>' + file + '</b> KB';

    // File type validation
    let filePath = fi.value;
    let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.webp)$/i;
    if (!allowedExtensions.exec(filePath)) {
      setUploadBtnDisabled(true);
      alert('Wrong file type! Image must be jpeg, jpg, png, or webp.');
      fi.value = '';
      return;
    } else {
      setUploadBtnDisabled(false);
    }
  };

  return (
    <>
      <div className="overlay">
        <div className="modal">
          <div className="modal-header">
            <Link to={`/events/edit/${loaderData.id}`}>
              <FaTimes />
            </Link>
          </div>
          <div className="body">
            <div className="form">
              <h1>Upload Event Image</h1>
              <p>
                <small>
                  Image type: <em>jpeg, jpg, png, webp</em>
                  <br />
                  Max size: <em>10mb</em>
                </small>
              </p>
              <Form method="post" encType="multipart/form-data">
                <div className="file">
                  <input
                    type="file"
                    id="image-input"
                    name="image-input"
                    onChange={fileValidation}
                  />
                </div>
                <input type="hidden" name="eventID" value={loaderData.id} />
                <button
                  className="btn btn-modal"
                  type="submit"
                  disabled={uploadBtnDisabled}
                >
                  {uploadBtnDisabled
                    ? isUploadingImage
                      ? 'Uploading...'
                      : 'Please choose an image file...'
                    : 'Upload'}
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
