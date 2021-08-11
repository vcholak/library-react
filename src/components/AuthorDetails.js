import useFetch from 'use-http';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { formatDate } from './utils';

const AuthorDetails = () => {
  // @ts-ignore
  const { id } = useParams();

  const API_URL = `http://localhost:8080/api/authors/${id}`;
  const options = {}

  const {error, data: author = {} } = useFetch(API_URL, options, []);

  const errorText = (
    <p>Error while retrieving an author: {error?.message}</p>
  );

  const noBooks = () => {
    if (author.books && author.books.length === 0) {
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
      <h1>Author: {author.family_name}, {author.first_name}</h1>
      <p> ({formatDate(author.birth_date)} - {formatDate(author.death_date)})</p>
      <h4>Books</h4>
      <div style={divStyle}>
        <dl>
          {author.books && author.books.map(book => (
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
        <Link to={`/authors/delete/${author.ID}`}>Delete author</Link>
      </p>
      <p>
        <Link to={`/authors/update/${author.ID}`}>Update author</Link>
      </p>
      </>)}
    </div>
  );
}

export default AuthorDetails;
