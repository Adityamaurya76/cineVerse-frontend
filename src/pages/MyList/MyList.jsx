import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./MyList.scss";

const myListItems = [
  {
    id: 1,
    title: "Sci-Fi Adventure",
    type: "movie",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJhCwMIl3ZORxo_Zj_HdSRX2rGT5G_TJFyI5Y-zRjIlhV8yc4E32avIXhPfFxDRjmq-bYNJVi0EBH-8dSFPfE1lXJ2yt4VJhI_P8HhVWbCK5m5K7fBlWkQpqJq7jNZ4qA5vNpC9A",
    addedDate: "2024-12-01",
  },
  {
    id: 2,
    title: "Action Movie",
    type: "movie",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBL-zeadkNkxTRA7xW06mpU48dEN4YmghYZje-opSjCi1Ek860qmL3MwW3KKFdn6bQ7by4p8Scjr4EJ-NQWFfeFrlSmBR0gWSwQrqaXfQHOIogu03Ytxy4QqW6pbgJOaNVmzySQ4E7d8Z2Syrzv_yxlQTJcKKvIRGoUbr_7X8GPc9WWQf0bUNMD8kLz7Ca9TDVbr-rofNe3wMYDj85DR-swrsWw0dhfhQwIf0wJ4lvsJWPCjsN9V6hG3rjyJA3QDTk771IOj-ER5jQ_",
    addedDate: "2024-11-28",
  },
  {
    id: 3,
    title: "Drama Series",
    type: "tv",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAnz0Q4k_TpmHqoXYKnKQc-bYpclmHMKqZSd3XbU-VTKK9AhjYLZ8HiUMVe9AOHpL4vI3VE7chMhLcWZyv8Q-zJQoHQsLwRvJFKQGv9XOVmKxVJLhTmHkMGIvzMkJeYwRbKFQg",
    addedDate: "2024-11-25",
  },
  {
    id: 4,
    title: "Comedy Special",
    type: "tv",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9WB7-QDPw5r2_lo-xQAFjGi3jGbyEn-1cXIk3dxsf0IQFIdlD_OT9fA8rtMvEMVTZ_zxLb4ER_w9spMyJvkV-TFNiHFothrAfyR2NVcN_Y5izUpmkHS32PhdZ7tfvY9xyJYVs1F8YZ6L_i5IaoUOjYtBHXpVOZ2w0jjdR41WKv9vE4xiTk1QXJSCH7x3PUAq9j3X21o-PHUw5HfCqVnc9D_6i5-IJHEDHI29eK4Po1-ZwwriOG1iy2BRnpkZ-0gTfPBdv7TDkWiAq",
    addedDate: "2024-11-20",
  },
  {
    id: 5,
    title: "Thriller Series",
    type: "tv",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgtosvOmi6jp-EFBTE0uJAZEq20RUYdklcTSdIIqQPtxBwjhau_KvOpNP7iUDdOKj0-xxkb9c0zvNDIdfTXBFU2DQgSIhe5n2W_2_E1xFJswvsRSGqA_l6AWhG5hyE07mf7zZv8cRlgbMwN4Z_MQA2EiEHgMf2SuXjHxIlfA9sJqH2NpcxKJduuGQET9P1Aw0FlZKYpEbzu2azhnCbCeT4fff2opesrUJ0sQpjgcbaEIZD1Yi9c6qXdWwb2EqmV12olC9wxvg1ptYW",
    addedDate: "2024-11-15",
  },
  {
    id: 6,
    title: "Animation Movie",
    type: "movie",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJhCwMIl3ZORxo_Zj_HdSRX2rGT5G_TJFyI5Y-zRjIlhV8yc4E32avIXhPfFxDRjmq-bYNJVi0EBH-8dSFPfE1lXJ2yt4VJhI_P8HhVWbCK5m5K7fBlWkQpqJq7jNZ4qA5vNpC9A",
    addedDate: "2024-11-10",
  },
  {
    id: 7,
    title: "Documentary Series",
    type: "tv",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAnz0Q4k_TpmHqoXYKnKQc-bYpclmHMKqZSd3XbU-VTKK9AhjYLZ8HiUMVe9AOHpL4vI3VE7chMhLcWZyv8Q-zJQoHQsLwRvJFKQGv9XOVmKxVJLhTmHkMGIvzMkJeYwRbKFQg",
    addedDate: "2024-11-05",
  },
  {
    id: 8,
    title: "Fantasy Movie",
    type: "movie",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBL-zeadkNkxTRA7xW06mpU48dEN4YmghYZje-opSjCi1Ek860qmL3MwW3KKFdn6bQ7by4p8Scjr4EJ-NQWFfeFrlSmBR0gWSwQrqaXfQHOIogu03Ytxy4QqW6pbgJOaNVmzySQ4E7d8Z2Syrzv_yxlQTJcKKvIRGoUbr_7X8GPc9WWQf0bUNMD8kLz7Ca9TDVbr-rofNe3wMYDj85DR-swrsWw0dhfhQwIf0wJ4lvsJWPCjsN9V6hG3rjyJA3QDTk771IOj-ER5jQ_",
    addedDate: "2024-11-01",
  },
];

const filterOptions = [
  { id: "all", label: "All" },
  { id: "movies", label: "Movies" },
  { id: "tv", label: "TV Shows" },
];

const sortOptions = [
  { id: "recent", label: "Recently Added" },
  { id: "alphabetical", label: "A-Z" },
  { id: "oldest", label: "Oldest First" },
];

const MyList = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const filteredItems = myListItems.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "movies") return item.type === "movie";
    if (activeFilter === "tv") return item.type === "tv";
    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.addedDate) - new Date(a.addedDate);
    }
    if (sortBy === "alphabetical") {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === "oldest") {
      return new Date(a.addedDate) - new Date(b.addedDate);
    }
    return 0;
  });

  const handleRemoveFromList = (id) => {
    console.log("Remove item:", id);
  };

  return (
    <div className="mylist">
      <Navbar />

      <main className="mylist__main">
        {/* Page Header */}
        <div className="mylist__header">
          <h1 className="mylist__title">My List</h1>
        </div>

        {/* Filters and Sort */}
        <div className="mylist__controls">
          <div className="mylist__filters">
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

          <div className="mylist__sort">
            <button
              className="mylist__sort-btn"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
            >
              <span>
                {sortOptions.find((opt) => opt.id === sortBy)?.label}
              </span>
              <span className="material-symbols-outlined">expand_more</span>
            </button>

            {showSortDropdown && (
              <div className="mylist__sort-dropdown">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    className={`mylist__sort-option ${
                      sortBy === option.id ? "mylist__sort-option--active" : ""
                    }`}
                    onClick={() => {
                      setSortBy(option.id);
                      setShowSortDropdown(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content Grid */}
        {sortedItems.length > 0 ? (
          <div className="mylist__grid">
            {sortedItems.map((item) => (
              <Link
                to={`/details/${item.id}`}
                key={item.id}
                className="mylist__card"
              >
                <div className="mylist__card-image-wrapper">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="mylist__card-image"
                  />
                  <div className="mylist__card-overlay">
                    <button className="mylist__card-play">
                      <span className="material-symbols-outlined">
                        play_arrow
                      </span>
                    </button>
                    <button
                      className="mylist__card-remove"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveFromList(item.id);
                      }}
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                </div>
                <div className="mylist__card-info">
                  <h3 className="mylist__card-title">{item.title}</h3>
                  <span className="mylist__card-type">
                    {item.type === "movie" ? "Movie" : "TV Show"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mylist__empty">
            <span className="material-symbols-outlined mylist__empty-icon">
              bookmark_border
            </span>
            <h2 className="mylist__empty-title">Your list is empty</h2>
            <p className="mylist__empty-text">
              Start adding movies and TV shows to your list to watch them later.
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

export default MyList;
