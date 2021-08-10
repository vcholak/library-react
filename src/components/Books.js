import useFetch from 'use-http';
import { Link } from 'react-router-dom';

const Books = () => {

  const API_URL = "http://localhost:8080/api/books";
  const options = {} // these options accept all native `fetch` options
  // the last argument below [] means it will fire onMount (GET by default)
  const { loading, error, data = [] } = useFetch(API_URL, options, []);
  return (
    <>
      <h1>Book List</h1>
      {error && 'Error while fetching all books!'}
      {loading && 'Loading...'}
      <ul>
      {data.map(book => (
        <li key={book.ID}>
          <Link to={`/books/${book.ID}`}>{book.title}</Link>
          <span> ({book.author.family_name}, {book.author.first_name})</span>
        </li>
      ))}
      </ul>
    </>
  );
}

export default Books;
