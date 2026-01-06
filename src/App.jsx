import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userDetails } from "./components/Redux/slices/AuthSlice";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Onboarding from "./components/Onboarding/Onboarding";
import OnboardingNotifications from "./components/Onboarding/OnboardingNotifications";
import OnboardingComplete from "./components/Onboarding/OnboardingComplete";
import Welcome from "./components/Welcome/Welcome";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import Home from "./pages/Home/Home";
import Browse from "./pages/Browse/Browse";
import Search from "./pages/Search/Search";
import Movies from "./pages/Movies/Movies";
import TVShows from "./pages/TVShows/TVShows";
import Category from "./pages/Category/Category";
import Details from "./pages/Details/Details";
import Watch from "./pages/Watch/Watch";
import MyList from "./pages/MyList/MyList";
import WatchHistory from "./pages/WatchHistory/WatchHistory";
import Profile from "./pages/Profile/Profile";
import Subscription from "./pages/Subscription/Subscription";
import Payment from "./pages/Payment/Payment";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import NotFound from "./pages/NotFound/NotFound";
import EmailVerified from "./pages/EmailVerified/EmailVerified";
import EmailVerificationFailed from "./pages/EmailVerificationFailed/EmailVerificationFailed";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Sync user state on app load if authenticated
    const token = localStorage.getItem("token");
    const userId = user?._id || user?.id || (localStorage.getItem("authUser") ? JSON.parse(localStorage.getItem("authUser"))._id : null);

    if (token && userId) {
      dispatch(userDetails(userId));
    }
  }, [dispatch, isAuthenticated, user?._id, user?.id]);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/email-verified" element={<EmailVerified />} />
        <Route path="/email-verification-failed" element={<EmailVerificationFailed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
        <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
        <Route path="/onboarding/profile" element={<ProtectedRoute><OnboardingNotifications /></ProtectedRoute>} />
        <Route path="/onboarding/preferences" element={<ProtectedRoute><OnboardingComplete /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/browse" element={<ProtectedRoute><Browse /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
        <Route path="/movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
        <Route path="/tv-shows" element={<ProtectedRoute><TVShows /></ProtectedRoute>} />
        <Route path="/category/:slug" element={<ProtectedRoute><Category /></ProtectedRoute>} />
        <Route path="/details/:id" element={<ProtectedRoute><Details /></ProtectedRoute>} />
        <Route path="/watch/:id" element={<ProtectedRoute><Watch /></ProtectedRoute>} />
        <Route path="/my-list" element={<ProtectedRoute><MyList /></ProtectedRoute>} />
        <Route path="/watch-history" element={<ProtectedRoute><WatchHistory /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
