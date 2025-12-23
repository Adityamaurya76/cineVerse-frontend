import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiPlus, FiArrowRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import "./OnboardingNotifications.scss";

const defaultAvatar =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDIxLp3AgxLZQGpRr5bYjO9wcxY6cDKWPG6hCiyyO8QSEHjR7jlTFfhDddeMtH4uJeEA3MGSAui-PcvQMhbBKI2B5HMAr4UCfbPStcdpm4O5eB9JaVctk5d8R9Z7T2FEAiV7sBILOt8vuvJdL4zsis29N38p0bVN_-jIPi6b-wtY5NeT8Z_KI_zqwmuf_ovG754AzAJoOeUgSgCI37_RTlRXU9CfuxmSZSfAvb1aqOfaVYGQDugGv1j2esMkZTbP2wpza5QnmOrlzPJ";

const OnboardingProfile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [currentStep] = useState(2);
  const totalSteps = 3;
  const avatarFromUser = user?.avatar?.url || defaultAvatar;
  const [profileName, setProfileName] = useState("Alex");
  const [profiles, setProfiles] = useState([
    { id: 1, name: "Alex", avatar: avatarFromUser },
  ]);

  useEffect(() => {
    const nameFromUser = user?.fullName || user?.username;

    // Initialize from user state when available
    if (nameFromUser) setProfileName(nameFromUser);
    setProfiles([{ id: 1, name: nameFromUser || "Alex", avatar: avatarFromUser }]);
  }, [user]);

  const handleNext = () => {
    localStorage.setItem("profileName", profileName);
    localStorage.setItem("profiles", JSON.stringify(profiles));
    navigate("/onboarding/preferences");
  };

  const handleBack = () => {
    navigate("/onboarding");
  };

  const handleAddProfile = () => {
    if (profiles.length < 5) {
      const newProfile = {
        id: profiles.length + 1,
        name: `Profile ${profiles.length + 1}`,
        avatar: avatarFromUser,
      };
      setProfiles([...profiles, newProfile]);
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="onboarding-profile">
      <main className="onboarding-profile__container">
        <div className="onboarding-profile__progress">
          <p className="onboarding-profile__step-text">Step {currentStep} of {totalSteps}</p>
          <div className="onboarding-profile__progress-bar">
            <div className="onboarding-profile__progress-fill" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
        <div className="onboarding-profile__header">
          <h1 className="onboarding-profile__title">Create Your Profile</h1>
          <p className="onboarding-profile__subtitle">Let's set up your profile. Choose an avatar and a name so we can start personalizing your experience.</p>
        </div>
        <div className="onboarding-profile__form">
          <div className="onboarding-profile__avatar-wrapper">
            <div
              className="onboarding-profile__avatar"
              style={{ backgroundImage: `url(${profiles[0]?.avatar || avatarFromUser})` }}
            ></div>
            <button className="onboarding-profile__avatar-edit"><FiEdit2 /></button>
          </div>
          <div className="onboarding-profile__name-input-wrapper">
            <label htmlFor="profile-name" className="sr-only">Profile Name</label>
            <input id="profile-name" type="text" className="onboarding-profile__name-input" value={profileName} onChange={(e) => setProfileName(e.target.value)} placeholder="Enter your name"/>
          </div>
        </div>
        <div className="onboarding-profile__add-section">
          <p className="onboarding-profile__add-title">Add profiles for family & friends</p>
          <div className="onboarding-profile__profiles-row">
            <div className="onboarding-profile__profiles-stack">
              {profiles.map((profile) => (
                <div key={profile.id} className="onboarding-profile__mini-avatar" style={{ backgroundImage: `url(${profile.avatar})` }} title={profile.name}></div>
              ))}
              {profiles.length < 5 && (
                <button className="onboarding-profile__add-btn" onClick={handleAddProfile}><FiPlus/></button>
              )}
            </div>
          </div>
        </div>
        <div className="onboarding-profile__actions">
          <button className="onboarding-profile__back-btn" onClick={handleBack}>Back</button>
          <button className="onboarding-profile__next-btn" onClick={handleNext}><span>Next</span><FiArrowRight /></button>
        </div>
      </main>
    </div>
  );
};

export default OnboardingProfile;
