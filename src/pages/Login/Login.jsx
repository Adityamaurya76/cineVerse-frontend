import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaGoogle, FaApple } from "react-icons/fa";
import "./Log.scss";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../components/Redux/slices/AuthSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, selectedPlan, isSubscribed, isOnboarded } = useSelector((state) => state.auth);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      if (!isOnboarded) {
        navigate("/onboarding", { replace: true });
      } else if (!isSubscribed && !selectedPlan) {
        navigate("/subscription", { replace: true });
      } else if (!isSubscribed && selectedPlan) {
        navigate("/payment", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    }
  }, [isAuthenticated, isOnboarded, isSubscribed, selectedPlan, navigate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
     setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if(errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email or username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const result = await dispatch(
        loginUser({ email: formData.email, password: formData.password })
      ).unwrap();

      if (result) {
        const userSelectedPlan = result.user?.selectedPlan || selectedPlan;
        const userIsSubscribed = result.user?.isSubscribed || isSubscribed;
        const userIsOnboarded = result.user?.isOnboarded || isOnboarded;

        // Navigate based on user status: onboarding → subscription → payment → home
        if (!userIsOnboarded) {
          navigate("/onboarding", { replace: true });
        } else if (!userIsSubscribed && !userSelectedPlan) {
          navigate("/subscription", { replace: true });
        } else if (!userIsSubscribed && userSelectedPlan) {
          navigate("/payment", { replace: true });
        } else {
          navigate("/home", { replace: true });
        }
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-layout">
      <div className="auth-layout__bg-effects">
        <div className="auth-layout__bg-blur auth-layout__bg-blur--primary"></div>
        <div className="auth-layout__bg-blur auth-layout__bg-blur--secondary"></div>
      </div>
      <div className="auth-layout__container">
        <Link to="/" className="auth-layout__logo">
          <svg className="auth-layout__logo-icon" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fillRule="evenodd"/>
          </svg>
          <span className="auth-layout__logo-text">Cineverse</span>
        </Link>
        <div className="auth-layout__card">
          <h2 className="auth-layout__title">Welcome Back</h2>
          <p className="auth-layout__subtitle">Sign in to continue watching</p>
          {error && <p className="form__error">{error}</p>}
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__field">
              <label className="form__label">Email</label>
              <input type="email" name="email" className="form__input form__input--lg" placeholder="Enter your email address" value={formData.email} onChange={handleChange} required/>
            </div>
            <div className="form__field">
              <label className="form__label">Password</label>
              <div className="form__input-group">
                <input type={showPassword ? "text" : "password"} name="password" className="form__input form__input--lg form__input--with-icon-right" placeholder="Enter your password" value={formData.password} onChange={handleChange} required/>
                <button type="button" className="form__input-icon form__input-icon--right" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FiEye /> : <FiEyeOff />}</button>
              </div>
            </div>
            <div className="login__options">
              <label className="form__checkbox-wrapper">
                <input type="checkbox" className="form__checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}/>
                <span className="form__checkbox-label">Remember me</span>
              </label>
              <Link to="/forgot-password" className="auth-layout__link">Forgot Password?</Link>
            </div>
            <button type="submit" className="btn btn--lg btn--primary login__submit-btn" disabled={loading}>{loading ? "Signing In..." : "Sign In"}</button>
          </form>
          <div className="form__divider"><span>Or continue with</span></div>
          <div className="social-btns">
            <button type="button" className="social-btn"><FaGoogle className="social-btn__icon" style={{ color: "#4285f4" }} />Google</button>
            <button type="button" className="social-btn"><FaApple className="social-btn__icon" />Apple</button>
          </div>
        </div>
        <p className="auth-layout__footer-text">Don't have an account?{" "}<Link to="/signup" className="auth-layout__link">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;
