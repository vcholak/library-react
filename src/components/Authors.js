import useFetch from 'use-http';

const Authors = () => {

  const API_URL = "http://localhost:8080/api/authors";
  const options = {} // these options accept all native `fetch` options
  // the last argument below [] means it will fire onMount (GET by default)
  const { loading, error, data = [] } = useFetch(API_URL, options, []);

  return (
    <>
      {error && 'Error while fetching all authors!'}
      {loading && 'Loading...'}
      {data.map(author => (
        <div key={author.id}>{author.name}</div>
      ))}
    </>
  );
}

export default Authors
