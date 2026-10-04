import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./MyLibraryMovieDetails.css";
import Navbar from "../../components/NavBar/NavBar";
import BackLink from "../../components/BackLink/BackLink";
import PageLoader from "../../components/PageLoader/PageLoader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import SuccessToast from "../../components/SuccessToast/SuccessToast";
import ErrorToast from "../../components/ErrorToast/ErrorToast";
import MovieStatusSelect from "../../components/MovieStatusSelect/MovieStatusSelect";
import MovieRatingControl from "../../components/MovieRatingControl/MovieRatingControl";
import MovieTagsSection from "../../components/MovieTagsSection/MovieTagsSection";
import EditTagsModal from "../../components/EditTagsModal/EditTagsModal";
import useLibraryMovie from "../../hooks/useLibraryMovie";
import useToast from "../../hooks/useToast";
import useLibraryTags from "../../hooks/useLibraryTags";
import type { MovieStatus } from "../../types/MovieStatus";
import {
  updateMovieRating,
  updateMovieStatus,
  updateMovieTags,
} from "../../services/myLibraryServices";

function MyLibraryMovieDetails() {
  const location = useLocation();

  const { movieId: idParam } = useParams();
  const movieId = idParam ? idParam : null;

  const { movie, loading, error } = useLibraryMovie(movieId);
  const { libraryTags, loadingTags } = useLibraryTags();

  const {
    showSuccessToast,
    showErrorToast,
    successToastMessage,
    errorToastMessage,
    showSuccessToastTemporarily,
    showErrorToastTemporarily,
  } = useToast();

  const [movieStatus, setMovieStatus] = useState<MovieStatus>("to-watch");
  const [movieRating, setMovieRating] = useState<number | null>(null);
  const [movieTags, setMovieTags] = useState<string[]>([]);
  const [isEditTagsModalOpen, setIsEditTagsModalOpen] = useState(false);

  useEffect(() => {
    if (!movie) return;

    setMovieStatus(movie.status);
    setMovieRating(movie.rating);
    setMovieTags(movie.tags);
  }, [movie]);

  const handleStatusChange = async (status: MovieStatus) => {
    try {
      await updateMovieStatus(movieId, status);
      setMovieStatus(status);
      setMovieRating(null);
      showSuccessToastTemporarily(`Status updated to "${status}"`);
    } catch (caughtError) {
      console.error(caughtError);
      showErrorToastTemporarily("Failed to update movie status");
    }
  };

  const handleRatingChange = async (rating: number | null) => {
    try {
      await updateMovieRating(movieId, rating);
      setMovieRating(rating);
      showSuccessToastTemporarily(
        rating === null ? "Rating removed" : `Rating updated to ${rating}`,
      );
    } catch (caughtError) {
      console.error(caughtError);
      showErrorToastTemporarily("Failed to update movie rating");
    }
  };

  const handleSaveTags = async (selectedTags: string[]) => {
    try {
      await updateMovieTags(movieId, selectedTags);
      setMovieTags(selectedTags);
      setIsEditTagsModalOpen(false);
      showSuccessToastTemporarily("Tags updated successfully");
    } catch (caughtError) {
      console.error(caughtError);
      setIsEditTagsModalOpen(false);
      showErrorToastTemporarily("Failed to update movie tags");
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
          <PageLoader>Loading movie...</PageLoader>
        ) : error ? (
          <ErrorMessage error={error}></ErrorMessage>
        ) : movie ? (
          <div>
            <MovieDetails movie={movie}></MovieDetails>

            <section className="library-movie-actions">
              <div className="library-movie-settings">
                <MovieStatusSelect
                  value={movieStatus}
                  onValueChange={handleStatusChange}
                ></MovieStatusSelect>

                <MovieRatingControl
                  movieStatus={movieStatus}
                  value={movieRating}
                  onValueChange={handleRatingChange}
                ></MovieRatingControl>
              </div>

              <MovieTagsSection
                tags={movieTags}
                onEditTags={() => setIsEditTagsModalOpen(true)}
              ></MovieTagsSection>

              {/* <div className="movie-delete-zone">
                <button type="button" className="delete-movie-button">
                  Delete from library
                </button>
              </div> */}
            </section>
          </div>
        ) : null}

        <EditTagsModal
          isOpen={isEditTagsModalOpen}
          libraryTags={libraryTags}
          movieTags={movieTags}
          loadingTags={loadingTags}
          onClose={() => setIsEditTagsModalOpen(false)}
          onSave={handleSaveTags}
        ></EditTagsModal>

        <SuccessToast isOpen={showSuccessToast}>
          {successToastMessage}
        </SuccessToast>

        <ErrorToast isOpen={showErrorToast}>{errorToastMessage}</ErrorToast>

        {/* <div id="delete-movie-modal" class="modal hidden">
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
