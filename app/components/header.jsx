import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { NavLink, useLoaderData, useNavigate } from 'remix';
import { useEffect } from 'react';
import { Search, links as searchLinks } from '~/components/search';
import headerStyles from '~/styles/header.css';

export let links = () => [
  {
    rel: 'stylesheet',
    href: headerStyles,
  },
  ...searchLinks(),
];

export let Header = () => {
  // getting user from loader in the root
  // header will always be in root since it's a part of layout
  let user = useLoaderData();
  let navigate = useNavigate();

  let handleLoginBtn = () => {
    navigate('/account/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <NavLink prefetch="intent" to="/">
          DJ Events
        </NavLink>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <NavLink prefetch="intent" to="/events">
              Events
            </NavLink>
          </li>
          {user ? (
            <>
              <li>
                <NavLink prefetch="intent" to="/events/add">
                  Add Event
                </NavLink>
              </li>
              <li>
                <NavLink to="/account/dashboard">Dashboard</NavLink>
              </li>
              <li>
                <form action="/account/logout" method="post">
                  <button type="submit" className="btn-secondary btn-icon">
                    <FaSignOutAlt /> Logout
                  </button>
                </form>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  type="button"
                  className="btn-secondary btn-icon"
                  onClick={handleLoginBtn}
                >
                  <FaSignInAlt /> Login
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
