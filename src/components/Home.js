import { useState, useEffect } from 'react';

const Home = () => {

  const [books, setBooks] = useState(null);
  const [copies, setCopies] = useState(null);
  const [availableCopies, setAvailableCopies] = useState(null);
  const [authors, setAutors] = useState(null);
  const [genres, setGenres] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/books", {method: 'HEAD'})
      .then(res => {
        if (!res.ok) {
          setBooks(res.statusText);
        } else {
          setBooks(res.headers.get('X-Result-Count'));
        }
      })
      .catch(err => setBooks(err));
  },[]);

  useEffect(() => {
    fetch("http://localhost:8080/api/authors", {method: 'HEAD'})
      .then(res => {
        if (!res.ok) {
          setBooks(res.statusText);
        } else {
          setAutors(res.headers.get('X-Result-Count'));
        }
      })
      .catch(err => setAutors(err));
  },[]);

  useEffect(() => {
    fetch("http://localhost:8080/api/genres", {method: 'HEAD'})
      .then(res => {
        if (!res.ok) {
          setBooks(res.statusText);
        } else {
          setGenres(res.headers.get('X-Result-Count'));
        }
      })
      .catch(err => setGenres(err));
  },[]);

  useEffect(() => {
    fetch("http://localhost:8080/api/copies", {method: 'HEAD'})
      .then(res => {
        if (!res.ok) {
          setBooks(res.statusText);
        } else {
          setCopies(res.headers.get('X-Result-Count'));
        }
      })
      .catch(err => setCopies(err));
  },[]);

  useEffect(() => {
    fetch("http://localhost:8080/api/copies/available", {method: 'HEAD'})
      .then(res => {
        if (!res.ok) {
          setBooks(res.statusText);
        } else {
          setAvailableCopies(res.headers.get('X-Result-Count'));
        }
      })
      .catch(err => setAvailableCopies(err));
  },[]);

  const Loading = (
    <div className="loading">
      Loading...
    </div>
  );

  const RecordsInfo = (
    <div>
      <p>The library has the following record counts:</p>
      <ul>
        <li><strong>Books:</strong> { books } </li>
        <li><strong>Copies:</strong> { copies }</li>
        <li><strong>Copies available:</strong> { availableCopies }</li>
        <li><strong>Authors:</strong> { authors }</li>
        <li><strong>Genres:</strong><span>{ genres }</span></li>
      </ul>
  </div>
  );

  let content;
  if (books == null || authors == null || genres == null || copies == null || availableCopies == null) {
    content =  Loading;
  } else {
    content = RecordsInfo;
  };

  return (
    <div>
      <h1>Local Library Home</h1>
      <p>Welcome to <em>Local Library</em></p>
      <h1>Dynamic content</h1>
      { content }
      <style jsx>{`
        a {
          color: #42b983;
        }
        li {
          list-style: none;
        }
      `}</style>
    </div>
  );
}

export default Home;
