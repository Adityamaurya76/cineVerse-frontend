import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown, FiPlay } from "react-icons/fi";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Loader from "../../components/Loader/Loader";
import "./Browse.scss";
import { useDispatch, useSelector } from "react-redux";
import { browseList } from "../../components/Redux/slices/browseSlice";

const Browse = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.browse);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    dispatch(browseList());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <div className="browse__error">Error: {error}</div>;
  if (!data || !data.statusCode || !data.statusCode.data) return null;

  const { filters, sections } = data.statusCode.data;

  // Prepare filter chips
  const dynamicFilters = [
    { id: "all", label: "All" },
    { id: "trending", label: "Trending" },
    { id: "new", label: "New Arrivals" },
    ...(filters?.genres?.map(genre => ({
      id: genre.toLowerCase().replace(/[^a-z0-9]/g, ''),
      label: genre
    })) || [])
  ];

  const filteredSections = sections
    .filter(section => section.items.length > 0)
    .filter(section => activeFilter === "all" || section.key === activeFilter);

  return (
    <div className="browse">
      <Navbar />
      <main className="browse__main">
        <div className="browse__header">
          <h1 className="browse__title">Browse & Explore</h1>
        </div>
        <div className="browse__filters hide-scrollbar">
          {dynamicFilters.map((filter) => (
            <button key={filter.id} className={`chip ${activeFilter === filter.id ? "chip--active" : ""}`} onClick={() => setActiveFilter(filter.id)}>
              <span>{filter.label}</span>
              {filter.hasDropdown && <FiChevronDown />}
            </button>
          ))}
        </div>
        <div className="browse__sections">
          {filteredSections.map((section) => (
            <section key={section.key} className="browse__section" id={section.key}>
              <div className="browse__section-header">
                <h2 className="browse__section-title">{section.title}</h2>
                {section.items.length > 5 && (
                  <Link to={`/category/${section.key}`} className="browse__view-all">View All</Link>
                )}
              </div>
              <div className="card-grid card-grid--poster">
                {section.items.map((item) => (
                  <Link key={item._id} to={`/details/${item._id}`} className="card">
                    <div className="card__image-wrapper card__image-wrapper--poster">
                      <div className="card__image" style={{ backgroundImage: `url(${item.thumbnail?.url})`}}></div>
                      <div className="card__gradient"></div>
                      <div className="card__overlay">
                        <FiPlay className="card__play-icon" />
                      </div>
                      {/* {item.isPremium && (
                        <div className="card__badge card__badge--premium">
                          <span>PRO</span>
                        </div>
                      )} */}
                    </div>
                    <div className="card__info">
                      <p className="card__title">{item.title}</p>
                      <p className="card__subtitle">{item.category?.name || item.type}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
          {filteredSections.length === 0 && (
            <div className="browse__no-results">
              <p>No titles found for this selection.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Browse;
