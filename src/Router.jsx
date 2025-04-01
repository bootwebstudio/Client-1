import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Form from "./pages/Form";
import Thanks from "./pages/Thanks";
import HelpSupport from "./pages/HelpSupport";
import PrivacyPolicies from "./pages/PrivacyPolicies";
import TermsConditions from "./pages/TermsConditions";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/privacy-policies" element={<PrivacyPolicies />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy  />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
