// import logo from './logo.svg';
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
// import './App.css';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/login" exact={true} element={<Login />} />
          {/* <Login /  >
        </Route> */}
          <Route path="/" exact={true} element={<SignUp />} />
          {/* <SignUp />
        </Route> */}
          <Route path="/homepage" exact={true} element={<HomePage />} />
          {/* <HomePage />
        </Route> */}
          <Route path="/adminmain" exact={true} element={<AdminMain />} />
          {/* <AdminMain />
        </Route> */}
          <Route path="/adminlogin" exact={true} element={<AdminLogin />} />
          {/* <AdminLogin />
        </Route> */}
          <Route path="/marketsurvey" exact={true} element={<MarketSurvey />} />
          {/* <MarketSurvey />
        </Route> */}
          <Route
              path="/pricecomparison"
              exact={true}
              element={<PriceComparison />}
          />
          {/* <PriceComparison />
        </Route> */}
          <Route path="/products/:id" exact={true} element={<DynamicPage />} />
          {/* <DynamicPage />
        </Route> */}
          <Route path="/uploadfile" exact={true} element={<UploadFile />} />
          <Route path="/signuplocalseller" exact={true} element={<SignupLocalseller />} />
          <Route path="/laptops" exact={true} element={<Laptops />} />
          <Route path="/smartphones" exact={true} element={<Smartphones />} />
          <Route path="/payment" exact={true} element={<Payment />} />

        </Routes>
      </Router>

      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
  );
};

export default App;