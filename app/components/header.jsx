import { NavLink } from 'remix';

export const Header = () => {
  return (
    <header>
      <div>
        <NavLink prefetch="intent" to="/">
          DJ Events
        </NavLink>
      </div>

      <nav>
        <ul>
          <li>
            <NavLink prefetch="intent" to="/events">
              Events{' '}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
