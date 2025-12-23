import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSubscribed } from "../../components/Redux/slices/AuthSlice";
import { verifyPayment } from "../../components/Redux/slices/SubscriptionPlanSlice";
import "./PaymentSuccess.scss";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const [countdown, setCountdown] = useState(5);
  const [paymentStatus, setPaymentStatus] = useState("verifying");
  const [paymentData, setPaymentData] = useState(null);

  const sessionId = new URLSearchParams(search).get("session_id");

  useEffect(() => {
    if (sessionId) {
      // Verify payment status
      const verifyPaymentStatus = async () => {
        try {
          const result = await dispatch(verifyPayment(sessionId));
          if (result.meta.requestStatus === "fulfilled") {
            const data = result.payload?.data;
            setPaymentData(data);
            
            // Check if payment was successful
            if (data?.payment?.status === "success" || data?.stripeSession?.paymentStatus === "paid") {
              setPaymentStatus("success");
              dispatch(setSubscribed(true));
            } else {
              setPaymentStatus("pending");
            }
          } else {
            setPaymentStatus("error");
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          setPaymentStatus("error");
        }
      };

      verifyPaymentStatus();
    } else {
      navigate("/home");
    }
  }, [sessionId, navigate, dispatch]);

  useEffect(() => {
    if (paymentStatus === "success") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/home");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [paymentStatus, navigate]);

  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <div className="payment-success">
      {/* Header */}
      <header className="payment-success__header">
        <Link to="/" className="payment-success__logo">
          <svg className="payment-success__logo-icon" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"/>
          </svg>
          <span className="payment-success__logo-text">Cineverse</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="payment-success__main">
        <div className="payment-success__container">
          <div className="payment-success__content">
            {/* Success Icon */}
            <div className="payment-success__icon-wrapper">
              <div className="payment-success__icon">
                <span className="material-symbols-outlined">check_circle</span>
              </div>
            </div>

            {/* Success Message */}
            {paymentStatus === "verifying" && (
              <>
                <h1 className="payment-success__title">Verifying Payment...</h1>
                <p className="payment-success__message">
                  Please wait while we verify your payment status.
                </p>
              </>
            )}
            {paymentStatus === "success" && (
              <>
                <h1 className="payment-success__title">Payment Successful!</h1>
                <p className="payment-success__message">
                  Thank you for your subscription. Your payment has been processed successfully.
                </p>
                {paymentData?.payment && (
                  <div className="payment-success__details">
                    <p className="payment-success__detail-item">
                      Amount Paid: ${paymentData.payment.amountPaid?.toFixed(2)} {paymentData.payment.currency?.toUpperCase()}
                    </p>
                    {paymentData.payment.paymentMethod && (
                      <p className="payment-success__detail-item">
                        Payment Method: {paymentData.payment.paymentMethod}
                      </p>
                    )}
                  </div>
                )}
                <p className="payment-success__submessage">
                  You now have full access to all premium content on Cineverse.
                </p>
              </>
            )}
            {paymentStatus === "pending" && (
              <>
                <h1 className="payment-success__title">Payment Pending</h1>
                <p className="payment-success__message">
                  Your payment is being processed. Please wait a few moments and refresh the page.
                </p>
              </>
            )}
            {paymentStatus === "error" && (
              <>
                <h1 className="payment-success__title">Verification Error</h1>
                <p className="payment-success__message">
                  There was an error verifying your payment. Please contact support if the issue persists.
                </p>
              </>
            )}

            {/* Action Buttons */}
            {paymentStatus === "success" && (
              <>
                <div className="payment-success__actions">
                  <button 
                    className="payment-success__btn payment-success__btn--primary" 
                    onClick={handleGoHome}
                  >
                    Go to Home
                  </button>
                  <Link 
                    to="/browse" 
                    className="payment-success__btn payment-success__btn--secondary"
                  >
                    Browse Content
                  </Link>
                </div>

                {/* Auto-redirect notice */}
                <p className="payment-success__redirect">
                  Redirecting to home in {countdown} second{countdown !== 1 ? 's' : ''}...
                </p>
              </>
            )}
            {paymentStatus === "pending" && (
              <div className="payment-success__actions">
                <button 
                  className="payment-success__btn payment-success__btn--primary" 
                  onClick={() => window.location.reload()}
                >
                  Refresh Page
                </button>
                <button 
                  className="payment-success__btn payment-success__btn--secondary" 
                  onClick={handleGoHome}
                >
                  Go to Home
                </button>
              </div>
            )}
            {paymentStatus === "error" && (
              <div className="payment-success__actions">
                <button 
                  className="payment-success__btn payment-success__btn--primary" 
                  onClick={handleGoHome}
                >
                  Go to Home
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="payment-success__footer">
        <p className="payment-success__copyright">
          © {new Date().getFullYear()} Cineverse. All Rights Reserved. |
          <a href="#" className="payment-success__footer-link"> Privacy Policy</a> |
          <a href="#" className="payment-success__footer-link"> Terms of Service</a>
        </p>
      </footer>
    </div>
  );
};

export default PaymentSuccess;
