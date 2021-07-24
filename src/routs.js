import Home from "./components/Home";
import Books from "./components/Books";
import Authors from "./components/Authors";

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
    component: Authors
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
    component: Authors
  },
  {
    path: "/genres/create",
    text: 'Create new genre',
    component: Authors
  },
  {
    path: "/books/create",
    text: 'Create new book',
    component: Authors
  },
  {
    path: "/bookinstances/create",
    text: 'Create new book instance (copy)',
    component: Authors
  }
];

export default routes;
