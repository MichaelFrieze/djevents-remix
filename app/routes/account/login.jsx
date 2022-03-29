import { FaUser } from 'react-icons/fa';
import { Link, Form } from 'remix';
import authStyles from '~/styles/auth-form.css';

export let links = () => [{ rel: 'stylesheet', href: authStyles }];

export default function LoginRoute() {
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
