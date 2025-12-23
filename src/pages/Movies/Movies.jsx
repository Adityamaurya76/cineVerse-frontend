import { Link } from "react-router-dom";
import { FiPlay, FiPlus } from "react-icons/fi";
import { FaFire, FaRocket, FaHeart, FaLandmark } from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Movies.scss";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../../components/Redux/slices/MovieSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";

const Movies = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.movie);
  const [activeGenre, setActiveGenre] = useState("all");

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const heroContent = data?.data?.hero || {};
  const categories = data?.data?.categories || [];
  const trending = data?.data?.trending || [];
  const newReleases = data?.data?.newReleases || [];

  if (loading) return <Loader />;
  if (error) return <div className="home__error">Error: {error}</div>;
  if (!data) return null;

  return (
    <div className="movies">
      <Navbar />
      <main className="movies__main">
        <section className="movies__hero">
          <div className="movies__hero-backdrop" style={{ backgroundImage: `url(${heroContent.thumbnail?.url})` }}></div>
          <div className="movies__hero-gradient-top"></div>
          <div className="movies__hero-gradient-left"></div>
          <div className="movies__hero-content">
            <h1 className="movies__hero-title">{heroContent.title}</h1>
            <p className="movies__hero-description">{heroContent.description}</p>
            <div className="movies__hero-actions">
              <button className="btn btn--lg btn--primary">
                <FiPlay />
                <span>Watch Now</span>
              </button>
              <button className="btn btn--lg btn--secondary">
                <FiPlus />
                <span>Add to List</span>
              </button>
            </div>
          </div>
        </section>
        <section className="movies__filters hide-scrollbar">
          <button className={`chip ${activeGenre === "all" ? "chip--active" : ""}`} onClick={() => setActiveGenre("all")}>All Movies</button>
          {categories.map((category) => (
            <button key={category._id} className={`chip ${activeGenre === category._id ? "chip--active" : ""}`} onClick={() => setActiveGenre(category._id)}>{category.name}</button>
          ))}
        </section>
        <section className="movies__categories-section">
          <h2 className="movies__section-title">Trending Categories</h2>
          <div className="movies__content-padding">
            <div className="category-grid">
              {categories.map((cat) => (
                <div key={cat._id} className="category-card" style={{ backgroundImage: `url(${cat.thumbnail?.url})` }}>
                  <div className="category-card__overlay"></div>
                  <div className="category-card__content">
                    <span className="category-card__name">{cat.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className="movies__sections">
          <section className="movies__section">
            <h2 className="movies__section-title">Trending Now</h2>
            <div className="movies__content-padding">
              <div className="card-grid card-grid--poster">
                {trending.map((movie) => (
                  <Link key={movie._id} to={`/details/${movie._id}`} className="card">
                    <div className="card__poster" style={{ backgroundImage: `url(${movie.thumbnail?.url})` }}></div>
                    <div className="card__info">
                      <p className="card__title">{movie.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
          <section className="movies__section">
            <h2 className="movies__section-title">New Releases</h2>
            <div className="movies__content-padding">
              <div className="card-grid card-grid--poster">
                {newReleases.map((movie) => (
                  <Link key={movie._id} to={`/details/${movie._id}`} className="card">
                    <div className="card__poster" style={{ backgroundImage: `url(${movie.thumbnail?.url})` }}></div>
                    <div className="card__info">
                      <p className="card__title">{movie.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Movies;
