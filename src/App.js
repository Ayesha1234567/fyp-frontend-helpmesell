import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useHistory } from "react-router-dom"
import Login from "./Login";
import HomePage from "./HomePage";
import AdminLogin from "./AdminLogin";
import AdminMain from "./AdminMain";
import MarketSurvey from "./MarketSurvey";
import PriceComparison from "./PriceComparison";
import DynamicPage from "./DynamicPages";
import UploadFile from "./UploadFile";
import SignUp from "./SignUp";
import SignupLocalseller from "./SignupLocalseller";
import Laptops from "./Laptops";
import Smartphones from "./Smartphones";
import Payment from "./Payment";
import NativeSelectDemo from "./test";
import ScrapeReviews from "./ScrapeReviews";
import ForgotPassword from "./ForgotPassword";
import MyProfile from "./MyProfile";
import ResetPassword from "./ResetPassword";
import EmailPassword from "./EmailPassword";
import ResetSuccess from "./ResetSuccess";
import PaymentSuccess from "./PaymentSuccess";
import AdminProfile from "./AdminProfile";
import LocalSellerProfile from "./LocalSellerProfile";
// import './App.css';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/login" exact={true} element={<Login />} />

          <Route path="/" exact={true} element={<SignUp />} />

          <Route path="/homepage" exact={true} element={<HomePage />} />

          <Route path="/adminmain" exact={true} element={<AdminMain />} />

          <Route path="/adminlogin" exact={true} element={<AdminLogin />} />

          <Route path="/marketsurvey" exact={true} element={<MarketSurvey />} />

          <Route
              path="/pricecomparison"
              exact={true}
              element={<PriceComparison />}
          />

          <Route path="/products/:id" exact={true} element={<DynamicPage />} />

          <Route path="/uploadfile" exact={true} element={<UploadFile />} />
          <Route path="/signuplocalseller" exact={true} element={<SignupLocalseller />} />
          <Route path="/laptops" exact={true} element={<Laptops />} />
          <Route path="/smartphones" exact={true} element={<Smartphones />} />
          <Route path="/payment" exact={true} element={<Payment />} />
          <Route path="/scrapereviews" exact={true} element={<ScrapeReviews />} />
          <Route path="/test" exact={true} element={<NativeSelectDemo />} />
          <Route path="/forgotpassword" exact={true} element={<ForgotPassword />} />
          <Route path="/myprofile/:id" exact={true} element={<MyProfile />} />
<<<<<<< HEAD
          <Route path="/adminprofile/:id" exact={true} element={<AdminProfile/>}/>
          <Route path="/localsellerprofile/:id" exact={true} element={<LocalSellerProfile/>}/>
          <Route path="/ResetPassword/:id" exact={true} element={<ResetPassword />} />
          <Route path="/emailpassword" exact={true} element={<EmailPassword />} />
          <Route path="/resetsuccess" exact={true} element={<ResetSuccess />} />
          <Route path="/paymentsuccess" exact={true} element={<PaymentSuccess />} />
=======
          <Route path="/ResetPassword/:id" exact={true} element={<ResetPassword />} />
>>>>>>> ce693116355461fc5397a7991af48ba7c8dce6a4
        </Routes>
      </Router>

  );
};
export default App;