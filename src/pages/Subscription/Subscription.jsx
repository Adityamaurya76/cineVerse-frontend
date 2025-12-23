import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPlan } from "../../components/Redux/slices/AuthSlice";
import { subscriptionPlanList } from "../../components/Redux/slices/SubscriptionPlanSlice";
import "./Subscription.scss";

const faqs = [
  {
    question: "What can I watch on Cineverse?",
    answer:
      "Cineverse has an extensive library of feature films, documentaries, TV shows, anime, award-winning Cineverse originals, and more. Watch as much as you want, anytime you want.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel your subscription anytime through your account settings. There are no cancellation fees, and you can rejoin whenever you want.",
  },
  {
    question: "What devices are supported?",
    answer:
      "Cineverse is available on all major streaming devices, including smart TVs, game consoles, smartphones, tablets, and web browsers. Check our help center for a full list of supported devices.",
  },
];

const Subscription = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: plans, loading, error } = useSelector((state) => state.subscription);

  // Fetch plans when billing cycle changes
  useEffect(() => {
    dispatch(subscriptionPlanList({ search: billingCycle }));
    setSelectedPlanId(null); // Reset selection when filter changes
  }, [dispatch, billingCycle]);

  // Set default selected plan when plans are loaded
  useEffect(() => {
    if (plans.length > 0 && !selectedPlanId) {
      const standardPlan = plans.find(p => p.name.toLowerCase().includes('standard'));
      setSelectedPlanId(standardPlan?._id || plans[0]._id);
    }
  }, [plans, selectedPlanId]);

  const handleBillingCycleChange = (cycle) => {
    setBillingCycle(cycle);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const handleSelectPlan = (planId) => {
    setSelectedPlanId(planId);
  };

  const handleContinue = (plan) => {
    const selectedPlanData = {
      id: plan._id,
      name: plan.name,
      price: plan.price,
      billingPeriod: plan.billingPeriod,
      description: plan.description,
      videoQuality: plan.videoQuality,
      screens: plan.screens,
      durationInDays: plan.durationInDays,
    };
    dispatch(setSelectedPlan(selectedPlanData));
    navigate("/payment", { replace: true });
  };

  const getPlanFeatures = (plan) => {
    const features = [];
    if (plan.videoQuality) features.push(`${plan.videoQuality} Quality`);
    if (plan.screens) features.push(`${plan.screens} ${plan.screens === 1 ? 'Screen' : 'Screens'}`);
    if (plan.description) features.push(plan.description);
    if (plan.durationInDays) features.push(`${plan.durationInDays} days access`);
    return features;
  };

  const isPlanPopular = (plan) => {
    return plan.name.toLowerCase() === 'premium' || plan.name.toLowerCase() === 'standard';
  };

  return (
    <div className="subscription">
      <header className="subscription__header">
        <div className="subscription__header-container">
          <Link to="/" className="subscription__logo">
            <svg className="subscription__logo-icon" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"/>
            </svg>
            <span className="subscription__logo-text">Cineverse</span>
          </Link>
          <nav className="subscription__nav">
            <Link to="/" className="subscription__nav-link">Home</Link>
            <Link to="/browse" className="subscription__nav-link">Browse</Link>
          </nav>
        </div>
      </header>

      <section className="subscription__hero">
        <div className="subscription__hero-content">
          <h1 className="subscription__hero-title">Choose the plan that's right for you</h1>
          <p className="subscription__hero-subtitle">Stream unlimited movies and TV shows, ad-free. Cancel anytime.</p>
        </div>
      </section>

      <main className="subscription__main">
        {/* Billing Toggle */}
        <div className="subscription__toggle-wrapper">
          <div className="subscription__toggle">
            <label 
              className={`subscription__toggle-option ${billingCycle === "monthly" ? "subscription__toggle-option--active" : ""}`}
              onClick={() => handleBillingCycleChange("monthly")}
            >
              <span>Monthly</span>
              <input 
                type="radio" 
                name="billing-cycle" 
                value="monthly" 
                checked={billingCycle === "monthly"} 
                onChange={() => handleBillingCycleChange("monthly")}
              />
            </label>
            <label 
              className={`subscription__toggle-option ${billingCycle === "yearly" ? "subscription__toggle-option--active" : ""}`}
              onClick={() => handleBillingCycleChange("yearly")}
            >
              <span>Yearly (Save 20%)</span>
              <input 
                type="radio" 
                name="billing-cycle" 
                value="yearly" 
                checked={billingCycle === "yearly"} 
                onChange={() => handleBillingCycleChange("yearly")}
              />
            </label>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="subscription__loading">
            <p>Loading plans...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="subscription__error">
            <p>Error loading plans: {error}</p>
            <button onClick={() => dispatch(subscriptionPlanList())}>Retry</button>
          </div>
        )}

        {/* Plans Grid */}
        {!loading && !error && plans.length > 0 && (
          <div className="subscription__plans">
            {plans.map((plan) => (
              <div 
                key={plan._id} 
                className={`subscription__plan ${isPlanPopular(plan) ? "subscription__plan--popular" : ""} ${selectedPlanId === plan._id ? "subscription__plan--selected" : ""}`} 
                onClick={() => handleSelectPlan(plan._id)}
              >
                {isPlanPopular(plan) && plan.name.toLowerCase() === 'premium' && (
                  <div className="subscription__plan-badge">Popular</div>
                )}
                <div className="subscription__plan-header">
                  <h3 className="subscription__plan-name">{plan.name}</h3>
                  <p className="subscription__plan-price">
                    <span className="subscription__plan-amount">
                      ${plan.price?.toFixed(2)}
                    </span>
                    <span className="subscription__plan-period">/ {plan.billingPeriod}</span>
                  </p>
                </div>
                <button 
                  className={`subscription__plan-btn ${selectedPlanId === plan._id ? "subscription__plan-btn--primary" : "subscription__plan-btn--secondary"}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedPlanId === plan._id) {
                      handleContinue(plan);
                    } else {
                      handleSelectPlan(plan._id);
                    }
                  }}
                >
                  {selectedPlanId === plan._id ? "Continue" : `Select ${plan.name}`}
                </button>
                <ul className="subscription__plan-features">
                  {getPlanFeatures(plan).map((feature, index) => (
                    <li key={index} className="subscription__plan-feature">
                      <span className="material-symbols-outlined">check_circle</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* No Plans */}
        {!loading && !error && plans.length === 0 && (
          <div className="subscription__empty">
            <p>No subscription plans available at the moment.</p>
          </div>
        )}

        <section className="subscription__faq">
          <h2 className="subscription__faq-title">Frequently Asked Questions</h2>
          <div className="subscription__faq-list">
            {faqs.map((faq, index) => (
              <details key={index} className="subscription__faq-item" open={openFaq === index} onClick={(e) => {e.preventDefault(); toggleFaq(index);}}>
                <summary className="subscription__faq-question">
                  <span>{faq.question}</span>
                  <span className="material-symbols-outlined subscription__faq-icon">expand_more</span>
                </summary>
                <p className="subscription__faq-answer">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="subscription__footer">
        <div className="subscription__footer-container">
          <div className="subscription__footer-logo">
            <svg className="subscription__footer-logo-icon" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"/>
            </svg>
            <span className="subscription__footer-logo-text">Cineverse</span>
          </div>
          <nav className="subscription__footer-nav">
            <a href="#" className="subscription__footer-link">Help Center</a>
            <a href="#" className="subscription__footer-link">Terms of Use</a>
            <a href="#" className="subscription__footer-link">Privacy Policy</a>
            <a href="#" className="subscription__footer-link">Contact Us</a>
          </nav>
          <p className="subscription__footer-copyright">© {new Date().getFullYear()} Cineverse, Inc.</p>
        </div>
      </footer>
    </div>
  );
};

export default Subscription;
