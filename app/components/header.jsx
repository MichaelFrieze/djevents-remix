import { NavLink } from 'remix';
import headerStyles from '~/styles/components/header.css';

export let links = () => [
  {
    rel: 'stylesheet',
    href: headerStyles,
  },
];

export let Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <NavLink prefetch="intent" to="/">
          DJ Events
        </NavLink>
      </div>

      <nav>
        <ul>
          <li>
            <NavLink prefetch="intent" to="/events">
              Events
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
