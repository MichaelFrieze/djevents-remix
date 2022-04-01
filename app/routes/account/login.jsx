import { FaUser } from 'react-icons/fa';
import { Link, Form, json, useActionData } from 'remix';
import { login } from '~/utils/session.server';
import authStyles from '~/styles/auth-form.css';

export let links = () => [{ rel: 'stylesheet', href: authStyles }];

let badRequest = (data) => json(data, { status: 400 });

export let action = async ({ request }) => {
  let form = await request.formData();
  let email = form.get('email');
  let password = form.get('password');

  if (typeof email !== 'string' || typeof password !== 'string') {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  let fields = { email, password };

  let user = await login({ email, password });

  console.log(user);

  if (!user) {
    return badRequest({
      fields,
      formError: `User doesn't exists.`,
    });
  }

  if (user.error) {
    return badRequest({
      fields,
      formError: `email/Password combination is incorrect`,
    });
  }

  return json({ user });
};

export default function LoginRoute() {
  let actionData = useActionData();
  console.log(actionData);

  return (
    <>
      <div className="auth">
        <h1>
          <FaUser /> Log In
        </h1>
        <Form method="post">
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
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
