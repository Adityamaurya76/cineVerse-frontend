import { useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails } from "../../components/Redux/slices/MovieSlice";
import Loader from "../../components/Loader/Loader";
import "./Watch.scss";
import Navbar from "../../components/Navbar/Navbar";

const Watch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.movie);
  const queryParams = new URLSearchParams(location.search);
  const episodeId = queryParams.get("episode");

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  const video = data?.data?.video || {};
  const seasons = video?.seasons || [];
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");

  useEffect(() => {
    if (video.videoUrl && !episodeId) {
      setCurrentVideoUrl(video.videoUrl);
    } else if (episodeId && seasons.length > 0) {
      // Find the specific episode URL
      let foundEpisode = null;
      seasons.forEach(season => {
        const ep = season.episodes.find(e => e._id === episodeId);
        if (ep) foundEpisode = ep;
      });

      if (foundEpisode) {
        setCurrentVideoUrl(foundEpisode.videoUrl);
      } else if (video.videoUrl) {
        setCurrentVideoUrl(video.videoUrl);
      }
    } else if (seasons.length > 0 && seasons[0].episodes.length > 0) {
      setCurrentVideoUrl(seasons[0].episodes[0].videoUrl);
    }
  }, [video, episodeId, seasons]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <Loader />;
  if (error) return <div className="watch__error">Error: {error}</div>;
  if (!data) return null;

  return (
    <div className="watch">
      <div className="watch__container">
        {/* <header className="watch__header">
          <Link to="/home" className="watch__logo">
            <svg className="watch__logo-icon" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fillRule="evenodd" />
            </svg>
            <span className="watch__logo-text">Cineverse</span>
          </Link>
          <button className="btn btn--md btn--primary" onClick={handleBack}>Back</button>
        </header> */}
        <Navbar/>
        <main className="watch__main">
          <div className="watch__player-container">
            {currentVideoUrl ? (
              <video src={currentVideoUrl} controls autoPlay className="watch__video" poster={video.thumbnail?.url} />
            ) : (
              <div className="watch__no-video">
                <p>Video URL not available.</p>
              </div>
            )}
          </div>

          <div className="watch__info">
            <h1 className="watch__title">{video.title}</h1>
            {video.type === "series" && (
              <p className="watch__type-tag">Series</p>
            )}
          </div>
          <p className="watch__synopsis">{video.description}</p>

          {video.type === "series" && seasons.length > 0 && (
            <>
              <div className="watch__divider"></div>
              <section className="watch__episodes">
                <h3 className="watch__episodes-title">Seasons & Episodes</h3>
                {seasons.map((season) => (
                  <div key={season._id} className="watch__season-section">
                    <h4 className="watch__season-title">Season {season.seasonNumber}</h4>
                    <div className="watch__episodes-list hide-scrollbar">
                      {season.episodes.map((episode) => (
                        <div key={episode._id} className={`watch__episode-card ${currentVideoUrl === episode.videoUrl ? "watch__episode-card--current" : ""}`} onClick={() => episode.videoUrl && setCurrentVideoUrl(episode.videoUrl)}>
                          <div className="watch__episode-thumbnail" style={{ backgroundImage: `url(${episode.thumbnail?.url || video.thumbnail?.url})` }}>
                            {currentVideoUrl === episode.videoUrl && (
                              <div className="watch__episode-overlay">
                                <span className="material-symbols-outlined">play_circle</span>
                              </div>
                            )}
                          </div>
                          <div className="watch__episode-info">
                            <p className={`watch__episode-name ${currentVideoUrl === episode.videoUrl ? "watch__episode-name--current" : ""}`}>E{episode.episodeNumber}: {episode.title}</p>
                            <p className="watch__episode-desc">{episode.duration}m</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Watch;
