import useFetch from 'use-http';
import { useState } from 'react';

const BookForm = () => {

  const [genre, setGenre] = useState('');
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);

  const API_URL = "http://localhost:8080/api/books";
  const options = {}
  const request = useFetch(API_URL, options, []);

  const handleChange = (event) => {
    setGenre(event.target.value);
  };

  const handleSubmit = (event) => {
    request.post({"name": event.target.value})
      .then(res => setId(res.id))
      .catch(err => setError(err.mesage));
    event.preventDefault();
  };

  return (
    <div>
      <h1>Create Book</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="name" required={true} value={genre} onChange={handleChange}></input>
        </label>
        <label>
          Author:
          <input type="select" name="name" required={true} value={genre} onChange={handleChange}></input>
        </label>
        <label>
          Summary:
          <input type="text" name="name" required={true} value={genre} onChange={handleChange}></input>
        </label>
        <label>
          ISBN:
          <input type="text" name="name" required={true} value={genre} onChange={handleChange}></input>
        </label>
        TODO - add all genres (checkboxes)
        <input type="submit" value="Create" />
      </form>
      <div>
        {error}
        {id && 'Created a new book: TODO add a link to book detail: ' + id}
      </div>
    </div>
  )
}

export default BookForm;
