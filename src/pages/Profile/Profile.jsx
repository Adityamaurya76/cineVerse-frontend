import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userDetails } from "../../components/Redux/slices/AuthSlice";
import "./Profile.scss";

const navItems = [
  { id: "account", label: "Account", icon: "person", path: "/profile" },
  { id: "history", label: "Viewing History", icon: "history", path: "/watch-history" },
  { id: "preferences", label: "Preferences", icon: "tune", path: "/profile/preferences" },
];

const Profile = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const authState = useSelector((state) => state?.auth ?? {});
  const { user, loading } = authState;

  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const targetId = id || user?._id || user?.id;
    if (targetId) {
      dispatch(userDetails(targetId));
    }
  }, [dispatch, id, user?._id, user?.id]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.fullName || user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const getUserAvatar = (user) => {
    if (user?.avatar?.url) return user.avatar.url;
    const name = user?.fullName || user?.name || user?.username || "User";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=128`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    // TODO: dispatch update profile action here
    console.log("Saving profile:", formData);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDeleteAccount = () => {
    console.log("Delete account requested");
  };

  const subscriptionInfo = {
    plan: user?.subscription?.plan?.name || user?.subscriptionPlan || "N/A",
    amount: user?.subscription?.plan?.price
      ? `$${user.subscription.plan.price.toFixed(2)} / month`
      : user?.subscriptionAmount
      ? `$${user.subscriptionAmount} / month`
      : "N/A",
    validTill: user?.subscription?.endDate
      ? new Date(user.subscription.endDate).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : user?.subscriptionValidTill || "N/A",
  };

  const avatarUrl = getUserAvatar(user);

  if (loading && !user) {
    return (
      <div className="profile profile--loading">
        <p className="profile__loading-text">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile">
      <aside className="profile__sidebar">
        <div className="profile__sidebar-content">
          <div className="profile__sidebar-top">
            <div className="profile__logo">
              <h1 className="profile__logo-title">Cineverse</h1>
              <p className="profile__logo-badge">Premium</p>
            </div>
            <nav className="profile__nav">
              {navItems.map((item) => (
                <Link key={item.id} to={item.path} className={`profile__nav-item ${location.pathname === item.path ? "profile__nav-item--active": ""}`}>
                  <span className="material-symbols-outlined profile__nav-icon">{item.icon}</span>
                  <span className="profile__nav-label">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="profile__sidebar-bottom">
            <Link to="/login" className="profile__nav-item">
              <span className="material-symbols-outlined profile__nav-icon">logout</span>
              <span className="profile__nav-label">Log Out</span>
            </Link>
          </div>
        </div>
      </aside>
      <main className="profile__main">
        <div className="profile__container">
          <header className="profile__header">
            <div className="profile__header-left">
              <div className="profile__header-info">
                <div className="profile__avatar" style={{ backgroundImage: `url(${avatarUrl})` }}></div>
                <div className="profile__user-info">
                  <h2 className="profile__user-name">{formData.name}</h2>
                  <p className="profile__user-email">{formData.email}</p>
                </div>
              </div>
            </div>
            <div className="profile__header-right">
              <button className="profile__edit-btn">Edit Profile</button>
            </div>
          </header>
          <section className="profile__section">
            <h3 className="profile__section-title">Personal Information</h3>
            <div className="profile__form-row">
              <label className="profile__field">
                <span className="profile__label">Name</span>
                <input type="text" name="name" className="profile__input" value={formData.name} onChange={handleInputChange}/>
              </label>
              <label className="profile__field">
                <span className="profile__label">Email</span>
                <input type="email" name="email" className="profile__input" value={formData.email} onChange={handleInputChange}/>
              </label>
            </div>
          </section>
          <section className="profile__section">
            <h3 className="profile__section-title">Subscription</h3>
            <div className="profile__subscription">
              <div className="profile__subscription-item">
                <span className="profile__label">Plan</span>
                <span className="profile__value">{subscriptionInfo.plan}</span>
              </div>
              <div className="profile__subscription-item">
                <span className="profile__label">Amount</span>
                <span className="profile__value">{subscriptionInfo.amount}</span>
              </div>
              <div className="profile__subscription-item">
                <span className="profile__label">Valid Till</span>
                <span className="profile__value">{subscriptionInfo.validTill}</span>
              </div>
            </div>
          </section>
          <section className="profile__section">
            <h3 className="profile__section-title">Change Password</h3>
            <div className="profile__form-grid">
              <label className="profile__field">
                <span className="profile__label">Current Password</span>
                <input type="password" name="currentPassword" className="profile__input" placeholder="Enter your current password" value={formData.currentPassword} onChange={handleInputChange}/>
              </label>
              <label className="profile__field">
                <span className="profile__label">New Password</span>
                <input type="password" name="newPassword" className="profile__input" placeholder="Enter new password" value={formData.newPassword} onChange={handleInputChange}/>
              </label>
              <label className="profile__field">
                <span className="profile__label">Confirm New Password</span>
                <input type="password" name="confirmPassword" className="profile__input" placeholder="Confirm new password" value={formData.confirmPassword} onChange={handleInputChange}/>
              </label>
            </div>
          </section>
          <footer className="profile__footer">
            <button className="profile__delete-btn" onClick={handleDeleteAccount}>Delete Account</button>
            <button className="profile__save-btn" onClick={handleSubmit}>Save Changes</button>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Profile;
