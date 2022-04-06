import { FaUser } from 'react-icons/fa';
import { Link, Form, useActionData, redirect } from 'remix';
import { register, createUserSession, getUser } from '~/utils/session.server';

import authStyles from '~/styles/auth-form.css';

export let links = () => [{ rel: 'stylesheet', href: authStyles }];

export let meta = () => {
  return {
    title: 'DJ Events | Register',
  };
};

export let action = async ({ request }) => {
  let form = await request.formData();
  let username = form.get('username');
  let email = form.get('email');
  let password = form.get('password');
  let passwordConfirm = form.get('passwordConfirm');

  if (
    typeof username !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof passwordConfirm !== 'string'
  ) {
    return {
      formError: `Form not submitted correctly.`,
    };
  }

  let fields = { username, email, password, passwordConfirm };
  let fieldErrors = {
    username: validateUsername(username),
    email: validateEmail(email),
    password: validatePassword(password),
    passwordConfirm: validatePasswordConfirm(passwordConfirm, password),
  };
  if (Object.values(fieldErrors).some(Boolean)) return { fieldErrors, fields };

  let user = await register({ username, email, password });

  if (!user) {
    return {
      fields,
      formError: `Wasn't able to get a user object from the register function in session utils. Maybe Strapi is down?`,
    };
  }

  if (user.error) {
    let status = user.error.status;
    let name = user.error.name;
    let message = user.error.message;

    return {
      fields,
      formError: `Strapi Error: ${name} | ${message} | Status: ${status}`,
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

export default function RegisterRoute() {
  let actionData = useActionData();

  return (
    <>
      <div className="auth">
        <h1>
          <FaUser /> Register
        </h1>
        <Form
          method="post"
          aria-describedby={
            actionData?.formError ? 'form-error-message' : undefined
          }
        >
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={actionData?.fields?.username}
              aria-invalid={Boolean(actionData?.fieldErrors?.username)}
              aria-describedby={
                actionData?.fieldErrors?.username ? 'username-error' : undefined
              }
            />
            {actionData?.fieldErrors?.username ? (
              <p
                className="form-validation-error"
                role="alert"
                id="username-error"
              >
                {actionData?.fieldErrors.username}
              </p>
            ) : null}
          </div>
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
          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              defaultValue={actionData?.fields?.passwordConfirm}
              aria-invalid={Boolean(actionData?.fieldErrors?.passwordConfirm)}
              aria-describedby={
                actionData?.fieldErrors?.passwordConfirm
                  ? 'passwordConfirm-error'
                  : undefined
              }
            />
            {actionData?.fieldErrors?.passwordConfirm ? (
              <p
                className="form-validation-error"
                role="alert"
                id="passwordConfirm-error"
              >
                {actionData?.fieldErrors.passwordConfirm}
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
            Register
          </button>
        </Form>

        <p>
          Already have an account?{' '}
          <Link prefetch="intent" to="/account/login">
            Login
          </Link>
        </p>
      </div>
    </>
  );
}

let validateUsername = (username) => {
  if (typeof username !== 'string' || username.length < 3) {
    return `Username must be at least 3 characters long`;
  }
};

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

let validatePasswordConfirm = (passwordConfirm, password) => {
  if (passwordConfirm !== password) {
    return `Passwords must match`;
  }
};
