# MOVIE TRACKER

[Italian version](README.md)

An application that allows a single user to keep track of movies they have watched and movies they want to watch. Authentication and support for multiple users are not currently provided.

The application is divided into two main sections:

- **Movie Catalog:** contains movies retrieved through the [TMDB](https://www.themoviedb.org/) API;
- **My Movie Library:** contains the user's personal movie list, with a status (`watched` o `to-watch`), optional rating, and tags associated with each movie.

## TECHNOLOGIES USED

- **HTML5** --> page structure and content.
- **CSS3** --> styling, layout, and responsive design.
- **TypeScript** --> frontend logic and interactions.
- **React** --> development of the user interface through reusable components and application state management.
- **PHP** --> backend logic and communication with the database and external APIs.
- **PostgreSQL** --> storage and management of the user's personal library data.
- **TMDB API** --> retrieval of movie data.
- **Vite** --> frontend development and build environment.
- **Git / GitHub** --> project version control and management.

## HOMEPAGE

The homepage displays a short welcome message and provides two main links to access **Movie Catalog** and **My Movie Library**.

## MOVIE CATALOG

This section displays the movie catalog using data retrieved through the TMDB API.

- Movies are displayed as a list of clickable cards.
- Results are divided into pages, and the user can change the page number to view additional movies.
- A search bar allows the user to search for a specific movie in the catalog.
- Clicking on a movie allows the user to view its details.
- From the movie details page, the user can add the movie to their library and specify its status (`watched` o `to-watch`).

## MY MOVIE LIBRARY

This section contains the user's personal movie list.

Each movie has:

- a status (`watched` o `to-watch`);
- an optional rating from 1 to 5 stars, available only for movies with watched status;
- one or more optional tags selected from a predefined list.

The list can be filtered by:

- movie title;
- status (`watched` o `to-watch`);
- a tag.

Movies can also be sorted according to different criteria:

- newest release date;
- oldest release date;
- title A-Z;
- title Z-A;
- highest rating;
- lowest rating.

Clicking on a movie opens its details, where the user can:

- change its status (`watched` o `to-watch`);
- assign, modify, or remove its rating;
- add, modify, or remove tags;
- delete the movie from the library.

## FUTURE DEVELOPMENTS

- **Responsive design:** improve the interface's adaptability to mobile devices and screens of different sizes.
- **Multiple user support:** introduce an authentication system that allows different users to access their own personal library.
- **Catalog navigation:** improve navigation between movies, allowing users to move more easily from one movie to another without having to return to the catalog list each time.
- **Separate error and empty-result handling:** currently, an empty movie list and an error while retrieving movie data are handled through the same message. These two cases should be distinguished, displaying a specific message when no results are found and a different message when an error occurs while retrieving the data.
