import { Link } from 'remix';
import footerStyles from '~/styles/footer.css';

export let links = () => [
  {
    rel: 'stylesheet',
    href: footerStyles,
  },
];

export let Footer = () => {
  return (
    <footer className="footer">
      <p>Copyright &copy; DJ Events 2021</p>
      <p>
        <Link prefetch="intent" to="/about">
          About This Project
        </Link>
      </p>
    </footer>
  );
};
