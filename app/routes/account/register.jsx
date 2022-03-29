import { FaUser } from 'react-icons/fa';
import { Link, Form } from 'remix';
import authStyles from '~/styles/auth-form.css';

export let links = () => [{ rel: 'stylesheet', href: authStyles }];

export default function RegisterRoute() {
  return (
    <>
      <div className="auth">
        <h1>
          <FaUser /> Register
        </h1>
        <Form method="post">
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
            />
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
