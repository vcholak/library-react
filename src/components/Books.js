import useFetch from 'use-http';

const Books = () => {

  const API_URL = "http://localhost:8080/api/books";
  const options = {} // these options accept all native `fetch` options
  // the last argument below [] means it will fire onMount (GET by default)
  const { loading, error, data = [] } = useFetch(API_URL, options, []);
  return (
    <>
      {error && 'Error while fetching all books!'}
      {loading && 'Loading...'}
      {data.map(book => (
        <div key={book.id}>{book.title}</div>
      ))}
    </>
  );
}

export default Books;
