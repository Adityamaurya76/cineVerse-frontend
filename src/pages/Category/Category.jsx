import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { MdMovieFilter } from "react-icons/md";
import "./Category.scss";

const navItems = [
  { label: "Home", path: "/home" },
  { label: "Movies", path: "/movies" },
  { label: "Shows", path: "/tv-shows" },
];

const categories = [
  {
    id: 1,
    name: "Action",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbFnyMbUT6NL9G8xpiZcZnN9M9n101A4POwgIwRScppblRrP2b6lh_-cF2p74Cg0leMO1aLLKPLAML5B4EWpZSAlcG7JJfPOnN7v7o3MaB2GtCBDXVVcEfg1DOu_DmwlkARatasL73rvhpgbJwXHhdv8Jc_p-pWUGd3Wx2cImlws-am2Wpj5lwlXFXhUKuZNiGFdfouLUgcE9Xktc11xHvSJ6m46CvDMzXgma9hPwgYwz4_9TB2vOIlIdWa2MXQ633dz9gu2FZ31W9",
  },
  {
    id: 2,
    name: "Comedy",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA1-QRv3JOCEPDaDYms8oJl1SwE7JU-NqZfLgBCG_d-olUf41XAkj5xY5xOI8O68iNS8apcUzJrrzLvOZ-lQiX-5TCL01R8DndckHbFzKs03OxhTnLK87tQwzcuXu730PQrwuq_rmX-SWwhUTPMGkTVjvRJVFE96El5tZ8-wdhiS0SD7ctwHtCDMuTSU329h4LX_CrIZlMtcZjaPsmuD1FKOtBKR2JIHcWL_npMmnSc_XvINOK4yLhE3948K9AH6pK0gA0SXMVYz0-v",
  },
  {
    id: 3,
    name: "Drama",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCbNMQQNca5_q79Y9_fAqUJt7ZJPITT6pKplSI9DCHy0e-I28t-TXGizpCnZG62uAUQOeGjiUv7wjghecO-pRMXeJFI81C5Z6qeElWe3iBLG_Pwsob6OWqsB5_Fuz82ty0LA_VzJF-zewoy74vHcQIKApVwLxosZ2H6dN1pl1t5_7OAifum215W0K-8izbw-xpq96RJF_I7qz3V7mtwQloofZdzf6Q4Bq-H0HcDxVI49Km5u6uEwq3VLszj4sD00XcOznsD6H_7sinj",
  },
  {
    id: 4,
    name: "Sci-Fi",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDvVS9xImHiraxgtFOuK-qgI6AP7dwlGO1TEO9zrj7triHFjx8OIAxbV8nq3xr4aogfr4hHw3oMsDK73uB37o14hwtGQ2IGOPEpdpqKaN7KgFoy_vhSW1UvJCqFvucRbC9OlL4muzaGTfeuh0vcvSddKRpT7o0LfwU7n0vhIP-h256-f-ClvCpPalQMH7cRHTAYTNImZensHvQsWW0p6Yz6r9fZsDrQ79UXxVQAwfxchEuSK4RhXL9bn9tHeTlaaGggOLKYFNsBj_0r",
  },
  {
    id: 5,
    name: "Horror",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDvMxhUB-GjEHDYcfntwq6cL5MFv1isxf0GSuobftYQazcaQnnqp07vwmIwUmdueQoLh9gr9gGEjjhrA5nERRNtuhvSAmge_2AIKTLt_qwfv7cdaKbxaHnPqM_qBs-MoWsQpHDfmYfstjKkN6MyYtpb8aOXxN9npzGFigeRxx9zoQT3ThYjtI6wiNBRp8lob5lVuxOeR2sFoqJGGC-Z8JA87nBjzZb3gQbuqKiBy3UpzOSsNA0zU62fPxTsyY0-RBSVHQ8wBlJQBrjA",
  },
  {
    id: 6,
    name: "Thriller",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBV8tmBkQPPa0BiTPEifN7l8_1jEcyaCC4-h1c_Mhc9ciyqFdLaglsnbMAlMhlHINrecRM4HVsGEnWnP18-u-A2T5HK5Ue67lwpXlpeXG1eKW4ws7YDYmDVAYDoSvsP8r2yDpnnrCv3jD0iiN8YJp34wysK6FkBCvRMGIwoBIVXAw-mdNOfnC2N6DqVLMXuQwJhqQGL0f7hsju2dsqYUwq4OeMBQwrx-5deH-aFg0I2oDJfQbu5vNp1-7I6Zc3hb_yUCav815Dv0-Ff",
  },
  {
    id: 7,
    name: "Romance",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBilg7AZnyFVNcSI18Pb31HiqLsJZHavghOm1GKd3uHVItJKq68Tfe5gfe5EDkBSlPaI74IpTDet5o6dYB_suyVkGfQBoc1MLDdl4SGjH7Sm3wTCROv3MgLC4LK8z1D9Wlfg46xjpciIpOLO1zVR-iijxlgbKbn-Rmz23x3CYv9fQ9oTiCboCqpJQsS7FUtQFiWTAr7Ycmfo_MZWo7lULnYh5YqAUi5DyBMyjEHEJ8p7yMIbvDakQUXGH5B53cKvp6txXKUWL0fpAWd",
  },
  {
    id: 8,
    name: "Documentaries",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCca38voyJFEmM0uampuROh6PEvtBzHHzX7sccsBbrQs8_YuTiW7vTG7Ju7HO_lEmddwGMT25IERqD8CFZnVq2ikopvO4NKbg1okeoKem6a222F4jjOg-Sm5Vi8JSAb5EbcOkzYXdw40lzwyeTAZwGF4ks2fP_aLzgafkXNqQM52xLfo7H10jyKXXPbyEqI16kBwWVFy6EpRVR8Hol75fsh6B04H8WTVWJw3bNxR26ri3v70PeE48O28MIBxa8b2fTei0LqZkM7FyIY",
  },
  {
    id: 9,
    name: "Anime",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC4Ll-tgfRsOhAcZGWGk6iOYz2bodfAc2AhUr18n39HZ0oN2R5sWw-yhrEEw-V35j-_u2AqpXsJZeKSONZENIlV_ShQA5IXWbDmTmbJDGvKjQz_G__9iZ-8XzOYmm1r6VQpAnxAfZlwzhzFogAeHaT9ZER8vSULdbXzFHlLA9FMQcOTMXq4I2arjCVWEvalD8ZawPxCBGyMeFpexaEPzMUAR4-LElR1gJbWUuLirgKgaRm4eRTSKd8D8oQdX0qJz9_Nnr1zkvBgGZ6l",
  },
  {
    id: 10,
    name: "CineVerse Originals",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBbhJRlZefKK0DSFOxO34pPAaLeg4wJZGtQ0YUpF3YAont_5El0mia7602MdhGYtOAT9hZ6Eebj12cPD6yLSeqyuCrL6wY5xQzittD8vCyhmXVaxCYxRCfCwpdTFrmLxGyVqZqDWO_Do2yGOLfj2pgQYGYbVPXiAugVWNgK6mMYYcQMrX7pxvZH3O0WSgVaWAHKhjr2wmj6hRjIFlrlpt7Gh5WejtjfD2WxviqpzjeKoapneJpKvnFarrkSfcvW6muM4c4l18V-4O8T",
  },
  {
    id: 11,
    name: "Trending Now",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCxsSgsjEjFTlXtfxU_d0OvtoMeTmAJbaMMyTrakKUi3GxjGOEvAmbjgpRc0sSPf6TtdvtIv8k-hSpf1-EOIZAm9hUWwL0ML2AXtEV5ltpCAT4vNfxGI2Jw2F7a6Z0UbRf4KRuBrXWZVM4KVRkGhrL62Dkjs8cSNiGAUIfmIYlvbx2bnCJzUmyRUe7-FOEfk3jXkrNIN731l3i7P-F66U-QJaiCzHOJSQDFUSwCqNApHypPNJ0Hdyv0FkvqYvlw76EyaGGj15tz2ecd",
  },
  {
    id: 12,
    name: "New Releases",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC3piJY3t6Cbv0JBkYLf1Ge7mIpHvm78RB17t4KbvbsQgRiyKdwlEkRZbhQnbw0JTJHPvrpaCJ6-ZlSOgOyUhG-X4jUFi30FQZV5t8JftdIkbR4vvBgSrgWkjttns8ghrQ6iqOVIDgkZOl0aKvbyE8IVF9aPzOO4ERA27i--CPhCCH-E0Q5NZRIedc4Z7Li9nrK3HSu56jOBC5Uv1b49nOCXjOu2ZsIQtsZjKTbxhw0xouOoSpP5JL-VpFobMGmHwgYA3n3rqM14u5N",
  },
];

const Category = () => {
  return (
    <div className="category-page">
      {/* Header */}
      <header className="category-page__header">
        <Link to="/home" className="category-page__logo">
          <MdMovieFilter className="category-page__logo-icon" />
          <span className="category-page__logo-text">CineVerse</span>
        </Link>

        <nav className="category-page__nav">
          {navItems.map((item) => (
            <Link key={item.label} to={item.path} className="category-page__nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link to="/profile" className="category-page__profile-btn">
          <FiUser className="category-page__profile-icon" />
        </Link>
      </header>
      <main className="category-page__main">
        <div className="category-page__hero">
          <h1 className="category-page__title">Browse Categories</h1>
        </div>
        <section className="category-page__section">
          <div className="category-page__grid">
            {categories.map((category) => (
              <Link key={category.id} to={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`} className="category-page__card">
                <img src={category.image} alt={category.name} className="category-page__card-image"/>
                <div className="category-page__card-overlay"></div>
                <h3 className="category-page__card-name">{category.name}</h3>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Category;
