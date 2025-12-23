import { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight, FiChevronDown } from "react-icons/fi";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Search.scss";

const categories = [
  { id: "all", label: "All" },
  { id: "movies", label: "Movies" },
  { id: "tvshows", label: "TV Shows" },
  { id: "actors", label: "Actors" },
];

const genres = [
  "Any Genre",
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
];

const sortOptions = ["Relevance", "Popularity", "Rating", "Newest First"];

const searchResults = [
  {
    id: 1,
    title: "Dune: Part Two",
    type: "Movie",
    year: "2024",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB9eE0S31WW9W5twyHq0dWAvN7UQZQ3aetGMgfwJSioA-fQwJH2DVw81oUS6anhzYz1K8kSSYTHeYc9nSuUy6ksFvCuOjirH-e2_ss2BtfLVc-yNZ_I94bb-7VbmH5n0vhf8_xJMmZUDA4WkyURJ0ZdAkNPOItg7TPp76tmKJzzFr-9qDL9jo_LZnKgnWzfy4YBLiVUjrgagJJBHldL1WtkIr2T_IRmP2GBAbTEXc0TKOqG5QsF8ivOY4LplOQUHJ-Abelz6PkJ2taj",
  },
  {
    id: 2,
    title: "Dune",
    type: "Movie",
    year: "2021",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJOaz7yhQT_QYNB2Yv4JqQEDJzR7su8Sg-4dNkEtcohdVbTd2Fav1PF1LE2ChA-gtn3GDsRohcw2aGj9-gd8XtvEVNx2do9DTKXdBQtFJu7veFprN7igxkuKE6avrdK_2ijpTg_C1tCxjSu-IGc867dzTzNSQokBOyg9HYGjQEU7R8533cWHQXBJF-JpQnHCxoDv_tBXXcJ000LBJsKr4w_phhZ2-r-UB8hNaq2AoB7aTaPQjto4ZKLPXruHBagy5KqcteFQbhDvAn",
  },
  {
    id: 3,
    title: "Dune: Prophecy",
    type: "TV Show",
    year: "2024",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAjhkzrfXVgFMgW1UIfcCieJ7-Khg95LRJ_qbsOwZ4dXNGBiaz0-RNDHRKvwjmgS9RgOuhYvZtWpIzOK-qFzTACSUq11Ts2yIjfOTAsAyiqCiCQRlbAUtP4bCuigvURCC8QNABojUEzEwNrOUWNJupXtJEx0CuxEgGreowmvRYBxc_LWotVg1lRYa5-O2JMvHrUcCjQCEimKhHrIGJYF1v48jjS65A1ChWXIYTisUK7VjhTpyZI38PcfkbVqcSWym7uQjhCdx6h0AVP",
  },
  {
    id: 4,
    title: "Jodorowsky's Dune",
    type: "Movie",
    year: "2013",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuChxpPrhu8in1RwpLfXhzGvVjHMgue8NDwQoLhN11Tc_LD3IDYJ71ZtefxG6Jdh4MOEHxpOKEUiaEmxlpQ-RL2CVFpgejWfxqG5Lec1GlCldQFaEIR5VmdvcJerBrR2cR-2MDi8A7_psBoRkIZu68uNl_8je-pkldA4JjnhI8DMaLuRw1pXhnaabfjkVTIvrViS-w0jMDPnWW-o01IRIpKRhrgojX-Aulbg3rHAH_9PeszBRjStGg3FmlbwgI81qP8Yujlwo4D-CM-f",
  },
  {
    id: 5,
    title: "Timothée Chalamet",
    type: "Actor",
    year: null,
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuApZxJF1zClROv1V0GZAD-jcMSUIVGVRIpNXEPFsF-aMw7Wa1J-9qVLKrtEZXSRPATx7asqeyhHTXSOXgsuBJfc7TINi2fCqMw11cAQW75kwTXGQy_GPL9M9ASOar1cg_RhuIbsXhGORSwGuLJxm6RwMFJJim8-UHPpmcdXTudmh9MMl7aF58SMXQGQIkm7ySiM0oHqvo8zPadlukGsOPQ6QDGKlBvOC4H_gnJz2aT57gvDU5lOMHD1vF-tPzSnopivs8J_rW6NRi4q",
  },
  {
    id: 6,
    title: "Zendaya",
    type: "Actor",
    year: null,
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDmFdTumyUrl2DWjtRa7antE1_Sj0JZMiNVqHm2aVLKZMesgOYJ1-sKqTTjlYf9VPG2GIm313k8BzLr5oTQD643EMreK8RvGzdZm-VI3FWWhBIvw-igPcQhqchs4VFGftSkDRTdRrtQKiTiHxEiP6KN_QhCsle9a7bS5SH8Urb_LbNrsvoKiixqURxzTRiySnuTs8KSEBI_SnlPuOs-UJV9x6FdQK4kuWF6vrPTAv2zQax5usPJSKOemPxpbu3ZQujlS7owmILmndvP",
  },
  {
    id: 7,
    title: "Rebecca Ferguson",
    type: "Actor",
    year: null,
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbOwfVFQ7ItIWrpQsjWTxQ4Fxkog5s5VnJYtzyqxzadf1opOULm-_eG_lf2oWwT5rsveuYr7bsbGDFOhDW0pGE9-H3mr9s8HJobW4cjFVPBp7sNWZpsev7OLG1eUkkBeBGwKJbRP_NMgFmmNxuX_cRwkkvfSQU_Pe5ymYlIbPhPOsauaXMNBm9NvzAiB90Izgq77ggk02xttrGosEFfdCbzx-pWCZKw0PqM89plTVUOzo9i6jH9IC307J6nx1-N4WqmiTAXqrXeo2K",
  },
  {
    id: 8,
    title: "Javier Bardem",
    type: "Actor",
    year: null,
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_evwYTedC0smXoW5g18B7xkuI9O8efhhdnfRIJIELo9kqRTPB8zt2LVuiVfynWssKWUBldIW4ESBt9iXmr_3CPgGTgehFI7ga1Z-3FsE-6ca4IbTddhSMOn3rwN7VCj_g-nL59MndDmiiTzuSgIZ0al2SgWmkb_-EqOFVPicklVsppcuH7g_mPWXpA3mGxwgfclA0Pp2w24i9hDZ4w7Iky8RKLQfrCzZrrZWDPtsCsb5Z6NRXQ_6gJB5VSA7ZeTzFFDnFQG6Pj2iq",
  },
];

const Search = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeResultFilter, setActiveResultFilter] = useState("all");
  const [selectedGenre, setSelectedGenre] = useState("Sci-Fi");
  const [yearFrom, setYearFrom] = useState("2010");
  const [yearTo, setYearTo] = useState("2024");
  const [sortBy, setSortBy] = useState("Relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const searchQuery = "Dune";

  return (
    <div className="search-page">
      <Navbar />

      <main className="search-page__main">
        <div className="search-page__container">
          {/* Filter Sidebar */}
          <aside className="search-page__sidebar">
            <div className="search-page__filters">
              <h3 className="search-page__filters-title">Filter & Sort</h3>

              {/* Category Filter */}
              <div className="search-page__filter-group">
                <h4 className="search-page__filter-label">Category</h4>
                <div className="search-page__category-list">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      className={`search-page__category-btn ${
                        activeCategory === cat.id
                          ? "search-page__category-btn--active"
                          : ""
                      }`}
                      onClick={() => setActiveCategory(cat.id)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Genre Filter */}
              <div className="search-page__filter-group">
                <h4 className="search-page__filter-label">Genre</h4>
                <div className="search-page__select-wrapper">
                  <select
                    className="search-page__select"
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                  >
                    {genres.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown className="search-page__select-icon" />
                </div>
              </div>

              {/* Release Year Filter */}
              <div className="search-page__filter-group">
                <h4 className="search-page__filter-label">Release Year</h4>
                <div className="search-page__year-inputs">
                  <input
                    type="number"
                    className="search-page__input"
                    placeholder="From"
                    value={yearFrom}
                    onChange={(e) => setYearFrom(e.target.value)}
                  />
                  <span className="search-page__year-separator">-</span>
                  <input
                    type="number"
                    className="search-page__input"
                    placeholder="To"
                    value={yearTo}
                    onChange={(e) => setYearTo(e.target.value)}
                  />
                </div>
              </div>

              {/* Sort By */}
              <div className="search-page__filter-group">
                <h4 className="search-page__filter-label">Sort By</h4>
                <div className="search-page__select-wrapper">
                  <select
                    className="search-page__select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    {sortOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown className="search-page__select-icon" />
                </div>
              </div>
            </div>
          </aside>

          {/* Results Area */}
          <div className="search-page__results">
            {/* Results Header */}
            <div className="search-page__results-header">
              <h1 className="search-page__results-title">
                Results for '{searchQuery}'
              </h1>
              <p className="search-page__results-count">
                {searchResults.length} results found
              </p>
            </div>

            {/* Result Type Filters */}
            <div className="search-page__result-filters">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`chip ${
                    activeResultFilter === cat.id ? "chip--active" : ""
                  }`}
                  onClick={() => setActiveResultFilter(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Results Grid - Using Global Card Components */}
            <div className="card-grid card-grid--poster">
              {searchResults.map((item) => (
                <Link
                  key={item.id}
                  to={
                    item.type === "Actor"
                      ? `/actor/${item.id}`
                      : `/details/${item.id}`
                  }
                  className="card"
                >
                  <div
                    className="card__poster"
                    style={{ backgroundImage: `url(${item.poster})` }}
                  ></div>
                  <div className="card__info">
                    <p className="card__title">{item.title}</p>
                    <p className="card__subtitle">
                      {item.year ? `${item.year} · ` : ""}
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="search-page__pagination">
              <button className="search-page__pagination-arrow">
                <FiChevronLeft />
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className={`search-page__pagination-btn ${
                    currentPage === page
                      ? "search-page__pagination-btn--active"
                      : ""
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <span className="search-page__pagination-dots">...</span>
              <button
                className="search-page__pagination-btn"
                onClick={() => setCurrentPage(8)}
              >
                8
              </button>
              <button className="search-page__pagination-arrow">
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Search;
