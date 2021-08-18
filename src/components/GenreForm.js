import useFetch from 'use-http';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const GenreForm = () => {

  const [genre, setGenre] = useState(null);
  const [err, setError] = useState(null);
  const [id, setId] = useState(null);

  const API_URL = "http://localhost:8080";
  const { post } = useFetch(API_URL);

  const handleSubmit = (event) => {
    const payload = {
      name: genre
    };
    post('/api/genres', payload)
      .then(res => {
        if (res.message) {
          setError(res.message);
        } else {
          setId(res.id);
        }
      })
      .catch(err => setError(err.mesage));
    event.preventDefault();
  };

  const result = () => {
    if (err) {
      return <p>{err}</p>;
    } else if (id) {
      return (
        <p>
          <span>Created a new genre: </span>
          <Link to={`/genres/${id}`}>{genre}</Link>
        </p>
      );
    }
  };

  return (
    <div>
      <h1>Create Genre</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label>
          Genre:
          <input type="text" name="name" className="form-control" required={true} value={genre} onChange={e => setGenre(e.target.value)}></input>
        </label>
        </div>
        <input type="submit" value="Create" className="btn btn-primary" />
      </form>
      <div>
        {result()}
      </div>
    </div>
  );
}

export default GenreForm;
