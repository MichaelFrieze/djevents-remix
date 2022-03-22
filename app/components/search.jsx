import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchStyles from '~/styles/components/search.css';

export let links = () => [
  {
    rel: 'stylesheet',
    href: searchStyles,
  },
];

export let Search = () => {
  let [term, setTerm] = useState('');
  let navigate = useNavigate();

  let handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/events/search?term=${term}`);
    setTerm('');
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search Events"
        />
      </form>
    </div>
  );
};
