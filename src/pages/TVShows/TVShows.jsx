import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPlay, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../components/Redux/slices/MovieSlice";
import Loader from "../../components/Loader/Loader";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./TVShows.scss";

const TVShows = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.movie);
  const [activeGenre, setActiveGenre] = useState("all");

  useEffect(() => {
    dispatch(fetchMovies("series"));
  }, [dispatch]);

  const heroContent = data?.data?.hero || {};
  const categories = data?.data?.categories || [];
  const trendingNow = data?.data?.trending || [];
  const newSeries = data?.data?.newReleases || [];
  const continueWatching = data?.data?.continueWatching || [];

  if (loading) return <Loader />;
  if (error) return <div className="home__error">Error: {error}</div>;
  if (!data) return null;

  return (
    <div className="tvshows">
      <Navbar />
      <main className="tvshows__main">
        <section className="tvshows__hero">
          <div className="tvshows__hero-backdrop" style={{ backgroundImage: `url(${heroContent.thumbnail?.url})` }}></div>
          <div className="tvshows__hero-gradient-top"></div>
          <div className="tvshows__hero-gradient-left"></div>
          <div className="tvshows__hero-content">
            <h1 className="tvshows__hero-title">{heroContent.title}</h1>
            <p className="tvshows__hero-description">{heroContent.description}</p>
            <div className="tvshows__hero-actions">
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
        <section className="tvshows__filters hide-scrollbar">
          <button className={`chip ${activeGenre === "all" ? "chip--active" : ""}`} onClick={() => setActiveGenre("all")}>All TV Shows</button>
          {categories.map((category) => (
            <button key={category._id} className={`chip ${activeGenre === category._id ? "chip--active" : ""}`} onClick={() => setActiveGenre(category._id)}>{category.name}</button>
          ))}
        </section>
        <div className="tvshows__sections">
          {continueWatching.length > 0 && (
            <section className="tvshows__section">
              <h2 className="tvshows__section-title">Continue Watching</h2>
              <div className="tvshows__content-padding">
                <div className="card-grid card-grid--wide">
                  {continueWatching.map((show) => (
                    <Link key={show.id} to={`/watch/${show.id}`} className="card">
                      <div className="card__image-wrapper card__image-wrapper--wide">
                        <div className="card__image" style={{ backgroundImage: `url(${show.thumbnail?.url})` }}></div>
                        <div className="card__gradient"></div>
                        <div className="card__overlay">
                          <span className="card__play-icon">play_circle</span>
                        </div>
                        <div className="card__progress">
                          <div className="card__progress-bar" style={{ width: `${show.progress}%` }}></div>
                        </div>
                      </div>
                      <div className="card__info">
                        <p className="card__title">{show.title}</p>
                        <p className="card__subtitle">{show.subtitle}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
          <section className="tvshows__section">
            <h2 className="tvshows__section-title">Trending Now</h2>
            <div className="tvshows__content-padding">
              <div className="card-grid card-grid--poster">
                {trendingNow.map((show) => (
                  <Link key={show._id} to={`/details/${show._id}`} className="card">
                    <div className="card__poster" style={{ backgroundImage: `url(${show.thumbnail?.url})` }}></div>
                    <div className="card__info">
                      <p className="card__title">{show.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
          <section className="tvshows__section">
            <h2 className="tvshows__section-title">New Series</h2>
            <div className="tvshows__content-padding">
              <div className="card-grid card-grid--poster">
                {newSeries.map((show) => (
                  <Link key={show._id} to={`/details/${show._id}`} className="card">
                    <div className="card__poster" style={{ backgroundImage: `url(${show.thumbnail?.url})` }}></div>
                    <div className="card__info">
                      <p className="card__title">{show.title}</p>
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

export default TVShows;

