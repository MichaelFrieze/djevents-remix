import { FaUser } from 'react-icons/fa';
import { Link, Form, useActionData, redirect } from 'remix';
import { login, createUserSession, getUser } from '~/utils/session.server';
import authStyles from '~/styles/auth-form.css';

export let links = () => [{ rel: 'stylesheet', href: authStyles }];

export let action = async ({ request }) => {
  let form = await request.formData();
  let email = form.get('email');
  let password = form.get('password');

  if (typeof email !== 'string' || typeof password !== 'string') {
    return {
      formError: `Form not submitted correctly.`,
    };
  }

  let fields = { email, password };
  let fieldErrors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };
  if (Object.values(fieldErrors).some(Boolean)) return { fieldErrors, fields };

  let user = await login({ email, password });

  if (!user) {
    return {
      fields,
      formError: `Wasn't able to get a user object from the login function in session utils.`,
    };
  }

  if (user.error) {
    return {
      fields,
      formError: `email/Password combination is incorrect`,
    };
  }

  return createUserSession(user.jwt);
};

export let loader = async ({ request }) => {
  let user = await getUser(request);

  if (user) {
    return redirect('/');
  } else {
    return null;
  }
};

export default function LoginRoute() {
  let actionData = useActionData();

  return (
    <>
      <div className="auth">
        <h1>
          <FaUser /> Log In
        </h1>
        <Form
          method="post"
          aria-describedby={
            actionData?.formError ? 'form-error-message' : undefined
          }
        >
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={actionData?.fields?.email}
              aria-invalid={Boolean(actionData?.fieldErrors?.email)}
              aria-describedby={
                actionData?.fieldErrors?.email ? 'email-error' : undefined
              }
            />
            {actionData?.fieldErrors?.email ? (
              <p
                className="form-validation-error"
                role="alert"
                id="email-error"
              >
                {actionData?.fieldErrors.email}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              defaultValue={actionData?.fields?.password}
              aria-invalid={Boolean(actionData?.fieldErrors?.password)}
              aria-describedby={
                actionData?.fieldErrors?.password ? 'password-error' : undefined
              }
            />
            {actionData?.fieldErrors?.password ? (
              <p
                className="form-validation-error"
                role="alert"
                id="password-error"
              >
                {actionData?.fieldErrors.password}
              </p>
            ) : null}
          </div>

          <div id="form-error-message">
            {actionData?.formError ? (
              <p className="form-validation-error" role="alert">
                {actionData?.formError}
              </p>
            ) : null}
          </div>

          <button type="submit" className="btn">
            Login
          </button>
        </Form>

        <p>
          Don't have an account?{' '}
          <Link prefetch="intent" to="/account/register">
            Register
          </Link>
        </p>
      </div>
    </>
  );
}

let validateEmail = (email) => {
  if (typeof email !== 'string' || email.length < 3) {
    return `Email must be at least 3 characters long`;
  }
};

let validatePassword = (password) => {
  if (typeof password !== 'string' || password.length < 3) {
    return `Password must be at least 3 characters long`;
  }
};
