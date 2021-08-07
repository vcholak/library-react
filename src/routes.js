import Home from "./components/Home";
import Books from "./components/Books";
import Authors from "./components/Authors";
import Genres from "./components/Genres";
import GenreForm from "./components/GenreForm";
import GenreDetails from "./components/GenreDetails";
import AuthorForm from "./components/AuthorForm";
import BookForm from "./components/BookForm";
import BookInstanceForm from "./components/BookInstanceForm";
import AuthorDetails from "./components/AuthorDetails";

const routes = [
  {
    path: "/",
    exact: true,
    text: 'Home',
    component: Home
  },
  {
    path: "/books",
    exact: true,
    text: 'All books',
    component: Books
  },
  {
    path: "/authors",
    exact: true,
    text: 'All authors',
    component: Authors
  },
  {
    path: "/genres",
    exact: true,
    text: 'All genres',
    component: Genres
  },
  {
    path: "/bookinstances",
    exact: true,
    text: 'All book instances',
    component: Authors
  },
  {
    path: "/authors/create",
    text: 'Create new author',
    component: AuthorForm
  },
  {
    path: "/genres/create",
    text: 'Create new genre',
    component: GenreForm
  },
  {
    path: "/books/create",
    text: 'Create new book',
    component: BookForm
  },
  {
    path: "/bookinstances/create",
    text: 'Create new book instance (copy)',
    component: BookInstanceForm
  },
  {
    path: "/genres/:id",
    exact: true,
    component: GenreDetails
  },
  {
    path: "/authors/:id",
    exact: true,
    component: AuthorDetails
  },
];

export default routes;
