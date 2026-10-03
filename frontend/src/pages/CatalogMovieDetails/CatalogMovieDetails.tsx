import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import "./CatalogMovieDetails.css";
import Navbar from "../../components/NavBar/NavBar.tsx";
import BackLink from "../../components/BackLink/BackLink.tsx";
import LoadingMovies from "../../components/LoadingMovies/LoadingMovies.tsx";
import MovieDetails from "../../components/MovieDetails/MovieDetails.tsx";
import AddToLibraryModal from "../../components/AddToLibraryModal/AddToLibraryModal.tsx";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage.tsx";
import SuccessToast from "../../components/SuccessToast/SuccessToast.tsx";
import ErrorToast from "../../components/ErrorToast/ErrorToast.tsx";
import useCatalogMovie from "../../hooks/useCatalogMovie.ts";
import useToast from "../../hooks/useToast.ts";
import type { MovieStatus } from "../../types/MovieStatus";

function CatalogMovieDetails() {
  const location = useLocation();

  const { movieId: idParam } = useParams();
  const movieId = idParam ? idParam : null;

  const [isAddToLibraryModalOpen, setIsAddToLibraryModalOpen] = useState(false);

  const { movie, movieInLibrary, loading, error, addMovieToLibrary } =
    useCatalogMovie(movieId);

  const {
    showSuccessToast,
    showErrorToast,
    successToastMessage,
    errorToastMessage,
    showSuccessToastTemporarily,
    showErrorToastTemporarily,
  } = useToast();

  const handleAddToLibrary = async (movieStatus: MovieStatus) => {
    try {
      await addMovieToLibrary(movieStatus);
      setIsAddToLibraryModalOpen(false);
      showSuccessToastTemporarily("Movie added to your library");
    } catch (caughtError) {
      console.error(caughtError);
      setIsAddToLibraryModalOpen(false);
      showErrorToastTemporarily("Failed to add movie to your library");
    }
  };

  return (
    <>
      <Navbar></Navbar>

      <main>
        <BackLink to={location.state?.from ?? "/catalog"}>
          ← Back to catalog
        </BackLink>

        {loading ? (
          <LoadingMovies>Loading movie...</LoadingMovies>
        ) : error ? (
          <ErrorMessage error={error}></ErrorMessage>
        ) : movie ? (
          <section>
            <MovieDetails movie={movie}>
              <button
                className="library-button"
                disabled={movieInLibrary}
                onClick={() => {
                  setIsAddToLibraryModalOpen(true);
                }}
              >
                {movieInLibrary ? "Already in library" : "Add to my library"}
              </button>
            </MovieDetails>

            <AddToLibraryModal
              isOpen={isAddToLibraryModalOpen}
              onClose={() => setIsAddToLibraryModalOpen(false)}
              onAdd={handleAddToLibrary}
            ></AddToLibraryModal>

            <SuccessToast isOpen={showSuccessToast}>
              {successToastMessage}
            </SuccessToast>

            <ErrorToast isOpen={showErrorToast}>{errorToastMessage}</ErrorToast>
          </section>
        ) : null}
      </main>
    </>
  );
}

export default CatalogMovieDetails;
