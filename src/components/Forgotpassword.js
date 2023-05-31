import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../App";

const Forgotpassword = () => {
  let navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [password, setUserPassword] = useState();
  const [userOTP, setUserOTP] = useState("");
  const [OTPstatus, setOTPStatus] = useState("");
  const [originalOTP, sentOTP] = useState("");
  useEffect(() => {
    setOTPStatus("sendemail");
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${server}/resetpassword/${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.status);
        if (data.status === "failure") {
          alert("An Error Occurred Please Try again later");
        } else {
          alert("Email Sent Successfully");
          setOTPStatus("verifyotp");
          sentOTP(data.otp);
        }
      });
  };
  const checkOTP = (e) => {
    e.preventDefault();
    if (userOTP == originalOTP) {
      console.log("passwordmatch");
      document.getElementById("otp").value = "";
      setOTPStatus("changepassword");
    } else {
      alert("Invalid OTP or Something Went Wrong!");
    }
  };
  return (
    <div className="container-fluid">
      <div className="container form-transparent justify-content-center my-5 p-3">
        <div className="tab-content">
          <div
            className="tab-pane fade show active"
            id="pills-login"
            role="tabpanel"
            aria-labelledby="tab-login"
          >
            {(() => {
              console.log(OTPstatus);
              if (OTPstatus == "sendemail") {
                return (
                  <>
                    <form onSubmit={handleSubmit}>
                      <h3>Reset Password</h3>
                      <div className="form-outline mb-4">
                        <label className="form-label" for="loginName">
                          Enter Email Address
                        </label>
                        <input
                          required
                          type="email"
                          id="emailmalie"
                          className="form-control"
                          onChange={(e) => setUserEmail(e.target.value)}
                        />
                      </div>
                      <div className="justify-content-center d-flex mt-4">
                        <button type="submit" className="btn btn-submit px-4">
                          Send OTP
                        </button>
                      </div>
                    </form>
                  </>
                );
              } else if (OTPstatus == "verifyotp") {
                return (
                  <>
                    <form onSubmit={checkOTP}>
                      <h3>OTP Verification</h3>
                      <div className="form-outline mb-4">
                        <label className="form-label" for="loginName">
                          Enter OTP
                        </label>
                        <input
                          required
                          type="number"
                          id="otp"
                          className="form-control"
                          onChange={(e) => setUserOTP(e.target.value)}
                        />
                      </div>
                      <div className="justify-content-center d-flex mt-4">
                        <button type="submit" className="btn btn-submit px-4">
                          Verify OTP
                        </button>
                      </div>
                    </form>
                  </>
                );
              } else if (OTPstatus == "changepassword") {
                return (
                  <>
                    <form>
                      <h3>New Password</h3>
                      <div className="form-outline mb-4">
                        <label className="form-label" for="loginName">
                          Enter New Password
                        </label>
                        <input
                          required
                          type="password"
                          id="pass"
                          className="form-control"
                          onChange={(e) => setUserPassword(e.target.value)}
                        />
                      </div>
                      <div className="justify-content-center d-flex mt-4">
                        <button
                          type="button"
                          className="btn btn-submit px-4"
                          onClick={(e) => {
                            fetch(
                              `${server}/user/email/${userEmail}`,
                              {
                                method: "PUT",
                                crossDomain: true,
                                headers: {
                                  "Content-Type": "application/json",
                                  Accept: "application/json",
                                  "Access-Control-Allow-Origin": "*",
                                },
                                body: JSON.stringify({
                                  password,
                                }),
                              }
                            )
                              .then((res) => res.json())
                              .then((data) => {
                                console.log(password);
                                console.log(userEmail);
                                console.log(data);
                                if (data.status == "ok") {
                                  alert("User Password Changed Successfully!");
                                  navigate(`/login`);
                                } else {
                                }
                              });
                          }}
                        >
                          Change My Password
                        </button>
                      </div>
                    </form>
                  </>
                );
              }
            })()}
          </div>
        </div>
      </div>

      <div className="concord-img-wrapper">
        <img
          className="concord-img vlv-creative"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a1543997-c1fd-4946-92d3-b0a3648b92c7/327506e9-f0a6-4ae6-8115-97ea4c94268d/IN-en-20220808-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          srcset="https://assets.nflxext.com/ffe/siteui/vlv3/a1543997-c1fd-4946-92d3-b0a3648b92c7/327506e9-f0a6-4ae6-8115-97ea4c94268d/IN-en-20220808-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/a1543997-c1fd-4946-92d3-b0a3648b92c7/327506e9-f0a6-4ae6-8115-97ea4c94268d/IN-en-20220808-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/a1543997-c1fd-4946-92d3-b0a3648b92c7/327506e9-f0a6-4ae6-8115-97ea4c94268d/IN-en-20220808-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w"
          alt=""
        />
        <div className="concord-img-gradient"></div>
      </div>
    </div>
  );
};

export default Forgotpassword;
