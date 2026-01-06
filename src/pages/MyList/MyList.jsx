import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import "./MyList.scss";
import { useDispatch, useSelector } from "react-redux";
import { mylistList, removeVideoFromMyList } from "../../components/Redux/slices/MyListSlice";
import { toast } from "react-toastify";

const MyList = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.mylist);
  const { user } = useSelector((state) => state.auth);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  useEffect(() => {
    if (user?._id) {
      dispatch(mylistList(user._id));
    }
  }, [dispatch, user?._id]);

  if (loading) return <Loader />
  if (error) return <div className="mylist__error">Error: {error}</div>

  const items = data?.data || [];

  const filterOptions = [
    { id: "all", label: "All" },
    { id: "movies", label: "Movies" },
    { id: "tv", label: "TV Shows" },
  ];

  const sortOptions = [
    { id: "recent", label: "Recent" },
    { id: "alphabetical", label: "Alphabetical" },
    { id: "oldest", label: "Oldest" },
  ];

  const filteredItems = items.filter(item => {
    if (activeFilter === "all") return true;
    if (activeFilter === "movies") return item.videoType === "movie" || item.video?.type === "movie";
    if (activeFilter === "tv") return item.videoType === "series" || item.video?.type === "series";
    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    const titleA = a.video?.title || "";
    const titleB = b.video?.title || "";
    const dateA = new Date(a.addedAt || a.createdAt);
    const dateB = new Date(b.addedAt || b.createdAt);

    if (sortBy === "recent") return dateB - dateA;
    if (sortBy === "alphabetical") return titleA.localeCompare(titleB);
    if (sortBy === "oldest") return dateA - dateB;
    return 0;
  });

  const handleRemoveFromList = (id) => {
    dispatch(removeVideoFromMyList(id))
      .unwrap()
      .then(() => {
        toast.success("Removed from your list");
      })
      .catch((err) => {
        toast.error(err || "Failed to remove from list");
      });
  };

  return (
    <div className="mylist">
      <Navbar />
      <main className="mylist__main">
        <div className="mylist__header">
          <h1 className="mylist__title">My List</h1>
        </div>
        <div className="mylist__controls">
          <div className="mylist__filters">
            {filterOptions.map((filter) => (
              <button key={filter.id} className={`chip ${activeFilter === filter.id ? "chip--active" : ""}`} onClick={() => setActiveFilter(filter.id)}>{filter.label}</button>
            ))}
          </div>

          <div className="mylist__sort">
            <button className="mylist__sort-btn" onClick={() => setShowSortDropdown(!showSortDropdown)}>
              <span>{sortOptions.find((opt) => opt.id === sortBy)?.label}</span>
              <span className="material-symbols-outlined">expand_more</span>
            </button>
            {showSortDropdown && (
              <div className="mylist__sort-dropdown">
                {sortOptions.map((option) => (
                  <button key={option.id} className={`mylist__sort-option ${sortBy === option.id ? "mylist__sort-option--active" : ""}`} onClick={() => { setSortBy(option.id); setShowSortDropdown(false); }}>{option.label}</button>
                ))}
              </div>
            )}
          </div>
        </div>
        {sortedItems.length > 0 ? (
          <div className="mylist__grid">
            {sortedItems.map((item) => (
              <Link to={`/details/${item.video?._id}`} key={item._id} className="mylist__card">
                <div className="mylist__card-image-wrapper">
                  <img src={item.video?.thumbnail?.url} alt={item.video?.title} className="mylist__card-image" />
                  <div className="mylist__card-overlay">
                    <button className="mylist__card-play"><span className="material-symbols-outlined">play_arrow</span></button>
                    <button className="mylist__card-remove" onClick={(e) => { e.preventDefault(); handleRemoveFromList(item._id); }}><span className="material-symbols-outlined">close</span></button>
                  </div>
                </div>
                <div className="mylist__card-info">
                  <h3 className="mylist__card-title">{item.video?.title}</h3>
                  <span className="mylist__card-type">{item.video?.type === "movie" ? "Movie" : "TV Show"}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mylist__empty">
            <span className="material-symbols-outlined mylist__empty-icon">bookmark_border</span>
            <h2 className="mylist__empty-title">Your list is empty</h2>
            <p className="mylist__empty-text">Start adding movies and TV shows to your list to watch them later.</p>
            <Link to="/browse" className="btn btn--lg btn--primary">Browse Content</Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MyList;
