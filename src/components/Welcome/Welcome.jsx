import { Link } from "react-router-dom";
import "./Welcome.scss";

const features = [
  {
    icon: "devices",
    title: "Watch Anywhere",
    description: "Enjoy Cineverse on your favorite devices, from your TV to your tablet and phone.",
  },
  {
    icon: "movie",
    title: "Endless Entertainment",
    description: "Explore a vast library of thousands of titles, with new releases added weekly.",
  },
  {
    icon: "download_for_offline",
    title: "Download and Go",
    description: "Save your favorites to watch offline, perfect for flights, commutes, and adventures.",
  },
];

const trendingMovies = [
  {
    id: 1,
    title: "Starlight Odyssey",
    genre: "Sci-Fi",
    poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEraurY_cqcIlAvjKPYuy7Gowz4HcIHQsM8ATA9rInf_ytZ7RYrnfOiQk8lJ2jUy5dYgTWfpUysyYXi95CR9ziO7ZMQDyWP9k6egdSyBfGzLR2yIzyn50jgE0ZPHIUeft7eVg8twawM1CTZjJBihGhuXAC6iVbVCW9JfCTw_3g0LMHwmu_FR-PhBJ9sUxpaPakgaaa7tfmAb105NcX5cbgbCnQ6B6XCEKC6ypzNKgbTXaCvagBz_zxoibjocT1R8ERrxBTJDZxh_2u",
  },
  {
    id: 2,
    title: "Echoes of the Void",
    genre: "Thriller",
    poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsW8l8ck__rmL2haNiKuCUW0X51AyvJXnjgwJNUGqx4CD1AgL_HvRw4lwCuuplvLUPPY31ubbklNKoJxnDgfy0d8TtHo0D8Btvyerx3FR6QREbnWwKlfmeEj30Nf6FLfdf-I9JLhWCHhGL5JGbzVKEwWGubGhOHiBQIGrajGJSxR4AENRDG0LDPd9Hm6nOHxmKJ-ZKzVsdolHpORwEdpGnAjUDM3Y6HnZGXxHOY2Dlqdm1PzsZQHZBm6jZY7Ecp4ufSQsB32mHFRY_",
  },
  {
    id: 3,
    title: "The Crimson Legacy",
    genre: "Fantasy",
    poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHZ3PXyhTk3EP_V5fus5YJWvA9lcHrSAmKFTYqzyCWMABR0eN4_NIKw5szlb85h_dARu0yEhYN19XymKvBbNMLSzuyu_dQc637-MHUpL-yhGjx17uYV7roLUV5ct7pb4ZQRBCXhvZ34wOuZ8k747c9D7WOs0aiCzdEC_HYBv9OEp-Jxo8CIArRmwdmso1iNh2nXAz6-1AXAsqOW7UGc7OFmbdnZjanZQP_LxHNxxbDVe0kG9X2A5v09USP6J34DyN-36PBgl3cz9zs",
  },
  {
    id: 4,
    title: "Cybernetic Dawn",
    genre: "Sci-Fi",
    poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuB53IHDuiDsWw8I-9wL82FyApdbIvnZIYaGhbXuQCAYGaI6SBr34BYI49i2lbJYTnaWSNMjNjs8AVCWW5l6fSLxGgwqKWc0iYJNQXEPexcy9zYUAxfEBx3pac4FZpvyDEFclZ84QFdFhLbn4ZEoMoAQW0UWTdgLdI7ChSJQAa8bTjtqB6zxhlG0Bwv9uJVnPRH_UfxFE2ELaeDIVF97_F0ZDWjbf0btgIwLywpw3v7ch-xgWvzsT0v6JMsO2zu5_ltzPEUPPCwMmDOx",
  },
  {
    id: 5,
    title: "Midnight Serenade",
    genre: "Drama",
    poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvGwQ_A13y0J7T_aOJqETZ5pn9jnUzUH-ds_ignRe4q8eq2r6i02qhuQk3Vtg8Oo04h7bdpuGPTfTcTLAzGu5TCyP5txrJwldARm-aOgrfj0g3ed1ceMyVjaqKj-97kPTXAuW3wdKs1-oY6hnjxKMmoGVCGE9wXK51feBhWRZZuzX8hU4Pb1sqpYXnEv89fnOxs2JPOS8niFunGCObOtk-w25Vy3eAs9yX-jUi9qN4Olg_F1xuyHF_ulX01HVr2JSNfevwEcOwwydR",
  },
  {
    id: 6,
    title: "The Glass Alchemist",
    genre: "Fantasy",
    poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmu_6DXuDcbqA1e_S39Jn3w505TmxGCZPprEiU9H5wydFWNrY47D9qWB7Dc1gksxJd9a8u-6ktBZKog1-8t1RgkynsLrd_n_mRXWmdg28azAZUzllJsy5YhsW_U-o3CyuiUh5hrfG4NMCd2IcXLJI_xaZekPzSODO_bKZ-nhaQr-BAV9S2BN7ElzWIRgmdZbu3UAu_cp-_bcG2gN4pTPNPnZdkrqyM_rdnSf1aPJcuW7CrltD1fOIM34ingIvWLxSXQpFKnMihYNso",
  },
  {
    id: 7,
    title: "River of Secrets",
    genre: "Mystery",
    poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuDF94P338A8MIMzTP0ptYlHjgQ0cq3qxjqTtS3MydZ7rmwuYehRP4S26Pm2xK5LeHY3yH7Su3ZBi7ccoPDbXoQnxSCzRypNLIZN8kR2SdHUN7Om0v8EzhCI_TPEuFnDov9sqlNmECNLtWBeA8wK_9kz82E1NbNXoyaODFoFTz_txh8QeJRQnAN5verqz5e1Qt6tE9xe5HRXL_IWMp8tf6rMjrmTaeziNoSDd-UdPp9ykaOnxxH_wCs_VmiNqy_zriHMRmRfYh3OPjQw",
  },
];

const Welcome = () => {
  return (
    <div className="welcome">
      <div className="welcome__container">
        {/* Header */}
        <header className="welcome__header">
          <div className="welcome__logo">
            <svg
              className="welcome__logo-icon"
              fill="currentColor"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
                fillRule="evenodd"
              />
            </svg>
            <span className="welcome__logo-text">Cineverse</span>
          </div>
          <nav className="welcome__nav">
            <Link to="/login" className="welcome__nav-link">Log In</Link>
            <Link to="/signup" className="welcome__nav-link">Sign Up</Link>
          </nav>
          <div className="welcome__nav-mobile">
            <Link to="/signup" className="welcome__signup-btn-mobile">Sign Up</Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="welcome__main">
          {/* Hero Section */}
          <section className="welcome__hero-section">
            <div
              className="welcome__hero"
              style={{
                backgroundImage: `linear-gradient(rgba(25, 16, 34, 0.4) 0%, rgba(25, 16, 34, 0.8) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuATT01YeUthZTkw2HEcczlZwW9UP3kzoPZlyISqaR1Irx53Hjm_anqsQTbxaDLJbpdJ_wbaU11gVi6TztEWCGy61flTJOR0UpIB8yLeyh6BeBMdnXto3VEbysMmFD331KDCZACeo_xJQzlvA4IBEu-IXJ0ZncXMWFXwTM56NMX-crETmXFbEHG24wCDB79RX0F8Eo5ldqasEgSGDRB05bSuzLLCkx0GNIMp5ErnzAQkGkxSe9VySmsdLtLU4ZAI-lqd3ilrNNYun2HM")`
              }}
            >
              <h1 className="welcome__hero-title">Your Universe of Cinema Awaits</h1>
              <p className="welcome__hero-subtitle">
                Stream thousands of hit movies, exclusive originals, and timeless classics. All in one place.
              </p>
              <Link to="/signup" className="welcome__hero-cta">
                Start Your Free Trial
              </Link>
            </div>
          </section>

          {/* Features Section */}
          <section className="welcome__features-section">
            <div className="welcome__features-header">
              <h2 className="welcome__features-title">
                Everything you love about cinema, and then some.
              </h2>
              <p className="welcome__features-subtitle">
                Discover a seamless streaming experience packed with features designed for the true film enthusiast.
              </p>
            </div>
            <div className="welcome__features-grid">
              {features.map((feature, index) => (
                <div className="welcome__feature-card" key={index}>
                  <span className="material-symbols-outlined welcome__feature-icon">
                    {feature.icon}
                  </span>
                  <div className="welcome__feature-content">
                    <h3 className="welcome__feature-title">{feature.title}</h3>
                    <p className="welcome__feature-description">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Trending Section */}
          <section className="welcome__trending-section">
            <h2 className="welcome__trending-title">Trending Now</h2>
            <div className="welcome__trending-scroll hide-scrollbar">
              <div className="welcome__trending-track">
                {trendingMovies.map((movie) => (
                  <div key={movie.id} className="card welcome__card-item">
                    <div
                      className="card__poster"
                      style={{ backgroundImage: `url(${movie.poster})` }}
                    ></div>
                    <div className="card__info">
                      <p className="card__title">{movie.title}</p>
                      <p className="card__subtitle">{movie.genre}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <footer className="welcome__footer">
          <div className="welcome__footer-content">
            <div className="welcome__footer-brand">
              <svg
                className="welcome__footer-logo-icon"
                fill="currentColor"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
                  fillRule="evenodd"
                />
              </svg>
              <span className="welcome__footer-copyright">© 2024 Cineverse. All Rights Reserved.</span>
            </div>
            <div className="welcome__footer-links">
              <a href="#" className="welcome__footer-link">Terms of Service</a>
              <a href="#" className="welcome__footer-link">Privacy Policy</a>
              <a href="#" className="welcome__footer-link">Support</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Welcome;
