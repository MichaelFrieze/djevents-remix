import {
  Link,
  useLoaderData,
  Form,
  redirect,
  unstable_parseMultipartFormData,
  unstable_createMemoryUploadHandler,
  useNavigate,
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
  let uploadHandler = unstable_createMemoryUploadHandler({
    maxFileSize: 20_000_000,
  });

  let formData = await unstable_parseMultipartFormData(request, uploadHandler);
  let { eventID } = Object.fromEntries(formData);
  let formImage = formData.get('image');

  let uploadData = new FormData();
  uploadData.append('files', formImage);
  uploadData.append('ref', 'api::event.event');
  uploadData.append('refId', eventID);
  uploadData.append('field', 'image');

  // get event
  let eventResponse = await fetch(
    `${API_URL}/api/events/${eventID}?populate=image`
  );
  let event = await eventResponse.json();

  // Delete previous image if exists
  if (event.data.attributes.image.data?.id) {
    let imageID = event.data.attributes.image.data.id;
    let deletePrevImg = await fetch(`${API_URL}/api/upload/files/${imageID}`, {
      method: 'DELETE',
    });
    if (!deletePrevImg.ok) {
      throw new Error('Something Went Wrong');
    }
  }

  let uploadResponse = await fetch(`${API_URL}/api/upload`, {
    method: 'POST',
    body: uploadData,
  });

  if (!uploadResponse.ok) {
    throw new Error('Something Went Wrong');
  }

  return redirect(`/events/${event.data.attributes.slug}`);
};

export let loader = async ({ params, request }) => {
  return params;
};

export default function EditEventModalRoute() {
  let loaderData = useLoaderData();

  let fileValidation = () => {
    let fi = document.getElementById('image');

    // File size validation
    if (fi.files.length > 0) {
      for (let i = 0; i <= fi.files.length - 1; i++) {
        let fsize = fi.files.item(i).size;
        let file = Math.round(fsize / 1024);
        // The size of the file.
        if (file >= 10096) {
          alert('File too Big! Please upload an image file less than 10mb');
          fi.value = '';
          return;
        }
      }
    }

    // You can also display filesize with this line:
    // document.getElementById('size').innerHTML = '<b>' + file + '</b> KB';

    // File type validation
    let filePath = fi.value;
    let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.webp)$/i;
    if (!allowedExtensions.exec(filePath)) {
      alert('Wrong file type! Image must be jpeg, jpg, png, or webp.');
      fi.value = '';
      return;
    }
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
                    id="image"
                    name="image"
                    onChange={fileValidation}
                  />
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
