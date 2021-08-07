import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {

  const [books, setBooks] = useState(null);
  const [copies, setCopies] = useState(null);
  const [availableCopies, setAvailableCopies] = useState(null);
  const [authors, setAutors] = useState(null);
  const [genres, setGenres] = useState(null);

  useEffect(() => {
    axios.head("http://localhost:8080/api/books")
      .then(res => setBooks(res.headers['x-result-count']))
      .catch(err => setBooks(err.message));
  },[]);

  useEffect(() => {
    axios.head("http://localhost:8080/api/authors")
      .then(res => setAutors(res.headers['x-result-count']))
      .catch(err => setAutors(err.message));
  },[]);

  useEffect(() => {
    axios.head("http://localhost:8080/api/genres")
      .then(res => setGenres(res.headers['x-result-count']))
      .catch(err => setGenres(err.message));
  },[]);

  useEffect(() => {
    axios.head("http://localhost:8080/api/copies")
      .then(res => setCopies(res.headers['x-result-count']))
      .catch(err => setCopies(err.message));
  },[]);

  useEffect(() => {
    axios.head("http://localhost:8080/api/copies/available")
      .then(res => setAvailableCopies(res.headers['x-result-count']))
      .catch(err => setAvailableCopies(err.message));
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
        <li><strong>Genres:</strong><span> { genres }</span></li>
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
