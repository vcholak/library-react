import useFetch from 'use-http';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
// @ts-ignore
import { useEffect, useState } from 'react';
import { formatDate } from './utils';

const BookDetails = () => {
  // @ts-ignore
  const { id } = useParams();

  const API_URL = `http://localhost:8080/api/books/${id}`;
  const options = {}

  const {error, data: book = {} } = useFetch(API_URL, options, []);

  // @ts-ignore
  const {response, get, err, books_data = [] } = useFetch('http://localhost:8080/api/books', options, []);

  const [books, setBooks] = useState([])
  // useEffect(() => { loadBooks() }, []) // componentDidMount

  // @ts-ignore
  async function loadBooks() {
    const books = await get('/TODO'); //TODO
    if (response.ok) setBooks(books);
  }

  const errorText = (
    <p>Error while retrieving a book: {error?.message}</p>
  );

  const noBooks = () => {
    if (books.length === 0) {
      return <p>This author has no books</p>
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
      <h1>Book: {book.title}</h1>
      <p> ()</p>
      <h4>Books</h4>
      <div style={divStyle}>
        <dl>
          {books.map(book => (
            <>
              <dt key={book.ID}>
                <Link to={`/books/${book.ID}`}>{book.title}</Link>
              </dt>
              <dd>{book.summary}</dd>
            </>
          ))}
        </dl>
        {noBooks()}
      </div>
      <hr />
      <p>
        <Link to={`/books/delete/${book.ID}`}>Delete book</Link>
      </p>
      <p>
        <Link to={`/books/update/${book.ID}`}>Update book</Link>
      </p>
      </>)}
    </div>
  );
}

export default BookDetails;
