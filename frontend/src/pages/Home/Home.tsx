import Navbar from "../../components/NavBar/NavBar.tsx";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <>
      <Navbar></Navbar>

      <main className="home">
        <h1 className="home-welcome">Welcome to Movie Tracker</h1>
        <p className="home-description">
          Explore movies, discover new favorites, and keep track of your
          personal collection.
        </p>
        <div className="home-actions">
          <Link to="/catalog" className="home-link">
            Movie Catalog
          </Link>
          <Link to="/myLibrary" className="home-link">
            My Movie Library
          </Link>
        </div>
      </main>
    </>
  );
}

export default Home;
