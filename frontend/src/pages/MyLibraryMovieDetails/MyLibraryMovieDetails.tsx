import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./MyLibraryMovieDetails.css";
import Navbar from "../../components/NavBar/NavBar";
import BackLink from "../../components/BackLink/BackLink";
import LoadingMovies from "../../components/LoadingMovies/LoadingMovies";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import SuccessToast from "../../components/SuccessToast/SuccessToast";
import ErrorToast from "../../components/ErrorToast/ErrorToast";
import MovieStatusSelect from "../../components/MovieStatusSelect/MovieStatusSelect";
import MovieRatingControl from "../../components/MovieRatingControl/MovieRatingControl";
import useLibraryMovie from "../../hooks/useLibraryMovie";
import useToast from "../../hooks/useToast";
import type { MovieStatus } from "../../types/MovieStatus";
import {
  updateMovieRating,
  updateMovieStatus,
} from "../../services/myLibraryServices";

function MyLibraryMovieDetails() {
  const location = useLocation();

  const { movieId: idParam } = useParams();
  const movieId = idParam ? idParam : null;

  const { movie, loading, error } = useLibraryMovie(movieId);

  const {
    showSuccessToast,
    showErrorToast,
    successToastMessage,
    errorToastMessage,
    showSuccessToastTemporarily,
    showErrorToastTemporarily,
  } = useToast();

  const [status, setStatus] = useState<MovieStatus>("to-watch");
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    if (!movie) return;

    setStatus(movie.status);
    setRating(movie.rating);
  }, [movie]);

  const handleStatusChange = async (status: MovieStatus) => {
    try {
      await updateMovieStatus(movieId, status);
      setStatus(status);
      setRating(null);
      showSuccessToastTemporarily(`Status updated to "${status}"`);
    } catch (caughtError) {
      console.error(caughtError);
      showErrorToastTemporarily("Failed to update movie status");
    }
  };

  const handleRatingChange = async (rating: number | null) => {
    try {
      await updateMovieRating(movieId, rating);
      setRating(rating);
      showSuccessToastTemporarily(
        rating === null ? "Rating removed" : `Rating updated to ${rating}`,
      );
    } catch (caughtError) {
      console.error(caughtError);
      showErrorToastTemporarily("Failed to update movie rating");
    }
  };

  return (
    <>
      <Navbar></Navbar>

      <main>
        <BackLink to={location.state?.from ?? "/myLibrary"}>
          ← Back to my library
        </BackLink>

        {loading ? (
          <LoadingMovies>Loading movie...</LoadingMovies>
        ) : error ? (
          <ErrorMessage error={error}></ErrorMessage>
        ) : movie ? (
          <section>
            <MovieDetails movie={movie}></MovieDetails>

            <section className="library-movie-actions">
              <div className="library-movie-settings">
                <MovieStatusSelect
                  value={status}
                  onValueChange={handleStatusChange}
                ></MovieStatusSelect>

                <MovieRatingControl
                  movieStatus={status}
                  value={rating}
                  onValueChange={handleRatingChange}
                ></MovieRatingControl>
              </div>

              {/* <div className="movie-tags-row">
        <div className="movie-tags-container"></div>

        <button type="button" className="edit-tags-button">
          Edit tags
        </button>
      </div>

      <div className="movie-delete-zone">
        <button type="button" className="delete-movie-button">
          Delete from library
        </button>
      </div> */}
            </section>
          </section>
        ) : null}

        <SuccessToast isOpen={showSuccessToast}>
          {successToastMessage}
        </SuccessToast>

        <ErrorToast isOpen={showErrorToast}>{errorToastMessage}</ErrorToast>

        {/* <div id="edit-tags-modal" class="modal hidden">
          <div class="modal-content edit-tag-modal-content">
            <h2>Edit tags</h2>

            <div id="edit-tags-list" class="movie-edit-tags-list"></div>

            <div class="modal-actions edit-tag-modal-actions">
              <button type="button" id="cancel-edit-tags" class="cancel-button">
                Cancel
              </button>

              <button type="button" id="save-edit-tags" class="confirm-button">
                Save changes
              </button>
            </div>
          </div>
        </div>

        <div id="delete-movie-modal" class="modal hidden">
          <div class="modal-content delete-movie-modal-content">
            <h2>Delete movie</h2>
            <p>Are you sure you want to delete this movie from your library?</p>

            <div class="modal-actions delete-movie-modal-actions">
              <button
                type="button"
                id="cancel-delete-movie"
                class="cancel-button"
              >
                Cancel
              </button>

              <button
                type="button"
                id="confirm-delete-movie"
                class="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        </div> */}
      </main>
    </>
  );
}

export default MyLibraryMovieDetails;
