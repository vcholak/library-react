import { Link } from 'react-router-dom';
import useFetch from 'use-http';

const Genres = () => {

  const API_URL = "http://localhost:8080/api/genres";
  const options = {} // these options accept all native `fetch` options
  // the last argument below [] means it will fire onMount (GET by default)
  const { loading, error, data = [] } = useFetch(API_URL, options, []);
  return (
    <>
      <h1>Genre List</h1>
      {error && 'Error while fetching all genres!'}
      {loading && 'Loading...'}
      <ul>
      {data.map(genre => (
        <li key={genre.id}>
          <Link to={`/genres/${genre.id}`}>{genre.name}</Link>
        </li>
      ))}
      </ul>
    </>
  );
}

export default Genres;
