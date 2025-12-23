import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FiPlay } from "react-icons/fi";
import "./Watch.scss";

const videoData = {
  id: 1,
  title: "Cosmic Odyssey",
  episode: "Season 2, Episode 5: The Discovery",
  synopsis:
    "A brief, expandable synopsis of the episode or movie being watched, providing context without distracting from the main viewing experience. The crew of the starship Voyager stumbles upon an ancient artifact that holds the key to a lost civilization, but activating it could unleash an unimaginable power across the galaxy.",
  thumbnail:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA5z5zoTrt_yOmZ8hfoWLeqmUiOAtqtiYC744kQZGRvvV42hE1frZa9f1Tb_-oA9JCb2YiUGlYVpU2u5_LzvQlNkKtzY2unAEmx470y2bgjsr6m57h1RO7irgfOcH0HhNrTFTT38phDn375H6jpOU9Zs50qL1Xd7alB_BlYFEaEQDvLWaMyNtQqSsTZRdIWfJAYyffldGpOTRMGQFthMCSPktO4xBqiWE3Ij9BRp4jcn0lBW_oIISJiEKosE-uwengSU0POPPqPYagb",
  currentTime: "0:37",
  duration: "2:23",
  progress: 25,
};

const episodes = [
  {
    id: 4,
    number: "E4",
    title: "The Anomaly",
    description: "A strange energy signature lures the ship off course.",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBS3PB5_AnTXRqmP1TGKJ2gFAWoAZ-nll0Fqr_h7quBIKVC69NI0jKFDDVsP6nCF7JucIyOQJoUwL7gE0tNAO_tx-YKlRheTZz2ZhTNoZxTRs05uhLI-kMAz9eidt73LNsi_G_t8bSIfuGCuvplZTr3QKAcSdXlnlwTUFQ7_w1vlNaMV5Lj_Ny5wVaDMgkEpEBzCLDij9zQFaCJcRGS4Y4zNStLd4AI2F_mXz8a5-Oiyo-DOUs5yZCTLYc_H6MzXwd5omJSf86h-fz3",
    isCurrent: false,
  },
  {
    id: 5,
    number: "E5",
    title: "The Discovery",
    description: "The crew uncovers a powerful, ancient artifact.",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCDkHu6sLWF0LBOXITH7ZuWER_KHETklUb2B80-QUlywjDTu-RWrC2SWouoz7PLBftqRKmrim5WekFBt7GeldY8zzLo43jfJJP34g0sFokd-Oa3LF_eb77krlwyJ9_8BI_KDEfNFKPehnknYCX9LkwC34WNiPAEjUAN_qPQXHymvJrCLs5nzWtRccxY3y4YKretK6wMCWZY_tQPT8IwMC8O8ho3QtvIQmBkMCB3i9RpVvkX8Ef0WFu_z9Nu46haAVtORN55EpC0pETt",
    isCurrent: true,
  },
  {
    id: 6,
    number: "E6",
    title: "First Contact",
    description: "A diplomatic mission takes an unexpected turn.",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWKGLgf7iZECrYzQUWaHQ0f8vSzSyXFdaIxQFY_d88aDVu3EFuzZR-EhOFe9R4c5u_nTdA0bMbsYqoZ3oqHRrYgQiGpFPmyyB0_SZ_dxO_YuJaJRrLW81TFzxoSY32o8ulTIS7-4JhyT7hRjsujtSWuVYpdtTd63yCKUVcnqy_AVouYgdKvvPMrk5W6e5TS5wVrSGPlVesbQY1eBKmamganZpgUjdWkfq4R-5uwKKYHFSzXeow5gr4q5ufkdBCnrYCx8n_YUJ4g4mK",
    isCurrent: false,
  },
  {
    id: 7,
    number: "E7",
    title: "The Void",
    description: "The ship becomes stranded in a region of empty space.",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBC9PFhUBaW7rzOBEaGDI7qdyezCIyJAtsaUTKCmtEMXYfpfEUdBeES_SwZG4M1VKOLNlQEcN7Xw21TLVc0WXHqgZwwo6g8dKGJbE_C2UXexTb8p2fjc4_Tr1Rk9vDT2KxMb71P1mWJ7KFRYDIx9xw9-lrqEdgMs-EOjI389BrTJr2ggb8U8UVW0xs73N5eFBdtQPlP-26DjLK49gD0j7jiqPy4jl1j1WrqPW9MtBfBU5PmZCxFVnSCmwHloF3-TcinlTIWUZ3FipoT",
    isCurrent: false,
  },
];

const Watch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="watch">
      <div className="watch__container">
        {/* Header */}
        <header className="watch__header">
          <Link to="/home" className="watch__logo">
            <svg
              className="watch__logo-icon"
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
            <span className="watch__logo-text">Cineverse</span>
          </Link>
          <button className="btn btn--md btn--primary" onClick={handleBack}>
            Back
          </button>
        </header>

        {/* Main Content */}
        <main className="watch__main">
          {/* Video Player */}
          <div
            className="watch__player"
            style={{ backgroundImage: `url(${videoData.thumbnail})` }}
          >
            <button
              className="watch__play-btn"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <span className="material-symbols-outlined">play_arrow</span>
            </button>

            {/* Progress Bar */}
            <div className="watch__controls">
              <span className="watch__time">{videoData.currentTime}</span>
              <div className="watch__progress">
                <div className="watch__progress-track">
                  <div
                    className="watch__progress-fill"
                    style={{ width: `${videoData.progress}%` }}
                  ></div>
                  <div
                    className="watch__progress-thumb"
                    style={{ left: `${videoData.progress}%` }}
                  ></div>
                </div>
              </div>
              <span className="watch__time">{videoData.duration}</span>
            </div>
          </div>

          {/* Video Info */}
          <div className="watch__info">
            <h1 className="watch__title">{videoData.title}</h1>
            <p className="watch__episode">{videoData.episode}</p>
          </div>

          {/* Synopsis */}
          <p className="watch__synopsis">{videoData.synopsis}</p>

          {/* Divider */}
          <div className="watch__divider"></div>

          {/* Episodes Section */}
          <section className="watch__episodes">
            <h3 className="watch__episodes-title">Episodes</h3>
            <div className="watch__episodes-list hide-scrollbar">
              {episodes.map((episode) => (
                <div
                  key={episode.id}
                  className={`watch__episode-card ${
                    episode.isCurrent ? "watch__episode-card--current" : ""
                  }`}
                >
                  <div
                    className="watch__episode-thumbnail"
                    style={{ backgroundImage: `url(${episode.thumbnail})` }}
                  >
                    {episode.isCurrent && (
                      <div className="watch__episode-overlay">
                        <span className="material-symbols-outlined">
                          play_circle
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="watch__episode-info">
                    <p
                      className={`watch__episode-name ${
                        episode.isCurrent ? "watch__episode-name--current" : ""
                      }`}
                    >
                      {episode.number}: {episode.title}
                    </p>
                    <p className="watch__episode-desc">{episode.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Watch;
