import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiPlay, FiPlus } from "react-icons/fi";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Details.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails } from "../../components/Redux/slices/MovieSlice";
import { useEffect } from "react";
import Loader from "../../components/Loader/Loader";


const Details = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Overview");
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  const video = data?.data?.video || {};
  const related = data?.data?.related || [];
  const cast = video?.cast || [];

  // Define tabs
  const tabs = ["Overview", "Cast & Crew", "More Like This"];

  // Format duration (minutes to hours and minutes)
  const formatDuration = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Format release date
  const formatReleaseDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.getFullYear();
  };

  if (loading) return <Loader />;
  if (error) return <div className="home__error">Error: {error}</div>;
  if (!data) return null;

  return (
    <div className="details">
      <Navbar />
      <main className="details__main">
        <section className="details__hero" style={{
          backgroundImage: `linear-gradient(to top, rgba(25, 16, 34, 1) 0%, rgba(25, 16, 34, 0.6) 50%, rgba(25, 16, 34, 0) 100%), url(${video.thumbnail?.url})`,
        }}
        >
          <div className="details__hero-content">
            <h1 className="details__title">{video.title}</h1>
            <div className="details__meta">
              <span className="details__tag">{formatReleaseDate(video.releaseDate)}</span>
              <span className="details__tag">⭐ {video.rating || "N/A"}</span>
              <span className="details__tag">{formatDuration(video.duration)}</span>
              <span className="details__tag">{video.type}</span>
              {video.isPremium && <span className="details__tag">Premium</span>}
            </div>
            <div className="details__actions">
              <Link to={`/watch/${id}`} className="btn btn--lg btn--primary">
                <FiPlay />
                <span>Play</span>
              </Link>
              <button className="btn btn--lg btn--secondary">
                <FiPlus />
                <span>Add to Watchlist</span>
              </button>
            </div>
          </div>
        </section>
        <section className="details__tabs">
          <div className="details__tabs-list">
            {tabs.map((tab) => (
              <button key={tab} className={`details__tab ${activeTab === tab ? "details__tab--active" : ""}`} onClick={() => setActiveTab(tab)}>{tab}</button>
            ))}
          </div>
        </section>
        <div className="details__content">
          {activeTab === "Overview" && (
            <section className="details__overview">
              <div className="details__overview-grid">
                <div className="details__synopsis">
                  <h2 className="details__section-title">Synopsis</h2>
                  <p className="details__synopsis-text">{video.description || "No description available."}</p>
                </div>
                <div className="details__info">
                  <div className="details__info-row">
                    <span className="details__info-label">Type</span>
                    <span className="details__info-value">
                      {video.type || "N/A"}
                    </span>
                  </div>
                  <div className="details__info-row">
                    <span className="details__info-label">Release Date</span>
                    <span className="details__info-value">{formatReleaseDate(video.releaseDate)}</span>
                  </div>
                  <div className="details__info-row">
                    <span className="details__info-label">Duration</span>
                    <span className="details__info-value">{formatDuration(video.duration)}</span>
                  </div>
                  <div className="details__info-row">
                    <span className="details__info-label">Views</span>
                    <span className="details__info-value">{video.views || 0}</span>
                  </div>
                  <div className="details__info-row">
                    <span className="details__info-label">Premium</span>
                    <span className="details__info-value">{video.isPremium ? "Yes" : "No"}</span>
                  </div>
                </div>
              </div>
            </section>
          )}
          {(activeTab === "Overview" || activeTab === "Cast & Crew") && (
            <section className="details__cast">
              <h2 className="details__section-title">Cast & Crew</h2>
              <div className="details__cast-grid">
                {cast.map((person) => (
                  <div key={person._id} className="details__cast-card">
                    <div className="details__cast-image" style={{ backgroundImage: `url(${person.image})` }}></div>
                    <h3 className="details__cast-name">{person.name}</h3>
                    <p className="details__cast-role">{person.role}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          {(activeTab === "Overview" || activeTab === "More Like This") && (
            <section className="details__related">
              <h2 className="details__section-title">Related Content</h2>
              <div className="card-grid card-grid--poster">
                {related.map((item) => (
                  <Link key={item._id} to={`/details/${item._id}`} className="card details__related-card">
                    <div className="details__related-image-wrapper">
                      <div className="details__related-image" style={{ backgroundImage: `url(${item.thumbnail?.url})` }}></div>
                      <div className="details__related-gradient"></div>
                      <div className="details__related-info">
                        <h3 className="details__related-title">{item.title}</h3>
                        <p className="details__related-genre">{item.type || "Movie"}</p>
                      </div>
                      <div className="details__related-overlay">
                        <span className="details__related-play">play_circle</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Details;
