import { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Browse.scss";

const filters = [
  { id: "all", label: "All" },
  { id: "genres", label: "Genres", hasDropdown: true },
  { id: "trending", label: "Trending" },
  { id: "new", label: "New Arrivals" },
  { id: "action", label: "Action" },
  { id: "scifi", label: "Sci-Fi" },
  { id: "comedy", label: "Comedy" },
  { id: "drama", label: "Drama" },
  { id: "horror", label: "Horror" },
];

const trendingNow = [
  {
    id: 1,
    title: "Cybernetic Echoes",
    genre: "Sci-Fi",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC4huZ2MfTyOETfllOvNF4QYnCn4CAB6OVWeKYjKPhcCsVEG2X1v69JpEzk6l_H84TnJSkP_bHsAjw3adb30_Ui6ej8QMp8618azI0Vce0m51JQoyZeJTXeKT9KJQNNIibS6eyXot9oNSzXV-ZXy4wS2ttNHCuH9WvMuPK62OGRBgMHFHAT0IQpxEOw9_RxmcdIzHCyCoy48f00FL7C1LXs5plZNT737iC_X2kKYh7hO2wIbTlkAHD3GVVKZidrXnRFseBPOfL4Ukye",
  },
  {
    id: 2,
    title: "Lost in the Nebula",
    genre: "Adventure",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuATNfShP8NK-mGmNftQZB8IgIfPZBsLRlECP4xzV6eFVB7-PevoCxVuURXPS-kqjs1OeEaJdYF7krVO9RVUWvbYZrmI4CmeUphaOUEh8zax5PRM6YyEfuDMZ9g56TJTha_G9alR-F3K1Pa7nhDRHvkYAeruDH-OR7fWqv4S_EXm8ED5AF2ZHygG2Qn0Gu0gErmes6xQHrzfpczFdn8qFzsihOVwhjp0HImctqoDiNt1bJCT4rPcm_dzYZVNMb5OB8FuUGlpIVZZ3680",
  },
  {
    id: 3,
    title: "The Last Alchemist",
    genre: "Fantasy",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDB_L4l9Tps0nh9l6bi7X5lFWjPchF14vDNswiY5f8vyXzpghVBgeOFAZnp_nLuri_Bq-zSena4eHk0PmcJ1f1O2HzA79YntJ1TIMIPyjyZy18BucSSW0vmIByjWwgAUEmfI_w7hTOuK1Cu_oejkxJWaxClZ5Gg6b5WjFek9anOioXiMs_6VSl-SjE133b0hC-oXjECfx1lpnhUo0Mjnq4Vd0NkIuB8jgsl0jsOTH9ROWJt8lRl0BUHZaJO8b_tRZta42vi_dpm028T",
  },
  {
    id: 4,
    title: "Project Chimera",
    genre: "Thriller",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3dG1u1bjKvRKZh6IZNttnSLKmZodiokzy2LwwYvdJS6FlTw1wD4bHLCM-9Giju1VF6KoF05akICALTPo9YJ4NENdtS8DVw2v2q1g24Fp2HLcXFIoZScHVsc3z0v2uOth7SKZFEbphXOi9fiWq0qruH8WUJxRLMm2dszHKrTTKFPFfmnWGJ1MwaVmnOlZSqTaK9DvhPa9MgTG-ac1Zu29fk5v2D0qAcF8FjplzaMxI82n33uMbKtrMusY6_XUMdsOXMmG13VEgOxwJ",
  },
  {
    id: 5,
    title: "Ocean's Whisper",
    genre: "Drama",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBTfwavdRJ05-0-Xen_AjrCZvUMdx0J7jsbFbcGl01Qf6_CaetGBcTM2OCpt0fOXn39TrmIEHJw-u6O8TSfMCh2CqIe2fWWgDV34HEcBP1r6YRgEgrddG5rdp3yJfxgjUYtAOxlYAzqB6tEun1NaZfldkEKQNA9C4kmg7nyinQwSPRNeyiWuLLHp2dJhH7e1SrfIY6uS9MPyAnPc55GKPOljE2mc_GKaKgR45FQGXKsDipBTD-XUgf_f93-NA5GOXHZU9ZuaM734sCF",
  },
  {
    id: 6,
    title: "Midnight Runner",
    genre: "Action",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC8tzGrP8cX-kjOUr7PCU6Z18RK1c9GWxKu9t9ZofWTZ_-hCfdzLNuKwq0n2YuZOAbXS7H9lVpSWPZkxBuMgwNYcePyDCtm5Hc6BXU_6EG_P5aG_jTlC-BEuMaWMgCYvmiJj079423wdKL60v--9MIYghmqZZojzvw7bD3UMmTFw_ISeaNTx0_Je81FCIYlR6OzU9l18PJNAjrVLdUzBWyhyezcijmQq4U6jzwtBs28WBuIGvqsJ7WD7J-AiUyq5MrjKet6fqVhqQap",
  },
];

const newArrivals = [
  {
    id: 7,
    title: "Neon Drifters",
    genre: "Sci-Fi",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD0fQ93pxzMofGCIM2OKAiB_1DMAVUu9GbUW811XVUxGQ4t5AUb3QXPCO4mhM_4FYwpkjVJ0q9a_i0vHdRELwT05VIa_zG4HyNKxEPr0ah_iaKQllEQym5pZUqK5PNzPMsH1MMQWI7y2zCIgqhKR3HdrVYeaUJZ6zY2PpyZmazt-yr6USss-t9EgmNpqROMbUFdHN-0T7Wv6CIy6KLWLLPc45QA8x3XsXFH6RI2JbIvhYvdi518JZZ0na5-RTzG_YSRqfikq6lypz3p",
  },
  {
    id: 8,
    title: "Solaris Rising",
    genre: "Mystery",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAIXE9RkE_rRZdm4Olnt7ptnE6bi-mpGrhlTV5oG-JimBOe2trXOCR66zQhLP_4m3QfrFJ2M3-ghmGq9ob3yoohnNB5rgTdE-HjBewtyWVEigUcQCuHxwHM1zRY1F1rQgt0tGXGuZDHyHJiV25D-hu0zjLD-Jy8OOK2XsGrge8TG_uxu1qB2ewOlsK3e55EuqUjIQrk2N12CKqG4ZX-4m6d9_JCQQAv2CoSRA12ZrgDrurgRRr0rbfUYLIgk1tIxslBDGqtz47d_rMC",
  },
  {
    id: 9,
    title: "Whispers of the Past",
    genre: "Horror",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNke29nZdIYSxi50JdnH3G2FaMcBISSFCUNjUgFiBUa2tyUKM1UBgOFbqtVUU7FzsQSNYCzJJrHFTqVAZpsdpuoQGgOq7y9Q6WmcsjIkvlrdP8X3LvtOnE5z-JFBUJRcqNNo5IsJTTKgtjXGjRP6YrW1kmJcZojwb0FR4NWuQJZCtnX9SgeLkEwuafGvk7iZcn8VnD6wvg_ZLZreBvri1hnaIp6y0TXZ3zDZztt717j30KCtYTH6q8ZP9DgOi3_VLdKzLjl95AQzJl",
  },
  {
    id: 10,
    title: "The Gilded Cage",
    genre: "Romance",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAtoxXs5LK8MKcwlNPEm99obwEhRcjlK35Vt6xsGHNlP8FEZZ1iLibONTb3g2ljHVDftFnYJw4zxoZAU51hoq1t9OsUznugjR4QrL090MCHWr2njCAl1p47cz9fK-lmjucZd7lVC1nJvohL1SHt0iM55fqn7RY4B5qtIDyUEiRFaAfYNhdz3JJRCxAKb68xdP5Y7JJ8x1mVRiRDelV95AW5ZJ4p2AVbuM-J55UcWaCwjHuuJuW1AkQ7cCMczlmb4ujcGHQySBkmacFH",
  },
  {
    id: 11,
    title: "Crimson Peak",
    genre: "Horror",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA6L2xQ3WSkHVxddOVfa94URq2mu-iSNl3SJgvl0rYkgxG8zFlxVeVhyBZ55j4KbkflhfEEyOyaTWoSLtz5e2O5prpTQrscQrkfys96VefR-r_8Scir7bJhPZCAy8jZbME9wpdLpEdCaKGRzlvFuXAHvaREE7NbS0kE8WOlcnURgnQI24EVgEoizksh_03e-HdPtRSka5uTRyzbqgREmucQ64X5EUHHJtKLaYYXwI7UrIBw8xaDA3SZjLocqU8Gc2GvnYJh69gNMV8-",
  },
  {
    id: 12,
    title: "Starlight Express",
    genre: "Adventure",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAVItfWoM5sCzOMd0HrLIyEAuh1OpJuIqyx20GC_BGS5QTpgODI-CimJRC1lJ_kBWHvo1daN4a1x7yuszSF4da-Bt-30Y9cnxTha7yD-_K4ON6F4kN1Vmxss_UGYz98xf7xX13a6QDGrTUb8VMCZjMFD2etHE1nMbgq68V42923MUVUH7gaYEeGvGIpT_06DMqq9zggusFb4IBZLyusRok7e-_21NKt4OZLlXPvJY7za9jnqABWarSmqzGiUxCp9KelBUJAc8YMbYWg",
  },
];

const actionMovies = [
  {
    id: 13,
    title: "Code Red",
    genre: "Action",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDDeQZ28bJHQ67uCLZz5Eu_CSjrhoiaQB4vUKjuNrqTb2rcnS7k3GiMbsOofrauG_6QnDRflaaxmSjsyyz2gFDGOXqN-KdgpCx83bZZqgpDySpIKTRuXHe2z0X8Hla4xjSyrDAV5xQCtIp_lRbYcG5xROHekY4XbhNLvUQFUYIDoXNuTmSIkKDvaiSS6ovUhEJ2Vn8RjVpV3gYPkIEXSxyzzHf3uF8jk9gHKEwnZZBYzVftQ5yoX5ueUst8Cl0V7v7pj9EfUE0x8m3e",
  },
  {
    id: 14,
    title: "Fury Road",
    genre: "Action",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3vdndsmOmqk7GxVrNww_EFMtFGp3DXlWdATjy34kpRzr5R7AVkLi-u8nbzHBYfLEy6vvJbHtsyzz-nWjhfkWq-Z_AqvB9p64wKgY97C9FjyU3aCSvdumATJD1lLSpuDHb0X7TmY7UkWeH2GqwSVXkx04TRyvot7PCtx2DyvLmV07Xh5bOf7S2DTGXkXmEq4fClzdCWYjEQxNXNd9hy0Xvx1QPEc22hMjSmlx-rGpBKLWvwGSqh7vde9_0rFeUQb3YCY9BJMm2yihi",
  },
  {
    id: 15,
    title: "Steel Thunder",
    genre: "Action",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuChY4WCbHZbkM8AJSpg5ctFI_sqXM5fdL9lLN4iR3LXy2fP1ebW-jxIkkS3lMbIdY7bdnm70EFC_JCnhVlMjL2Lkq7DzEunsT1i8DPAuGHvt9Q0kj2GGXGgny1LR7JfzD5PQ63HgHq_NNoV_ERg-4K5BXAIMBeCkQ2LNxmXd39DQt2e0p38DNfh0D64lsamL4QNmgdDcVreuUgtEfQdofBW4ciIFl2tcBR_CKePLOAwcv-VDPU9ZndBUCPkLxJwupJ1pMHto1keQoVA",
  },
  {
    id: 16,
    title: "Night Strike",
    genre: "Action",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCaRmq2AG-Orz8Bpyu12rGqFwM1CDoyMnFAcm038eOUDp5hf1okHWROWv0iWHVhZsPC_6cmk0Y2XMhPrd7-Qj8XRPIC7axO-g5s8tNcW7o7jBZ6Sp6dIpMvqJSubKWckENbPXh7r8FSGiXDVfAztp17h7t_9Z81fvQMMQE9S2IlLvwQRUoz3_8dh2HN9xZNE39VrnTf2DISVXNIFuUHxWMlO0FozGMAQpDC_oOSBrqZLOY3UZFNIywKQgKq7-CWa58s1L_jGWj_N7eI",
  },
  {
    id: 17,
    title: "Zero Hour",
    genre: "Action",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXt-GOBfJ0SXsDBsp0cTKXNt1RQ-THcZsr91vlc7Tz4cgpiQjQFC72-_x09SrROOunz7PPB29B7EgSaOQwDgBISpg0D-mPd6SLTAZpfkW1YLEkaUniz6rkCZpZs31gyAgm99O4tdQxbTOmtmmsjf_3qIer6XfedFuqmAnARR5YjjDIkTr3V72ShMTBV0-OB18XTY-glCVi8XJT7DJD3IKU8UXCrK0vqCfMrBFgJn1VTZo-vrtpV1l4mjH9NXhCsvDZsSKwoqzoV-ZA",
  },
  {
    id: 18,
    title: "Shadow Ops",
    genre: "Action",
    poster:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCVnU9wlkDKnHKBboRR23TdxS71Xnm2KzLn4Hjr_SmaVqz7N29tQfQDNCfgVEQTyrEkKShCw10j7-30EWT3AZjeXn24fBa4f78z47VlCWEUnuWkfnxlT3EAvZaPVnBWofv6xVDBkSZpzeeWYGI2pWL7VoJqOgjYjcZ9sTEKG1ew4nAJACVtFJZgXTO4rNq5nFZnNHdlKeTajiycew_jU-L1EDjWISWQn1IrOyuNCxnYI9RToDodnqiMoaagIAOc-16zrd6WCRvUVRjg",
  },
];

const Browse = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="browse">
      <Navbar />
      <main className="browse__main">
        <div className="browse__header">
          <h1 className="browse__title">Browse & Explore</h1>
        </div>
        <div className="browse__filters hide-scrollbar">
          {filters.map((filter) => (
            <button key={filter.id} className={`chip ${activeFilter === filter.id ? "chip--active" : ""}`} onClick={() => setActiveFilter(filter.id)}>
              <span>{filter.label}</span>
              {filter.hasDropdown && <FiChevronDown />}
            </button>
          ))}
        </div>
        <div className="browse__sections">
          <section className="browse__section">
            <h2 className="browse__section-title">Trending Now</h2>
            <div className="card-grid card-grid--poster">
              {trendingNow.map((item) => (
                <Link key={item.id} to={`/details/${item.id}`} className="card">
                  <div className="card__poster" style={{ backgroundImage: `url(${item.poster})` }}></div>
                  <div className="card__info">
                    <p className="card__title">{item.title}</p>
                    <p className="card__subtitle">{item.genre}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          <section className="browse__section">
            <h2 className="browse__section-title">New Arrivals</h2>
            <div className="card-grid card-grid--poster">
              {newArrivals.map((item) => (
                <Link key={item.id} to={`/details/${item.id}`} className="card">
                  <div className="card__poster" style={{ backgroundImage: `url(${item.poster})` }}></div>
                  <div className="card__info">
                    <p className="card__title">{item.title}</p>
                    <p className="card__subtitle">{item.genre}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          <section className="browse__section">
            <h2 className="browse__section-title">Action Movies</h2>
            <div className="card-grid card-grid--poster">
              {actionMovies.map((item) => (
                <Link key={item.id} to={`/details/${item.id}`} className="card">
                  <div className="card__poster" style={{ backgroundImage: `url(${item.poster})` }}></div>
                  <div className="card__info">
                    <p className="card__title">{item.title}</p>
                    <p className="card__subtitle">{item.genre}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Browse;
