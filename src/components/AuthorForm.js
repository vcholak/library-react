import useFetch from 'use-http';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toISOStr } from './utils';

const AuthorForm = () => {

  const [firstName, setFirstName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [deathDate, setDeathDate] = useState(null);
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);

  const API_URL = "http://localhost:8080";
  const { post} = useFetch(API_URL);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    if (name === 'firstName') {
      setFirstName(target.value);
    } else {
      setFamilyName(target.value);
    }
  };

  const handleSubmit = (event) => {

    const payload = {
      first_name: firstName,
      family_name: familyName,
      birth_date: toISOStr(birthDate),
      death_date: toISOStr(deathDate)
    };

    post('/api/authors', payload)
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
          Created a new author:
          <Link to={`/authors/${id}`}>{`${familyName}, ${firstName}`}</Link>
        </p>
      );
    }
  };

  return (
    <div>
      <h1>Create Author</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label>
          First Name:
          <input type="text" name="firstName" className="form-control" required={true} value={firstName} onChange={handleChange}></input>
        </label>
        <label>
          Family Name:
          <input type="text" name="familyName" className="form-control" required={true} value={familyName} onChange={handleChange}></input>
        </label>
        </div>
        <div className="form-group">
        <label>
          Date of birth:
          <input type="date" name="birthDate" className="form-control" required={true} onChange={(date) => setBirthDate(date.target.value)} />
        </label>
        </div>
        <div className="form-group">
        <label>
          Date of death:
          <input type="date" name="deathDate" className="form-control" onChange={(date) => setDeathDate(date.target.value)} />
        </label>
        </div>
        <input type="submit" value="Create" className="btn btn-primary" />
      </form>
      <div>
        {result()}
      </div>
    </div>
  )
}

export default AuthorForm;
