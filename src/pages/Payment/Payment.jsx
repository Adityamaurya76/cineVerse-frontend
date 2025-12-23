import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {createCheckoutSession} from "../../components/Redux/slices/SubscriptionPlanSlice";
import "./Payment.scss";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedPlan } = useSelector((state) => state.auth);
  const { paymentLoading } = useSelector((state) => state.subscription);

  const handleSubmit = async () => {
    if (!selectedPlan) {
      alert("No Plan Selected!");
      return;
    }
   
    const authUser = localStorage.getItem("authUser");
    const userId = authUser ? JSON.parse(authUser)?.id || JSON.parse(authUser)?._id : null;
    
    const result = await dispatch(
      createCheckoutSession({
        planId: selectedPlan?.id,
        price: selectedPlan?.price,
        userId: userId,
      })
    );

    if (result.meta.requestStatus === "fulfilled") {
      const url = result.payload?.data?.url;
      if (url) window.location.href = url;
    }
  };

  return (
    <div className="payment">
      {/* Header */}
      <header className="payment__header">
        <Link to="/" className="payment__logo">
          <svg className="payment__logo-icon" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" >
            <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"/>
          </svg>
          <span className="payment__logo-text">Cineverse</span>
        </Link>
      </header>
      <main className="payment__main">
        <div className="payment__container">
          {/* Checkout */}
          <div className="payment__checkout">
            <div className="payment__checkout-header">
              <h2 className="payment__checkout-title">Secure Checkout</h2>
              <p className="payment__checkout-subtitle">Complete your subscription to start watching.</p>
            </div>
            <h3 className="payment__section-title">Choose Payment Method</h3>
            <div className="payment__methods">
              <div className="payment__methods-toggle">
                <label className={`payment__method ${paymentMethod === "credit_card" ? "payment__method--active" : ""}`}>
                  <span className="material-symbols-outlined">credit_card</span>
                  <span>Card / UPI (via Stripe)</span>
                  <input type="radio" name="payment_method" value="credit_card" checked={paymentMethod === "credit_card"} onChange={() => setPaymentMethod("credit_card")}/>
                </label>

                <label className={`payment__method ${paymentMethod === "paypal" ? "payment__method--active" : ""}`}>
                  <svg className="payment__paypal-icon" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082h-2.19c-1.717 0-3.146 1.27-3.402 2.904l-1.06 6.728a.641.641 0 0 0 .633.74h3.645l.986-6.265a1.085 1.085 0 0 1 1.07-.917h2.207c4.838 0 7.634-2.473 8.387-6.547.209-1.132.162-2.088-.07-2.862a4.08 4.08 0 0 0-1-1.576z"
                    />
                  </svg>
                  <span>PayPal</span>
                  <input type="radio" name="payment_method" value="paypal" checked={paymentMethod === "paypal"} onChange={() => setPaymentMethod("paypal")}/>
                </label>
              </div>
            </div>
            {paymentMethod === "paypal" && (
              <div className="payment__paypal-message">
                <p>You will be redirected to PayPal to complete your payment securely.</p>
              </div>
            )}
          </div>
          <div className="payment__summary">
            <div className="payment__summary-card">
              <h3 className="payment__summary-title">Order Summary</h3>
              <div className="payment__summary-details">
                <div className="payment__summary-row">
                  <span className="payment__summary-label">Plan</span>
                  <span className="payment__summary-value">Cineverse {selectedPlan?.name}</span>
                </div>
                <div className="payment__summary-row">
                  <span className="payment__summary-label">Billing Cycle</span>
                  <span className="payment__summary-value">{selectedPlan?.billingCycle === "yearly" ? "Yearly" : "Monthly"}</span>
                </div>
                <div className="payment__summary-row payment__summary-row--total">
                  <span className="payment__summary-label">Total Due Today</span>
                  <span className="payment__summary-total">${selectedPlan?.price?.toFixed(2)}</span>
                </div>
              </div>
              <div className="payment__summary-actions">
                <button className="payment__confirm-btn" onClick={handleSubmit} disabled={paymentLoading}>
                  {paymentLoading ? "Redirecting..." : "Confirm Payment"}
                </button>
                <p className="payment__terms">By confirming, you agree to the Cineverse{" "}
                  <a href="#" className="payment__terms-link">Terms of Service</a>.</p>
              </div>
              <div className="payment__security">
                <div className="payment__ssl">
                  <span className="material-symbols-outlined">lock</span>
                  <span>SSL Secure Payment</span>
                </div>

                <div className="payment__cards">
                  <div className="payment__card-icon payment__card-icon--visa"></div>
                  <div className="payment__card-icon payment__card-icon--mastercard"></div>
                  <div className="payment__card-icon payment__card-icon--amex"></div>
                  <div className="payment__card-icon payment__card-icon--paypal"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="payment__footer">
          <p className="payment__copyright">
            © {new Date().getFullYear()} Cineverse. All Rights Reserved. |
            <a href="#" className="payment__footer-link"> Privacy Policy</a> |
            <a href="#" className="payment__footer-link"> Terms of Service</a>
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Payment;
