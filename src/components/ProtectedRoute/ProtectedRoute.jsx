import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, selectedPlan, isSubscribed, isOnboarded } = useSelector((state) => state.auth);
  const location = useLocation();

  // 1. If not logged in, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. If logged in but not onboarded, redirect to onboarding
  // (except if already on onboarding pages)
  if (!isOnboarded && !location.pathname.startsWith("/onboarding")) {
    return <Navigate to="/onboarding" replace />;
  }

  // 2.1 Safeguard: If onboarded but visiting onboarding page, redirect to home
  if (isOnboarded && location.pathname.startsWith("/onboarding")) {
    return <Navigate to="/home" replace />;
  }

  // 3. If onboarded but no plan selected, redirect to subscription page
  // (except if already on subscription page or onboarding pages)
  if (isOnboarded && !selectedPlan && !isSubscribed &&
    location.pathname !== "/subscription" &&
    !location.pathname.startsWith("/onboarding")) {
    return <Navigate to="/subscription" replace />;
  }

  // 4. If plan selected but not paid, redirect to payment
  // (except if already on payment, payment-success, subscription, or onboarding pages)
  if (isOnboarded && selectedPlan && !isSubscribed &&
    location.pathname !== "/payment" &&
    location.pathname !== "/payment-success" &&
    location.pathname !== "/subscription" &&
    !location.pathname.startsWith("/onboarding")) {
    return <Navigate to="/payment" replace />;
  }

  return children;
};

export default ProtectedRoute;

