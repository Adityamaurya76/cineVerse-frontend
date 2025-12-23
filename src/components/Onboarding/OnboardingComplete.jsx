import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOnboarded } from "../Redux/slices/AuthSlice";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import "./OnboardingComplete.scss";

const genres = [
  { id: "action", name: "Action" },
  { id: "comedy", name: "Comedy" },
  { id: "drama", name: "Drama" },
  { id: "scifi", name: "Sci-Fi" },
  { id: "horror", name: "Horror" },
  { id: "thriller", name: "Thriller" },
  { id: "romance", name: "Romance" },
  { id: "fantasy", name: "Fantasy" },
  { id: "animation", name: "Animation" },
  { id: "documentary", name: "Documentary" },
  { id: "adventure", name: "Adventure" },
];

const moviePosters = [
  {
    id: 1,
    title: "Sci-Fi Epic",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBxNGEXTq0RDrf5Zr40VwUykM51ZElyjKxMf-rc2uZgshgKWkD2pI7KZ37prLnEUOqa7LNYnUjtEjqD-2-n8lt1Jvvfj6A8EvTxsHido8w82IrWhEkHMRClncfTwQyuHZiqvmhJT-yk2JahC-XrnpA0PEs1TmOvbcINyffOhvgednW7SHyUU49-U2vI7aV1S0qBe2IkMwH6_aFiuDfYQ6MmSHqAldRVIaUDLLkrSTk1GQ8lpv3wpUK6IhgLm8CPCMKH5QhrpVPBMcdr",
  },
  {
    id: 2,
    title: "Romantic Comedy",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-ZNH1ZLUPQWWqIBJRZdUFPud6_Hz-gQsLifnwx-bT_K-kUuK4s_1w58GQOR2RRsUxxTHJwMjcHwsDrGkAWELkSvRo7VyB4c-YyKemXra5hZHTqExPyefbb3CqYmHgcwAWX_fQojJa3KVsgUtejaSm4lZIo1uVd9nMJZhM5e9kRDSw09cLTzNTFULkffyL6svUa5cn44xqdJmBUucGe3Q70Xn5IARZrFhZTWuDJLqsz4X684tF4TnfIGsEeY1rXY6wtLcAj821j1oG",
  },
  {
    id: 3,
    title: "Action Thriller",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDwdkYBCqQXwQwD1JWwlheuLCD0E5BMBTQD5PYS9mUSzfpY6JlaZmA4IANffmtS1k1exO69grK25vKu8z6u0tFdvNW6WzUKbqKqiUdOU-x9hDem4y0O-jtI1ksAbv88-ilAdh5Jrfy-pd9fZd1Haq42QG3pX8Do0D66h5MspxEe-3UQT_-lmtNJWEsZk7deJNQlXOn9CJb3do_IqTfIEPvHHwS-2bis00LfdyYAJOe69Aw71mIqGRqKnhkXFnYnc_l0YEPTgovYZtRM",
  },
  {
    id: 4,
    title: "Animated Family",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBBisWXyvzqM-nqF9DCdOc_ZZSwKK55KuDgJshk6A-DQ0rDnbZl04bIzRCXvYO9sPLQ26klH-ulyJMSTSGrs3stO65R4GLPjwXMw6icSQo3BKtEAc5unXGNZecSQaL7J-gT-QZZkD_BFI0p9IL8Jcnqrt95YtYEF-2gpvpvcN3DUImL56qIdSo9MR3tUAsWj3d0VrAKTaUngm7A16nzuJ0t8AD9xKK40iPr4ah3gDFNF10TNQsg0hbPUDGstUQPuDJywJlxEajzOkW0",
  },
  {
    id: 5,
    title: "Historical Drama",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCxTiMXY3AKjTjn3-YmcdVq6WJpIZardQ7REIWq5RZBBm8HPfhADNBzBNyuZrvPC9mwVZ0qAf35tAVtWY66KljqGpqjbthfOCsfiZygadP40PLc2kWpqH4RvyE_7RCad3d9oWfnfoB07jZA4MaFhqeHN-98H7zJtxvV04GC9x7ZT4Brg8Bqf4uVKahmDUjdTrmZEMKi3Ymf2YCpxo3wLZZmKwhAth7ird6ius5Ru9CCBuL6-fNEs0aNT-IG1KvPz1N8EnR47y3vzS5P",
  },
  {
    id: 6,
    title: "Suspense Horror",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBznU_UPE78P8UcKyMnTNCw6VlzBN87e3yX7xjemnpJYuuCWJxO2Zj9Gx7WOQTkG1FJaR0sj6ftit7vI8lTzJW7lDCo5L1CFclc7IGw4ZR0BYhE8ORs6WaergAHYU3xSbVDZbD-MR8OddSVkrkjoDSInHmtNuXRJiy08JCScMT6T3SH_x63meih8bT3gt6pcyy4Gxek8rDyGPLeSRM35N2fX74hrM1duZ9EBCfjsScpbWZVhVs7ggGL7c4yEibxV1314CLLEC1nJp0y",
  },
];

const OnboardingComplete = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentStep = 3;
  const totalSteps = 3;

  const [selectedGenres, setSelectedGenres] = useState(["drama", "fantasy"]);
  const [ratings, setRatings] = useState({});

  const toggleGenre = (genreId) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId]
    );
  };

  const rateMovie = (movieId, rating) => {
    setRatings((prev) => ({
      ...prev,
      [movieId]: prev[movieId] === rating ? null : rating,
    }));
  };

  const handleFinish = () => {
    localStorage.setItem("selectedGenres", JSON.stringify(selectedGenres));
    localStorage.setItem("movieRatings", JSON.stringify(ratings));
    dispatch(setOnboarded(true));
    navigate("/subscription", { replace: true });
  };

  const handleSkip = () => {
    dispatch(setOnboarded(true));
    navigate("/subscription", { replace: true });
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="onboarding-complete">
      <main className="onboarding-complete__container">
        <div className="onboarding-complete__progress">
          <p className="onboarding-complete__step-text">Step {currentStep} of {totalSteps}</p>
          <div className="onboarding-complete__progress-bar">
            <div className="onboarding-complete__progress-fill" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
        <div className="onboarding-complete__header">
          <h1 className="onboarding-complete__title">Personalize Your Experience</h1>
          <p className="onboarding-complete__subtitle">Tell us what you love to watch. This will help us recommend the best content for you.</p>
        </div>
        <div className="onboarding-complete__genres">
          {genres.map((genre) => (
            <button key={genre.id} className={`onboarding-complete__genre-chip ${selectedGenres.includes(genre.id) ? "onboarding-complete__genre-chip--selected" : ""}`} onClick={() => toggleGenre(genre.id)}>{genre.name}</button>
          ))}
        </div>
        <div className="onboarding-complete__rate-section">
          <h2 className="onboarding-complete__rate-title">Rate a few titles</h2>
          <p className="onboarding-complete__rate-subtitle">This helps us fine-tune your recommendations even more.</p>

          <div className="onboarding-complete__movies-grid">
            {moviePosters.map((movie) => (
              <div key={movie.id} className="onboarding-complete__movie-card">
                <img src={movie.poster} alt={movie.title} className="onboarding-complete__movie-poster"/>
                <div className="onboarding-complete__movie-overlay"></div>
                <div className="onboarding-complete__movie-actions">
                  <button
                    className={`onboarding-complete__rate-btn onboarding-complete__rate-btn--down ${
                      ratings[movie.id] === "down"
                        ? "onboarding-complete__rate-btn--active-down"
                        : ""
                    }`}
                    onClick={() => rateMovie(movie.id, "down")}
                  >
                    <FiThumbsDown />
                  </button>
                  <button
                    className={`onboarding-complete__rate-btn onboarding-complete__rate-btn--up ${
                      ratings[movie.id] === "up"
                        ? "onboarding-complete__rate-btn--active-up"
                        : ""
                    }`}
                    onClick={() => rateMovie(movie.id, "up")}
                  >
                    <FiThumbsUp />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="onboarding-complete__actions">
          <button className="onboarding-complete__skip-btn" onClick={handleSkip}>Skip for Now</button>
          <button className="onboarding-complete__finish-btn" onClick={handleFinish}>
            <span>Finish & Start Watching</span>
            <HiSparkles />
          </button>
        </div>
      </main>
    </div>
  );
};

export default OnboardingComplete;
