import { useNavigate, Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import "./EmailVerified.scss";

const EmailVerified = () => {
    const navigate = useNavigate();

    return (
        <div className="email-verified">
            <div className="email-verified__bg">
                <div className="email-verified__bg-image" />
                <div className="email-verified__bg-overlay" />
            </div>
            <div className="email-verified__content">
                <header className="email-verified__header">
                    <Link to="/" className="email-verified__logo">
                        <div className="email-verified__logo-icon">
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>movie</span>
                        </div>
                        <h2 className="email-verified__logo-text">Cineverse</h2>
                    </Link>
                </header>

                <main className="email-verified__main">
                    <div className="email-verified__card-wrapper">
                        <div className="email-verified__card">
                            <div className="email-verified__icon-container">
                                <div className="email-verified__icon-glow" />
                                <div className="email-verified__icon-circle">
                                    <span className="material-symbols-outlined">check</span>
                                </div>
                            </div>
                            <div className="email-verified__text-content">
                                <h1>You're all set!</h1>
                                <p>Thank you for verifying your email address. Your Cineverse account is now fully active. Dive into thousands of movies and shows.</p>
                            </div>
                            <div className="email-verified__actions">
                                <button
                                    className="btn btn--primary btn--lg w-full group"
                                    style={{ width: '100%' }}
                                    onClick={() => navigate("/home")}
                                >
                                    <span>Start Watching Now</span>
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                                <div className="flex justify-center pt-2">
                                    <Link to="/help" className="email-verified__help-link">
                                        <span className="material-symbols-outlined">help</span>
                                        Need Help?
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="email-verified__trending">
                            <p>Trending Now</p>
                            <div className="email-verified__posters">
                                <div className="email-verified__poster" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDofgTnYNR_QRyetQ9mvj_gYfutsNldXOEAAeBMR2CLWyEM1DB6Ojfi7meFqfomNwgJkC0SPCLOCa6XNcRASRb4ipBFsoDAp31ioDBADoWcsDggeVKbl_HGQimXAhovGOXm5S0iPMQEUcByAXde2Xt38vZtUh9vhWW7OH4pP7k6pwtU0y0NI0iIn_YcvK_felkWbPXOiFWyRfJ3f_phjgGZMcZZ8tWZ087yww18OpSQ9yrjxTMgvbsLcu7hXTpE_GRLiDD2kfjFksP6')" }} />
                                <div className="email-verified__poster" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3H_aNB5yn3XPvTbmOwbbU2WxC-v1DneRnT0ArC_62HTVrwbqh6ZNNkkZnry5ejNsqToYEUozNJuWUjVlewjj1u4RWdzgsVYTcJMzBo8LhTuKpcb5DYDu6lyAy4eIgFbtyVUX1_eOFQUY7SbCXxlpmp9Z3m2OJ6oXGUn-uGo4_ySqze-j3ElMp6MioRqT07vaOZ_ow5x9jhNbc0yqUusETNNcorBmsy6pka9C5ui6ApeEnvnfLwIJYkC72aKkoFsDJ4b-ySEtw9p0R')" }} />
                                <div className="email-verified__poster" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCeXuPw1TWE8LLkIOnMEOBSrWNPKXGeYuSZqUWU8MZKG-Ng-AyJ_TsMI1F-pq2ivzv-nz8lR_2vbahodB7AAimOAlS_RGf9BlCRfSUty6tKAEN0mO964ntP9rNHXHnOAxsfoMF-5c2HfQgxjPVipmx4CxMgkNofeDa2O5tkOJUhAMIjqAdygDQUrr6vScp3cpfvyMRQgW6D5JNunwI-SwH4ji24cK6dsWrf3zGlHP3Wdot_FNg6mF-ca5xkeJpXNWsNVA37EN844quQ')" }} />
                                <div className="email-verified__poster-more">+2k</div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default EmailVerified;
