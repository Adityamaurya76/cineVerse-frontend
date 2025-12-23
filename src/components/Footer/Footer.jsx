import { Link } from "react-router-dom";
import "./Footer.scss";

const footerLinks = {
  company: [
    { label: "About Us", path: "/about" },
    // { label: "Careers", path: "/careers" },
    { label: "Press", path: "/press" },
  ],
  support: [
    { label: "Help Center", path: "/help" },
    { label: "Contact Us", path: "/contact" },
    { label: "Account", path: "/profile" },
  ],
  legal: [
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms of Service", path: "/terms" },
    { label: "Cookie Preferences", path: "/cookies" },
  ],
  connect: [
    { label: "Facebook", path: "#", external: true },
    { label: "Twitter", path: "#", external: true },
    { label: "Instagram", path: "#", external: true },
  ],
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__grid">
          <div className="footer__column">
            <h3 className="footer__heading">Company</h3>
            {footerLinks.company.map((link) => (
              <Link key={link.label} to={link.path} className="footer__link">{link.label}</Link>
            ))}
          </div>
          <div className="footer__column">
            <h3 className="footer__heading">Support</h3>
            {footerLinks.support.map((link) => (
              <Link key={link.label} to={link.path} className="footer__link">{link.label}</Link>
            ))}
          </div>
          <div className="footer__column">
            <h3 className="footer__heading">Legal</h3>
            {footerLinks.legal.map((link) => (
              <Link key={link.label} to={link.path} className="footer__link">{link.label}</Link>
            ))}
          </div>
          <div className="footer__column">
            <h3 className="footer__heading">Connect</h3>
            {footerLinks.connect.map((link) =>
              link.external ? (
                <a key={link.label} href={link.path} className="footer__link" target="_blank" rel="noopener noreferrer">{link.label}</a>
              ) : (
                <Link key={link.label} to={link.path} className="footer__link">{link.label}</Link>
              )
            )}
          </div>
        </div>
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Cineverse. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

