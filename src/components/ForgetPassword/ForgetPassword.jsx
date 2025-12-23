import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { MdLockReset } from "react-icons/md";
import { toast } from "react-toastify";
import "./ForgetPassword.scss";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    setIsLoading(true);

    // TODO: Implement forgot password API call
    // For now, simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Password reset link sent to your email!");
    }, 1500);
  };

  return (
    <div className="auth-layout forget-password">
      <div className="auth-layout__bg-effects">
        <div className="auth-layout__bg-blur auth-layout__bg-blur--primary"></div>
        <div className="auth-layout__bg-blur auth-layout__bg-blur--secondary"></div>
      </div>
      <header className="forget-password__header">
        <button className="forget-password__back-btn" onClick={() => navigate(-1)}><FiArrowLeft /></button>
        <h2 className="forget-password__header-title">Reset Password</h2>
        <div className="forget-password__header-spacer"></div>
      </header>
      <div className="auth-layout__container">
        <div className="forget-password__icon-wrapper">
          <MdLockReset className="forget-password__icon" />
        </div>
        <div className="auth-layout__card">
          <h2 className="auth-layout__title">Forgot Your Password?</h2>
          <p className="auth-layout__subtitle">Enter your email and we will send you a link to get back into your account.</p>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__field">
              <label className="form__label">Email address</label>
              <input type="email" name="email" className="form__input form__input--lg" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <button type="submit" className="btn btn--lg btn--primary forget-password__submit-btn" disabled={isLoading}>{isLoading ? "Sending..." : "Send Reset Link"}</button>
          </form>
        </div>
        <p className="auth-layout__footer-text">Remembered your password?{" "}<Link to="/login" className="auth-layout__link">Log In</Link></p>
      </div>
    </div>
  );
};

export default ForgetPassword;
