import { useState } from "react";
import { Link } from "react-router-dom";
import { FiPlay, FiPlus } from "react-icons/fi";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./TVShows.scss";

const genres = [
  { id: "all", label: "All TV Shows" },
  { id: "comedy", label: "Comedy" },
  { id: "drama", label: "Drama" },
  { id: "scifi", label: "Sci-Fi" },
  { id: "thriller", label: "Thriller" },
  { id: "documentary", label: "Documentary" },
  { id: "animation", label: "Animation" },
  { id: "fantasy", label: "Fantasy" },
];

const heroContent = {
  title: "Latest Season of 'Galactic Empires' Now Streaming",
  description:
    "The saga continues as new alliances are forged and old rivalries ignite across the cosmos. Don't miss the epic next chapter.",
  backdrop:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD_1gHKqFhXYuh5vMSYChDlLGPQiE9H7tCUzMo3uWmQnD2q0MCyxa0BHQd-7Xu1awRqWADduWR52Jyi_WdwFLiTfLj5L2qO29QnlEK1FBpqqBr2LWqG3gZCtkllXzWEo48QmKLgAVJj4XXTjFCILXDgGvxhyI2MCoLoy762cT0AGkqjg-AgUpbsBc4OdKPGHejIK9xsHvA9bUh02oFU1B8ViRdsPCZ970grMS_820Lt9tLYO97ysi1bGp8ohjoERQHWz2gODoSccLmo",
};

const continueWatching = [
  {
    id: 1,
    title: "Cybernetic Dawn",
    subtitle: "S2 E4",
    progress: 66,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDGwURLA8WU3gFTxZ2xOM8dpCk3bOpkid5M1I8xxHbZbn0btsfgw-brGYKKe9djtRU7lOvUwyRdz3zGMvN1hO5oBGB_N_E-z9j1_gtQNOF_QvuPShUF8LSsau6i14IWf6lfYDUiAcOWKN2BKbyTQemBP-ZN30yGR-Rb6lHmQpItkkwipNQJM-OHPoVgJli9JfSYcZ11kGqbjpRaqALq_XFv8AWJuY46fmN4OAnJ3IYqg0gwhnwXPIC3ouVqrrdXqCA1jMnJMIVFWNet",
  },
  {
    id: 2,
    title: "The Office Job",
    subtitle: "S1 E8",
    progress: 25,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBRO6FHdx15KLo9Mnav-R3k9gcevbDNU6wvTkxv-9kVisey65lmTChDiFdiM30LvvJeCm_7mAOvkqlRvNERzzeivFkd4wuTUi3GTmS-8yS_RqpJa58wAsmdlU24xdXvYvU58yu5g9zYQ3jCq3R4UF_96oKrXaiukytTsjGfzrs2DJGNQCIn2cBU5k0SzJBWmAWBB32WBnURaNokWAmlRNcRLefAuzp6fKU0qWyqPU4x8uFV5sqaM3974YNoGNeBO7jpFV9bRglHGz4c",
  },
  {
    id: 3,
    title: "Crown of Thorns",
    subtitle: "S3 E1",
    progress: 50,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAv0HhPWs5eFfk2mgQjMpmQYsN-ZCfhg0v-iLAcws7m95vgKmbr1CTX0ilvTLwEjsKnWkE1zsklESq9-xAV7o68GnEe8VvLmY0fWyTL-XPr6XdqgQN8z9ZOSkOb3Ydpsyzhq3HT-iR0iC-YHTWEzOK1OvplEdxU51Z4lXb-yih50K5G5a7a0nQn-9-Y2J06khRBVwE-1-nobIuR3RrZ7UJw3FNqhV20uxPRLdP0BAqMLISIVXD3GhNeVftkhT8Glmi1mglsxK4QrTgZ",
  },
  {
    id: 4,
    title: "Culinary Journeys",
    subtitle: "S1 E2",
    progress: 75,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAzAH7MO0k2FYERa1XVZSVxLR1splvAnaNxyNN7YAY_EHbsMQO0ESMmNJd-Tz3beIrdl5ELeGqsEKofIZNHT43h4EgNYHEdGy1UdvarMgeIvwV9uqMXzuODTgR-3sbRmlG9IzISIOhsihBhMR_OJJb7KgAUrACJhMGRGKF7croVLrJtMzCCQjZQf0JFA72DaZXcqM0qkUF_JWO13a1Jl70eE2BnZbTffWGDdXGcAa1Gil3KPnXXt79evtP8J2sV2ZJ2WTNhuEbZpf5R",
  },
];

const trendingNow = [
  {
    id: 1,
    title: "Neon Knights",
    genre: "Sci-Fi",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuATNfShP8NK-mGmNftQZB8IgIfPZBsLRlECP4xzV6eFVB7-PevoCxVuURXPS-kqjs1OeEaJdYF7krVO9RVUWvbYZrmI4CmeUphaOUEh8zax5PRM6YyEfuDMZ9g56TJTha_G9alR-F3K1Pa7nhDRHvkYAeruDH-OR7fWqv4S_EXm8ED5AF2ZHygG2Qn0Gu0gErmes6xQHrzfpczFdn8qFzsihOVwhjp0HImctqoDiNt1bJCT4rPcm_dzYZVNMb5OB8FuUGlpIVZZ3680",
  },
  {
    id: 2,
    title: "The Last Kingdom",
    genre: "Historical Drama",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDB_L4l9Tps0nh9l6bi7X5lFWjPchF14vDNswiY5f8vyXzpghVBgeOFAZnp_nLuri_Bq-zSena4eHk0PmcJ1f1O2HzA79YntJ1TIMIPyjyZy18BucSSW0vmIByjWwgAUEmfI_w7hTOuK1Cu_oejkxJWaxClZ5Gg6b5WjFek9anOioXiMs_6VSl-SjE133b0hC-oXjECfx1lpnhUo0Mjnq4Vd0NkIuB8jgsl0jsOTH9ROWJt8lRl0BUHZaJO8b_tRZta42vi_dpm028T",
  },
  {
    id: 3,
    title: "City of Spies",
    genre: "Thriller",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3dG1u1bjKvRKZh6IZNttnSLKmZodiokzy2LwwYvdJS6FlTw1wD4bHLCM-9Giju1VF6KoF05akICALTPo9YJ4NENdtS8DVw2v2q1g24Fp2HLcXFIoZScHVsc3z0v2uOth7SKZFEbphXOi9fiWq0qruH8WUJxRLMm2dszHKrTTKFPFfmnWGJ1MwaVmnOlZSqTaK9DvhPa9MgTG-ac1Zu29fk5v2D0qAcF8FjplzaMxI82n33uMbKtrMusY6_XUMdsOXMmG13VEgOxwJ",
  },
  {
    id: 4,
    title: "The Laugh Factory",
    genre: "Comedy",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBTfwavdRJ05-0-Xen_AjrCZvUMdx0J7jsbFbcGl01Qf6_CaetGBcTM2OCpt0fOXn39TrmIEHJw-u6O8TSfMCh2CqIe2fWWgDV34HEcBP1r6YRgEgrddG5rdp3yJfxgjUYtAOxlYAzqB6tEun1NaZfldkEKQNA9C4kmg7nyinQwSPRNeyiWuLLHp2dJhH7e1SrfIY6uS9MPyAnPc55GKPOljE2mc_GKaKgR45FQGXKsDipBTD-XUgf_f93-NA5GOXHZU9ZuaM734sCF",
  },
  {
    id: 5,
    title: "Wild Planet",
    genre: "Documentary",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD0fQ93pxzMofGCIM2OKAiB_1DMAVUu9GbUW811XVUxGQ4t5AUb3QXPCO4mhM_4FYwpkjVJ0q9a_i0vHdRELwT05VIa_zG4HyNKxEPr0ah_iaKQllEQym5pZUqK5PNzPMsH1MMQWI7y2zCIgqhKR3HdrVYeaUJZ6zY2PpyZmazt-yr6USss-t9EgmNpqROMbUFdHN-0T7Wv6CIy6KLWLLPc45QA8x3XsXFH6RI2JbIvhYvdi518JZZ0na5-RTzG_YSRqfikq6lypz3p",
  },
  {
    id: 6,
    title: "Starfall",
    genre: "Animation",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAIXE9RkE_rRZdm4Olnt7ptnE6bi-mpGrhlTV5oG-JimBOe2trXOCR66zQhLP_4m3QfrFJ2M3-ghmGq9ob3yoohnNB5rgTdE-HjBewtyWVEigUcQCuHxwHM1zRY1F1rQgt0tGXGuZDHyHJiV25D-hu0zjLD-Jy8OOK2XsGrge8TG_uxu1qB2ewOlsK3e55EuqUjIQrk2N12CKqG4ZX-4m6d9_JCQQAv2CoSRA12ZrgDrurgRRr0rbfUYLIgk1tIxslBDGqtz47d_rMC",
  },
];

const newSeries = [
  {
    id: 7,
    title: "Echoes of the Void",
    genre: "Mystery",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNke29nZdIYSxi50JdnH3G2FaMcBISSFCUNjUgFiBUa2tyUKM1UBgOFbqtVUU7FzsQSNYCzJJrHFTqVAZpsdpuoQGgOq7y9Q6WmcsjIkvlrdP8X3LvtOnE5z-JFBUJRcqNNo5IsJTTKgtjXGjRP6YrW1kmJcZojwb0FR4NWuQJZCtnX9SgeLkEwuafGvk7iZcn8VnD6wvg_ZLZreBvri1hnaIp6y0TXZ3zDZztt717j30KCtYTH6q8ZP9DgOi3_VLdKzLjl95AQzJl",
  },
  {
    id: 8,
    title: "Sunflower Fields",
    genre: "Romance",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAtoxXs5LK8MKcwlNPEm99obwEhRcjlK35Vt6xsGHNlP8FEZZ1iLibONTb3g2ljHVDftFnYJw4zxoZAU51hoq1t9OsUznugjR4QrL090MCHWr2njCAl1p47cz9fK-lmjucZd7lVC1nJvohL1SHt0iM55fqn7RY4B5qtIDyUEiRFaAfYNhdz3JJRCxAKb68xdP5Y7JJ8x1mVRiRDelV95AW5ZJ4p2AVbuM-J55UcWaCwjHuuJuW1AkQ7cCMczlmb4ujcGHQySBkmacFH",
  },
  {
    id: 9,
    title: "Automata",
    genre: "Sci-Fi",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA6L2xQ3WSkHVxddOVfa94URq2mu-iSNl3SJgvl0rYkgxG8zFlxVeVhyBZ55j4KbkflhfEEyOyaTWoSLtz5e2O5prpTQrscQrkfys96VefR-r_8Scir7bJhPZCAy8jZbME9wpdLpEdCaKGRzlvFuXAHvaREE7NbS0kE8WOlcnURgnQI24EVgEoizksh_03e-HdPtRSka5uTRyzbqgREmucQ64X5EUHHJtKLaYYXwI7UrIBw8xaDA3SZjLocqU8Gc2GvnYJh69gNMV8-",
  },
  {
    id: 10,
    title: "The Heist",
    genre: "Action",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDDeQZ28bJHQ67uCLZz5Eu_CSjrhoiaQB4vUKjuNrqTb2rcnS7k3GiMbsOofrauG_6QnDRflaaxmSjsyyz2gFDGOXqN-KdgpCx83bZZqgpDySpIKTRuXHe2z0X8Hla4xjSyrDAV5xQCtIp_lRbYcG5xROHekY4XbhNLvUQFUYIDoXNuTmSIkKDvaiSS6ovUhEJ2Vn8RjVpV3gYPkIEXSxyzzHf3uF8jk9gHKEwnZZBYzVftQ5yoX5ueUst8Cl0V7v7pj9EfUE0x8m3e",
  },
  {
    id: 11,
    title: "Mythic Realms",
    genre: "Fantasy",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3vdndsmOmqk7GxVrNww_EFMtFGp3DXlWdATjy34kpRzr5R7AVkLi-u8nbzHBYfLEy6vvJbHtsyzz-nWjhfkWq-Z_AqvB9p64wKgY97C9FjyU3aCSvdumATJD1lLSpuDHb0X7TmY7UkWeH2GqwSVXkx04TRyvot7PCtx2DyvLmV07Xh5bOf7S2DTGXkXmEq4fClzdCWYjEQxNXNd9hy0Xvx1QPEc22hMjSmlx-rGpBKLWvwGSqh7vde9_0rFeUQb3YCY9BJMm2yihi",
  },
  {
    id: 12,
    title: "The Interrogation",
    genre: "Crime",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuChY4WCbHZbkM8AJSpg5ctFI_sqXM5fdL9lLN4iR3LXy2fP1ebW-jxIkkS3lMbIdY7bdnm70EFC_JCnhVlMjL2Lkq7DzEunsT1i8DPAuGHvt9Q0kj2GGXGgny1LR7JfzD5PQ63HgHq_NNoV_ERg-4K5BXAIMBeCkQ2LNxmXd39DQt2e0p38DNfh0D64lsamL4QNmgdDcVreuUgtEfQdofBW4ciIFl2tcBR_CKePLOAwcv-VDPU9ZndBUCPkLxJwupJ1pMHto1keQoVA",
  },
];

const TVShows = () => {
  const [activeGenre, setActiveGenre] = useState("all");

  return (
    <div className="tvshows">
      <Navbar />

      <main className="tvshows__main">
        {/* Hero Section */}
        <section className="tvshows__hero-section">
          <div
            className="tvshows__hero"
            style={{ backgroundImage: `url(${heroContent.backdrop})` }}
          >
            <div className="tvshows__hero-content">
              <h1 className="tvshows__hero-title">{heroContent.title}</h1>
              <p className="tvshows__hero-description">{heroContent.description}</p>
              <div className="tvshows__hero-actions">
                <button className="btn btn--lg btn--primary">
                  <FiPlay />
                  <span>Watch Now</span>
                </button>
                <button className="btn btn--lg btn--secondary">
                  <FiPlus />
                  <span>Add to List</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Genre Filters */}
        <section className="tvshows__filters hide-scrollbar">
          {genres.map((genre) => (
            <button
              key={genre.id}
              className={`chip ${activeGenre === genre.id ? "chip--active" : ""}`}
              onClick={() => setActiveGenre(genre.id)}
            >
              {genre.label}
            </button>
          ))}
        </section>

        {/* Content Sections */}
        <div className="tvshows__sections">
          {/* Continue Watching */}
          <section className="tvshows__section">
            <h2 className="tvshows__section-title">Continue Watching</h2>
            <div className="tvshows__content-padding">
              <div className="card-grid card-grid--wide">
                {continueWatching.map((show) => (
                  <Link key={show.id} to={`/watch/${show.id}`} className="card">
                    <div className="card__image-wrapper card__image-wrapper--wide">
                      <div
                        className="card__image"
                        style={{ backgroundImage: `url(${show.image})` }}
                      ></div>
                      <div className="card__gradient"></div>
                      <div className="card__overlay">
                        <span className="card__play-icon">play_circle</span>
                      </div>
                      <div className="card__progress">
                        <div
                          className="card__progress-bar"
                          style={{ width: `${show.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="card__info">
                      <p className="card__title">{show.title}</p>
                      <p className="card__subtitle">{show.subtitle}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Trending Now */}
          <section className="tvshows__section">
            <h2 className="tvshows__section-title">Trending Now</h2>
            <div className="tvshows__content-padding">
              <div className="card-grid card-grid--poster">
                {trendingNow.map((show) => (
                  <Link key={show.id} to={`/details/${show.id}`} className="card">
                    <div
                      className="card__poster"
                      style={{ backgroundImage: `url(${show.poster})` }}
                    ></div>
                    <div className="card__info">
                      <p className="card__title">{show.title}</p>
                      <p className="card__subtitle">{show.genre}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* New Series */}
          <section className="tvshows__section">
            <h2 className="tvshows__section-title">New Series</h2>
            <div className="tvshows__content-padding">
              <div className="card-grid card-grid--poster">
                {newSeries.map((show) => (
                  <Link key={show.id} to={`/details/${show.id}`} className="card">
                    <div
                      className="card__poster"
                      style={{ backgroundImage: `url(${show.poster})` }}
                    ></div>
                    <div className="card__info">
                      <p className="card__title">{show.title}</p>
                      <p className="card__subtitle">{show.genre}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TVShows;

