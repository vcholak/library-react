import useFetch from 'use-http';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const GenreDetails = () => {

  // @ts-ignore
  const { id } = useParams();

  const API_URL = `http://localhost:8080/api/genres/${id}`;
  const options = {}

  const {error, data = [] } = useFetch(API_URL, options, []);

  const {response, get, err, books_data = [] } = useFetch('http://localhost:8080/api/books', options, []);

  const [books, setBooks] = useState([])
  // useEffect(() => { loadBooks() }, []) // componentDidMount

  async function loadBooks() {
    const books = await get('/TODO'); //TODO
    if (response.ok) setBooks(books);
  }

  const errorText = (
    <p>Error while retrieving a genre: {error?.message}</p>
  );

  const noBooks = () => {
    if (books.length === 0) {
      return <p>This genre has no books</p>
    }
  };

  const divStyle = {
    marginLeft: "20px",
    marginTop: "20px"
  };

  return (
    <div>
      {error ? errorText : (
      <>
      <h1>Genre: {data.name}</h1>
      <div style={divStyle}>
        <h4>Books</h4>
        <dl>
          {books.map(book => (
            <>
              <dt key={book.id}>
                <Link to={`/books/${book.id}`}>{book.title}</Link>
              </dt>
              <dd>{book.summary}</dd>
            </>
          ))}
        </dl>
        {noBooks()}
      </div>
      <hr />
      <p>
        <Link to={`/genres/delete/${data.id}`}>Delete genre</Link>
      </p>
      <p>
        <Link to={`/genres/update/${data.id}`}>Update genre</Link>
      </p>
      </>
      )}
    </div>
  )
}

export default GenreDetails;
