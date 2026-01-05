import { useNavigate, Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import "./EmailVerificationFailed.scss";

const EmailVerificationFailed = () => {
    const navigate = useNavigate();

    const handleResend = (e) => {
        e.preventDefault();
        // Implement resend logic here
        console.log("Resend verification email");
    };

    return (
        <div className="email-verification-failed">
            {/* Immersive Background Image */}
            <div className="email-verification-failed__bg">
                <div className="email-verification-failed__bg-image" />
                <div className="email-verification-failed__bg-overlay" />
            </div>

            {/* Content Layer */}
            <div className="email-verification-failed__content">
                {/* Header */}
                <header className="email-verification-failed__header">
                    <Link to="/" className="email-verification-failed__logo">
                        <div className="email-verification-failed__logo-icon">
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>movie</span>
                        </div>
                        <h2 className="email-verification-failed__logo-text">Cineverse</h2>
                    </Link>
                </header>

                {/* Main Content Area */}
                <main className="email-verification-failed__main">
                    <div className="email-verification-failed__card">
                        {/* Icon Section */}
                        <div className="email-verification-failed__icon-container">
                            <div className="email-verification-failed__icon-glow" />
                            <div className="email-verification-failed__icon-circle">
                                <span className="material-symbols-outlined">link_off</span>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="email-verification-failed__text-content">
                            <h1>Verification Link Expired</h1>
                            <p>
                                We couldn't verify your email address. This usually happens because the link is older than 24 hours or has already been used.
                            </p>
                        </div>

                        {/* Form */}
                        <form className="form w-full" style={{ width: '100%' }} onSubmit={handleResend}>
                            <div className="form__field">
                                <label className="form__label" htmlFor="email">Email Address</label>
                                <div className="form__input-group">
                                    <div className="form__input-icon form__input-icon--left">
                                        <span className="material-symbols-outlined">mail</span>
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form__input form__input--with-icon-left"
                                        placeholder="name@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn btn--primary btn--lg w-full" style={{ width: '100%' }}>
                                <span>Resend Verification Email</span>
                                <span className="material-symbols-outlined">send</span>
                            </button>
                        </form>

                        <div className="email-verification-failed__divider">OR</div>

                        {/* Actions */}
                        <div className="email-verification-failed__actions">
                            <Link to="/contact-support" className="email-verification-failed__link-btn">
                                <span className="material-symbols-outlined">support_agent</span>
                                Contact Support
                            </Link>

                            <Link to="/login" className="email-verification-failed__back-btn">
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
                                Back to Sign In
                            </Link>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default EmailVerificationFailed;
