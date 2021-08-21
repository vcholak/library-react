import useFetch from 'use-http';
import { Link } from 'react-router-dom';
import { formatDate } from './utils';

const Authors = () => {

  const API_URL = "http://localhost:8080/api/authors";
  const options = {} // these options accept all native `fetch` options
  // the last argument below [] means it will fire onMount (GET by default)
  const { loading, error, data = [] } = useFetch(API_URL, options, []);

  return (
    <>
      <h1>Author List</h1>
      {error && 'Error while fetching all authors!'}
      {loading && 'Loading...'}
      <ul>
      {data.map(author => (
        <li key={author.id}>
          <Link to={`/authors/${author.id}`}>{author.familyName}, {author.firstName}</Link>
          <span> ({formatDate(author.birthDate)} - {formatDate(author.deathDate)})</span>
        </li>
      ))}
      </ul>
    </>
  );
}

export default Authors
