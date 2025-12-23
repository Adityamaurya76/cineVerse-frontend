import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./WatchHistory.scss";

const watchHistoryItems = [
  {
    id: 1,
    title: "Cybernetic Dreams",
    type: "tv",
    episode: "S1 E4",
    progress: 80,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAB1HkKwYdxqPVHTKyF0mYDAxll5-musTKgUMQEXwSfiScioLSXtt3siSYwxicGbEwy6pDqAv4fMiAxI7s19UOkFAS4PI8HGcgqb0K2lErCzxQLFR8C0OBMghbZso8IYIBYNSIzDitgkVZFydjHH49pyBcLdi16jPsukwfyphNhBp_SqIwOaTnvXUh0-KuehTnaBpghw5wb7tTKBjMuPaNfFEhRprbSqaZL--kmBs6eKqLOk9xIveRBn_cDTLJsBw_lNFS8_mfzejqX",
    watchedDate: "2024-12-01",
  },
  {
    id: 2,
    title: "Galaxy Wanderers",
    type: "movie",
    episode: null,
    progress: 100,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrWDHumNf1tqIJAGbtdrgVAlXWZIrjMxt857RwBdNCuFRpQ5GfM9alFTEDDOiUWjQ74nuhWYj1bjqLWkMUbV-wolaIeUuhaoKSWJQ3O7lJwTf86G4UAopk4TmyRW7UEJV4MdaTfftMSCFdOQax2m4NRvpMSzwQT4Jm49PXdW-6EFszz6kh_e9QxOXpGqbuphG23Pk7YGbVmWaxax9eJR-Sia1ehyUv0--WGwiUOSI3xhwzsOQeOmxvAIaibHyqd9nBKHOJj3i1g1ns",
    watchedDate: "2024-11-28",
  },
  {
    id: 3,
    title: "The Last Stand",
    type: "tv",
    episode: "S2 E1",
    progress: 35,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB5Z5Ip3bRYT4lUXoHalsGWkGqhcJV0o_MWtpiUSirD-_mRgoDq1uPfALIehLXlZnY28pKnFAL9YF4Pyr69RH_95xCA5MSmn9XuTK0K1RQMBs4z-gF-nNHiJ8oNTB1LjvGhWPuqnxwf80dpC1XGVZCY5bDCUFbZ3PHLZCcfl1fxoPDUOBFdDXlAlplyYihiFuRA5oMFF--_K4tblj0lQRkZq22OnNU3kOKI3QeY1NlGGlxlNWdRI0ZQ1kJcEjk8yXV504d7Rmm1oRG1",
    watchedDate: "2024-11-25",
  },
  {
    id: 4,
    title: "Midnight Hour",
    type: "tv",
    episode: "S3 E8",
    progress: 95,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAwcSsy4lBatTjNEwSN_Y0JRQDkWCWDlWjPIC3gj5FkPg2gHGgzp6lkdTj8gkaeSGTr8OIxp6iToAqjsuOqwwZ0XkIxf0aiDIoSzMABRIYVzYY40oGxkL9MtrfC_ZZRUrEWVViBFNqP2exf1zcMrx0QwuoMyaBZsq4fF_kQ7bOtcsrLLSxP9jpi_RZ6tSeqQJdCgrYgIibIakSeZwZJVOfenVoqcezU2J5mATkNBDcvusU49-QbVaDOIsBzxiWP6ifvsffoABJI_D6X",
    watchedDate: "2024-11-20",
  },
  {
    id: 5,
    title: "Ocean's Mystery",
    type: "movie",
    episode: null,
    progress: 100,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrcYb2nP--hN7Vj_qYpK9nG4L0BiMYZ3AEEOgwxg4sYu7fC8eVbjobkYECAZxYN37XEFdqH5EYOLnbRitcauDXwiH_YplXizL377enZCiKA4JVIKvNy9oU-kDc24qJpfmb-YIuFeQZuTzoyaL3csn6AdXhjPfP6lgrqre-u1Jhk17gPaKyNXKOer9vv-eXjaW5YwX876uNd55pk8WP3xafqaUNZ8j9edYWWN7ZroHyoxJBnDwCjDgPzKuWCS_739hmuy1znoblzFjM",
    watchedDate: "2024-11-15",
  },
];

const filterOptions = [
  { id: "all", label: "All" },
  { id: "movies", label: "Movies" },
  { id: "tv", label: "TV Shows" },
];

const WatchHistory = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [historyItems, setHistoryItems] = useState(watchHistoryItems);

  const filteredItems = historyItems.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "movies") return item.type === "movie";
    if (activeFilter === "tv") return item.type === "tv";
    return true;
  });

  const handleRemoveItem = (id) => {
    setHistoryItems(historyItems.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setHistoryItems([]);
  };

  return (
    <div className="watch-history">
      <Navbar />

      <main className="watch-history__main">
        {/* Page Header */}
        <div className="watch-history__header">
          <h1 className="watch-history__title">Watch History</h1>
          {historyItems.length > 0 && (
            <button
              className="watch-history__clear-btn"
              onClick={handleClearAll}
            >
              Clear All History
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="watch-history__filters">
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              className={`chip ${
                activeFilter === filter.id ? "chip--active" : ""
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        {filteredItems.length > 0 ? (
          <div className="watch-history__grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="watch-history__card">
                <div className="watch-history__card-image-wrapper">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="watch-history__card-image"
                  />
                  <div className="watch-history__card-gradient"></div>

                  {/* Hover Overlay */}
                  <div className="watch-history__card-overlay">
                    <Link
                      to={`/watch/${item.id}`}
                      className="watch-history__card-resume"
                    >
                      <span className="material-symbols-outlined">
                        {item.progress === 100 ? "refresh" : "play_arrow"}
                      </span>
                      <span>{item.progress === 100 ? "Watch Again" : "Resume"}</span>
                    </Link>
                    <button
                      className="watch-history__card-remove"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="watch-history__card-progress">
                    <div
                      className="watch-history__card-progress-bar"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="watch-history__card-info">
                  <h3 className="watch-history__card-title">{item.title}</h3>
                  <span className="watch-history__card-subtitle">
                    {item.episode || "Movie"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="watch-history__empty">
            <span className="material-symbols-outlined watch-history__empty-icon">
              history
            </span>
            <h2 className="watch-history__empty-title">
              Your Watch History is Empty
            </h2>
            <p className="watch-history__empty-text">
              Find your next favorite movie or show to get started.
            </p>
            <Link to="/browse" className="btn btn--lg btn--primary">
              Browse Content
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default WatchHistory;











