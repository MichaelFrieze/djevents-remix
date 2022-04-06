import { Link } from 'remix';

export const Pagination = ({ page, pageCount }) => {
  return (
    <>
      {page > 1 && (
        <Link
          to={`/events?page=${page - 1}`}
          className="btn-secondary"
          prefetch="intent"
        >
          Prev
        </Link>
      )}

      {page < pageCount && (
        <Link
          to={`/events?page=${page + 1}`}
          className="btn-secondary"
          prefetch="intent"
        >
          Next
        </Link>
      )}
    </>
  );
};
