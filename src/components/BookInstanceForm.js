import useFetch from 'use-http';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toISOStr } from './utils';

const statuses = [
	"NotAvailable",
	"OnOrder",
	"InTransit",
	"OnHold",
	"OnLoan",
	"InLibrary"
];

const BookInstanceForm = () => {

  const [bookId, setBookId] = useState(null);
  const [books, setBooks] = useState([]);
  const [imprint, setImprint] = useState(null);
  const [dueBack, setDueBack] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);

  const API_URL = "http://localhost:8080/api";

  // @ts-ignore
  const { get, post } = useFetch(API_URL);

  // Provide an empty array as the second argument to the effect hook, as this will stop it
  // from activating on component updates but only when the component is mounted
  useEffect( () => {
    loadBooks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // componentDidMount

  // @ts-ignore
  async function loadBooks() {
    const resp = await get('/books');

    if (resp.message) {
      setError('Books: ' + resp.message);
    } else {
      setBooks(resp);
    }
  }

  const handleSubmit = (event) => {
    const payload = {
      book_id: parseInt(bookId),
      imprint,
      due_back: toISOStr(dueBack),
      status
    };
    alert(JSON.stringify(payload));

    post('/copies', payload)
      .then(res => {
        if (res.message) {
          setError(res.message);
        } else {
          setId(res.id);
        }
      })
      .catch(err => setError(err.mesage));
    event.preventDefault();
  }

  const result = () => {
    if (error) {
      return <p>{error}</p>;
    } else if(id) {
      return (
        <p>
          Created a new book istance:
          <Link to={`/copies/${id}`}>{`${imprint}`}</Link>
        </p>
      );
    }
  };

  return (
    <div>
      <h1>Create BookInstance</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Book:
          <select required={true} value={bookId} onChange={e => setBookId(e.target.value)}>
          {books.map(book => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
          ))}
          </select>
        </label>
        <label>
          Imprint:
          <input type="text" name="imprint" required={true} value={imprint} onChange={e => setImprint(e.target.value)}></input>
        </label>
        <label>
          Date when book available:
          <input type="date" name="dueBack" className="form-control" required={true} value={dueBack} onChange={e => setDueBack(e.target.value)} />
        </label>
        <label>
          Status:
          <select required={true} value={status} onChange={e => setStatus(e.target.value)}>
          {statuses.map((status, index) => (
              <option key={index} value={index}>
                {status}
              </option>
          ))}
          </select>
        </label>
        <input type="submit" value="Create" />
      </form>
      <div>
        {result()}
      </div>
    </div>
  )
}

export default BookInstanceForm;
