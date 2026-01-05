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
  const [selectedSeason, setSelectedSeason] = useState(1);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  const video = data?.data?.video || {};
  const related = data?.data?.related || [];
  const cast = video?.cast || [];
  const seasons = video?.seasons || [];
  const episodes = seasons.find(s => s.seasonNumber === selectedSeason)?.episodes || [];

  // Define tabs
  const tabs = [
    "Overview",
    ...(video.type === "series" ? ["Episodes"] : []),
    "Cast & Crew",
    "Reviews",
    "More Like This"
  ];

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
                    <span className="details__info-label">Director</span>
                    <span className="details__info-value">{video.director || "N/A"}</span>
                  </div>
                  <div className="details__info-row">
                    <span className="details__info-label">Starring</span>
                    <span className="details__info-value">{cast.slice(0, 4).map(c => c.name).join(", ") || "N/A"}</span>
                  </div>
                  <div className="details__info-row">
                    <span className="details__info-label">Genres</span>
                    <span className="details__info-value">{video.genres?.join(", ") || video.type || "N/A"}</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === "Episodes" && (
            <section className="details__episodes">
              <div className="details__episodes-header">
                <h2 className="details__section-title">Episodes</h2>
                {seasons.length > 0 && (
                  <select className="details__season-selector" value={selectedSeason} onChange={(e) => setSelectedSeason(Number(e.target.value))}>
                    {seasons.map((season) => (
                      <option key={season.seasonNumber} value={season.seasonNumber}>Season {season.seasonNumber}</option>
                    ))}
                  </select>
                )}
              </div>
              <div className="details__episodes-list">
                {episodes.length > 0 ? (
                  episodes.map((episode) => (
                    <Link key={episode._id} to={`/watch/${id}?episode=${episode._id}`} className="details__episode-card">
                      <div className="details__episode-thumbnail-wrapper">
                        <div className="details__episode-thumbnail" style={{ backgroundImage: `url(${episode.thumbnail?.url || video.thumbnail?.url})` }}>
                          <div className="details__episode-play-btn"><FiPlay /></div>
                          <span className="details__episode-duration">{episode.duration ? `${episode.duration}m` : "N/A"}</span>
                        </div>
                      </div>
                      <div className="details__episode-info">
                        <div className="details__episode-main-info">
                          <div className="details__episode-title-row">
                            <h3 className="details__episode-title">{episode.episodeNumber}. {episode.title}</h3>
                            {episode.isWatched && (
                              <span className="details__episode-watched">
                                <span className="check-icon">✓</span> WATCHED
                              </span>
                            )}
                          </div>
                          <p className="details__episode-aired">Aired {new Date(episode.releaseDate).toLocaleDateString()}</p>
                          <p className="details__episode-description">{episode.description || "No description available for this episode."}</p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="details__no-episodes">No episodes found for this season.</p>
                )}
              </div>
            </section>
          )}

          {activeTab === "Reviews" && (
            <section className="details__reviews">
              <h2 className="details__section-title">Reviews</h2>
              <p className="details__no-reviews">No reviews yet. Be the first to share your thoughts!</p>
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
