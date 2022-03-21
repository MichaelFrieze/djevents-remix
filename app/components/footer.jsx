import { Link } from 'remix';

export const Footer = () => {
  return (
    <footer>
      <p>Copyright &copy; DJ Events 2021</p>
      <p>
        <Link prefetch="intent" to="/about">
          About This Project
        </Link>
      </p>
    </footer>
  );
};
