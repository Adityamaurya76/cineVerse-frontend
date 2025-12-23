import { useEffect, useState } from "react";
import { FiFilm } from "react-icons/fi";
import "./SplashScreen.scss";

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds total
    const interval = 30;
    const increment = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          if (onComplete) {
            setTimeout(onComplete, 300);
          }
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="splash">
      {/* Background glow effects */}
      <div className="splash__glow splash__glow--1"></div>
      <div className="splash__glow splash__glow--2"></div>

      {/* Logo Container */}
      <div className="splash__content">
        <div className="splash__logo-wrapper">
          <div className="splash__icon">
            <FiFilm />
          </div>
          <h1 className="splash__title">CineVerse</h1>
        </div>
      </div>

      {/* Loading Indicator */}
      <div className="splash__loader">
        <div className="splash__progress-bar">
          <div
            className="splash__progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;

