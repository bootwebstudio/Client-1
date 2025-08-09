import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Form from "./pages/Form";
import Thanks from "./pages/Thanks";
import HelpSupport from "./pages/HelpSupport";
import PrivacyPolicies from "./pages/PrivacyPolicies";
import TermsConditions from "./pages/TermsConditions";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";

// Smooth Scroll and Loader
const ScrollToTop = ({ setLoading }) => {
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location, setLoading]);

  return null;
};

const Loader = ({ loading }) => {
  return loading ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md z-50">
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  ) : null;
};

const AppRouter = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      <ScrollToTop setLoading={setLoading} />
      <Loader loading={loading} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/privacy-policies" element={<PrivacyPolicies />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
