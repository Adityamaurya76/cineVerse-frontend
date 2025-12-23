import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiPlay, FiInfo } from "react-icons/fi";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { homeList } from "../../components/Redux/slices/HomeSlice";
import "./Home.scss";
import { useEffect } from "react";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.home);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?._id) {
      dispatch(homeList(user._id));
    }
  }, [dispatch, user]);

  const heroContent = data?.data?.hero;
  const continueWatching = data?.data?.continueWatching || [];
  const newReleases = data?.data?.newReleases || [];
  const trending = data?.data?.trending || [];

  if (loading) return <Loader />;
  if (error) return <div className="home__error">Error: {error}</div>;
  if (!data) return null;

  return (
    <div className="home">
      <div className="home__layout">
        <Navbar />
        <main className="home__main">
          {heroContent && (
            <section className="home__hero">
              <div className="home__hero-backdrop" style={{ backgroundImage: `url(${heroContent.thumbnail?.url})` }}></div>
              <div className="home__hero-gradient-top"></div>
              <div className="home__hero-gradient-left"></div>
              <div className="home__hero-content">
                <h1 className="home__hero-title">{heroContent.title}</h1>
                <p className="home__hero-description">{heroContent.description}</p>
                <div className="home__hero-actions">
                  <Link to={`/watch/${heroContent._id}`} className="btn btn--lg btn--primary">
                    <FiPlay />
                    <span>Play</span>
                  </Link>
                  <Link to={`/details/${heroContent._id}`} className="btn btn--lg btn--secondary">
                    <FiInfo />
                    <span>More Info</span>
                  </Link>
                </div>
              </div>
            </section>
          )}
          <div className="home__sections">
            {continueWatching.length > 0 && (
              <section className="home__section">
                <h2 className="home__section-title">Continue Watching</h2>
                <div className="home__content-padding">
                  <div className="card-grid card-grid--wide">
                    {continueWatching.map((item) => (
                      <Link key={item._id} to={`/watch/${item._id}`} className="card">
                        <div className="card__image-wrapper card__image-wrapper--wide">
                          <div className="card__image" style={{ backgroundImage: `url(${item.thumbnail?.url})` }}></div>
                          <div className="card__gradient"></div>
                          <div className="card__overlay">
                            <span className="card__play-icon">play_circle</span>
                          </div>
                        </div>
                        <div className="card__info">
                          <p className="card__title">{item.title}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}
            {newReleases.length > 0 && (
              <section className="home__section">
                <h2 className="home__section-title">New Releases</h2>
                <div className="home__content-padding">
                  <div className="card-grid card-grid--poster">
                    {newReleases.map((item) => (
                      <Link key={item._id} to={`/details/${item._id}`} className="card">
                        <div className="card__poster" style={{ backgroundImage: `url(${item.thumbnail?.url})` }}></div>
                        <div className="card__info">
                          <p className="card__title">{item.title}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}
            {trending.length > 0 && (
              <section className="home__section">
                <h2 className="home__section-title">Personalized For You</h2>
                <div className="home__content-padding">
                  <div className="card-grid card-grid--wide">
                    {trending.map((item) => (
                      <Link key={item._id} to={`/details/${item._id}`} className="card">
                        <div className="card__thumbnail" style={{ backgroundImage: `url(${item.thumbnail?.url})` }}></div>
                        <div className="card__info">
                          <p className="card__title">{item.title}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
