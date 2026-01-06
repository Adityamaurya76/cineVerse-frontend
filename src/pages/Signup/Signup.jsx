import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiCamera } from "react-icons/fi";
import { FaGoogle, FaApple, FaUser } from "react-icons/fa";
import "./Signup.scss";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../components/Redux/slices/AuthSlice";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { isAuthenticated, isOnboarded, isSubscribed, selectedPlan } = useSelector((state) => state.auth);

  const { username, fullName, email, password, confirmPassword } = formData;

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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const removeAvatar = () => {
    setAvatar(null);
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeTerms) {
      toast.error("Please agree to the Terms and Privacy Policy");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const submitData = new FormData();
      submitData.append("username", username);
      submitData.append("fullName", fullName);
      submitData.append("email", email);
      submitData.append("password", password);
      submitData.append("role", "user");
      if (avatar) {
        submitData.append("avatar", avatar);
      }

      await dispatch(registerUser(submitData)).unwrap();
      toast.success("Registration successful!");
      navigate("/onboarding");
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
            <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fillRule="evenodd" />
          </svg>
          <span className="auth-layout__logo-text">Cineverse</span>
        </Link>
        <div className="auth-layout__card">
          <h2 className="auth-layout__title">Join the Universe</h2>
          <form className="form" onSubmit={handleSubmit}>
            {/* Avatar Upload */}
            <div className="signup__avatar-section">
              <div className="signup__avatar-wrapper" onClick={handleAvatarClick}>
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar preview" className="signup__avatar-image" />
                ) : (
                  <div className="signup__avatar-placeholder">
                    <FaUser className="signup__avatar-icon" />
                  </div>
                )}
                <div className="signup__avatar-overlay">
                  <FiCamera className="signup__camera-icon" />
                </div>
                <input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/*" className="signup__avatar-input" />
              </div>
              {avatarPreview && (
                <button type="button" className="signup__avatar-remove" onClick={removeAvatar}>Remove</button>
              )}
              <p className="signup__avatar-hint">Add a profile photo</p>
            </div>

            <div className="form__field">
              <label className="form__label">Username</label>
              <input
                type="text"
                name="username"
                className="form__input form__input--lg"
                placeholder="Choose a username"
                value={username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form__field">
              <label className="form__label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form__input form__input--lg"
                placeholder="Enter your full name"
                value={fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form__field">
              <label className="form__label">Email</label>
              <input type="email" name="email" className="form__input form__input--lg" placeholder="Enter your email address" value={email} onChange={handleChange} required />
            </div>
            <div className="form__field">
              <label className="form__label">Create Password</label>
              <div className="form__input-group">
                <input type={showPassword ? "text" : "password"} name="password" className="form__input form__input--lg form__input--with-icon-right" placeholder="Enter your password" value={password} onChange={handleChange} required />
                <button type="button" className="form__input-icon form__input-icon--right" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FiEye /> : <FiEyeOff />}</button>
              </div>
            </div>
            <div className="form__field">
              <label className="form__label">Confirm Password</label>
              <div className="form__input-group">
                <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" className="form__input form__input--lg form__input--with-icon-right" placeholder="Confirm your password" value={confirmPassword} onChange={handleChange} required />
                <button type="button" className="form__input-icon form__input-icon--right" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <FiEye /> : <FiEyeOff />}</button>
              </div>
            </div>
            <div className="signup__terms">
              <label className="form__checkbox-wrapper">
                <input type="checkbox" className="form__checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
                <span className="form__checkbox-label">I agree to the{" "}
                  <Link to="/terms" className="auth-layout__link">Terms</Link>{" "}and{" "}
                  <Link to="/privacy" className="auth-layout__link">Privacy Policy</Link>
                  .
                </span>
              </label>
            </div>
            <button type="submit" className="btn btn--lg btn--primary signup__submit-btn" disabled={isLoading}>{isLoading ? "Creating Account..." : "Create Account"}</button>
          </form>
          <div className="form__divider"><span>Or sign up with</span></div>
          <div className="social-btns">
            <button type="button" className="social-btn">
              <FaGoogle className="social-btn__icon" style={{ color: "#4285f4" }} />
              Google
            </button>
            <button type="button" className="social-btn">
              <FaApple className="social-btn__icon" />
              Apple
            </button>
          </div>
        </div>
        <p className="auth-layout__footer-text">
          Already have an account?{" "}
          <Link to="/login" className="auth-layout__link">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
