import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import "./Onboarding.scss";

const features = [
  {
    id: "watch-anywhere",
    title: "Watch Anywhere",
    description: "Download your favorites and watch on the go, without an internet connection.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCT7ODk_W4g8ClxSdjUER0p_8SHQwmzu9DelVyaqHITlbrRkOsi4qRVoll61EoG4-jY-57Dp-FtTDK6iI-n86UeWvXiOm4xPKDfbox1X8d2Q9PsMT8Pil6LB40F7hjk8vinnW6ChodeFOUeYD24VI2Mi4zDYk0Fwg_7kBAFE6DdD774lza0f-YZxL8VLV-vPLmp8MayFAtK-JvS6w6ooILEcptIOgwwYHYJ0WmcezlaKldpskP6czWkA73iaLFK9jx5DtXz9RMNFE-i",
  },
  {
    id: "create-profile",
    title: "Create Your Profile",
    description: "Create up to 5 profiles for a personalized experience for everyone.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIxLp3AgxLZQGpRr5bYjO9wcxY6cDKWPG6hCiyyO8QSEHjR7jlTFfhDddeMtH4uJeEA3MGSAui-PcvQMhbBKI2B5HMAr4UCfbPStcdpm4O5eB9JaVctk5d8R9Z7T2FEAiV7sBILOt8vuvJdL4zsis29N38p0bVN_-jIPi6b-wtY5NeT8Z_KI_zqwmuf_ovG754AzAJoOeUgSgCI37_RTlRXU9CfuxmSZSfAvb1aqOfaVYGQDugGv1j2esMkZTbP2wpza5QnmOrlzPJ",
  },
  {
    id: "personalized",
    title: "Personalized For You",
    description: "Get recommendations tailored to your unique taste.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnzs8vpRVKZRq5vhFK8yFd05exKfld1DvBDxFkcUO4Th7dejQ2EpQEsxt6-Uz_H_YhQ-JGeeCas9VWCcQzODvyuDpqPjbZ7S_iS-gZUNSxOFeQteV5r2oQo5A1Ah63fwBxXQF1CMw7mDfje_KiPvHs4-vS6XV6kYhqg0BNxeYxyKDYwyZwFe6lVm7X3soktzVCGn9MSTH9rF_cRH6IhnbpBr0D5mcGPZwJixGsyZ3rBxakb6wYNSVvk3G0AgaqldE_5rWEqf9b338Z",
  },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [currentStep] = useState(1);
  const totalSteps = 3;

  const displayName = user?.fullName || user?.username || "there";

  const handleNext = () => {
    navigate("/onboarding/profile");
  };

  const handleSkip = () => {
    navigate("/home");
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="onboarding">
      <main className="onboarding__container">
        <div className="onboarding__progress">
          <p className="onboarding__step-text">Step {currentStep} of {totalSteps}</p>
          <div className="onboarding__progress-bar">
            <div className="onboarding__progress-fill" style={{ width: `${progressPercentage}%` }}></div>
          </div>
        </div>
        <div className="onboarding__welcome">
          <h1 className="onboarding__title">Welcome to Cineverse, {displayName}!</h1>
          <p className="onboarding__subtitle">Let's help you discover your next favorite movie and set up your personalized experience.</p>
        </div>
        <div className="onboarding__features">
          <div className="onboarding__features-scroll">
            {features.map((feature) => (
              <div key={feature.id} className="onboarding__feature-card">
                <div className="onboarding__feature-image" style={{ backgroundImage: `url(${feature.image})` }}></div>
                <div className="onboarding__feature-content">
                  <h3 className="onboarding__feature-title">{feature.title}</h3>
                  <p className="onboarding__feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="onboarding__actions">
          <button className="onboarding__skip-btn" onClick={handleSkip}>Skip for Now</button>
          <button className="onboarding__next-btn" onClick={handleNext}><span>Next</span><FiArrowRight /></button>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
