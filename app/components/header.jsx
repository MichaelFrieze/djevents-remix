import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { NavLink } from 'remix';
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
          <li>
            <NavLink prefetch="intent" to="/events/add">
              Add Event
            </NavLink>
          </li>
          <li>
            <NavLink
              prefetch="intent"
              to="/account/login"
              className="btn-secondary btn-icon"
            >
              <FaSignInAlt /> Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
