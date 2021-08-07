import useFetch from 'use-http';
import { useState } from 'react';

const BookInstanceForm = () => {

  const [genre, setGenre] = useState('');
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);

  const API_URL = "http://localhost:8080/api/copies";
  const options = {}
  const request = useFetch(API_URL, options, []);

  const handleChange = (event) => {
    setGenre(event.target.value);
  }

  const handleSubmit = (event) => {
    request.post({"name": event.target.value})
      .then(res => setId(res.id))
      .catch(err => setError(err.mesage));
    event.preventDefault();
  }

  return (
    <div>
      <h1>Create BookInstance</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Book:
          <input type="select" name="name" required={true} value={genre} onChange={handleChange}></input>
        </label>
        <label>
          Imprint:
          <input type="text" name="name" required={true} value={genre} onChange={handleChange}></input>
        </label>
        <label>
          Date when book available:
          <input type="text" name="name" required={true} value={genre} onChange={handleChange}></input>
        </label>
        <label>
          Status:
          <input type="select" name="name" required={true} value={genre} onChange={handleChange}></input>
        </label>
        <input type="submit" value="Create" />
      </form>
      <div>
        {error}
        {id && 'Created a new book istance: TODO add a link to copy detail: ' + id}
      </div>
    </div>
  )
}

export default BookInstanceForm;
