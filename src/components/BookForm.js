import useFetch from 'use-http';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BookForm = () => {

  const [title, setTitle] = useState(null);
  const [authorId, setAuthorId] = useState(null);
  const [summary, setSummary] = useState(null);
  const [isbn, setIsbn] = useState(null);
  const [genreId, setGenreId] = useState(null);
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);

  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);

  // @ts-ignore
  const { get } = useFetch('http://localhost:8080/api');

  // Provide an empty array as the second argument to the effect hook, as this will stop it
  // from activating on component updates but only when the component is mounted
  useEffect( () => {
     loadAuthors();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []) // componentDidMount

  // @ts-ignore
  async function loadAuthors() {
    const resp = await get('/authors');

    if (resp.message) {
      setError('Authors: ' + resp.message);
    } else {
      setAuthors(resp);
    }
  }

  useEffect(() => {
    loadGernes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // componentDidMount

  // @ts-ignore
  async function loadGernes() {
    const resp = await get('/genres');

    if (resp.message) {
      setError('Genres: ' + resp.message);
    } else {
      setGenres(resp);
    }
  }

  const API_URL = "http://localhost:8080";
  const { post } = useFetch(API_URL);

  const handleSubmit = (event) => {
    const payload = {
      title,
      summary,
      isbn: isbn,
      author_id: parseInt(authorId),
      genre_id: parseInt(genreId)
    };
    alert(JSON.stringify(payload));
    post("/api/books", payload)
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
    if (error) {
      return <p>{error}</p>;
    } else if(id) {
      return (
        <p>
          Created a new book:
          <Link to={`/books/${id}`}>{title}</Link>
        </p>
      );
    }
  };

  return (
    <div>
      <h1>Create Book</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" required={true} value={title} onChange={e => setTitle(e.target.value)}></input>
        </label>
        <label>
          Author:
          <select required={true} value={authorId} onChange={e => setAuthorId(e.target.value)}>
          {authors.map(author => (
              <option key={author.ID} value={author.ID}>
                {author.family_name}, {author.first_name}
              </option>
          ))}
          </select>
        </label>
        <label>
          Summary:
          <input type="text" name="summary" required={true} value={summary} onChange={e => setSummary(e.target.value)}></input>
        </label>
        <label>
          ISBN:
          <input type="text" name="isbn" required={true} value={isbn} onChange={e => setIsbn(e.target.value)}></input>
        </label>
        <label>
          Genre:
          <select required={true} value={genreId} onChange={e => setGenreId(e.target.value)}>
          {genres.map(genre => (
              <option key={genre.ID} value={genre.ID}>
                {genre.name}
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

export default BookForm;
