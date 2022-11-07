import React, { useState, useEffect } from "react";

export default function RegisterForm() {
  const [formIsValid, setFormIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [termsIsValid, setTermsIsValid] = useState(false);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [statusError, setStatusError] = useState("");

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(termsIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [termsIsValid, passwordIsValid]);

  const namehandleChange = (event) => {
    setUser((prevState) => {
      return { ...prevState, name: event.target.value };
    });
  };

  const usernamehandleChange = (event) => {
    setUser((prevState) => {
      return { ...prevState, username: event.target.value };
    });
  };

  const emailhandleChange = (event) => {
    setUser((prevState) => {
      return { ...prevState, email: event.target.value };
    });
  };

  const passwordhandleChange = (event) => {
    setUser((prevState) => {
      return { ...prevState, password: event.target.value };
    });
  };

  const repeatPasswordhandleChange = (event) => {
    if (user.password === event.target.value) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  };

  const termshandleChange = (event) => {
    setTermsIsValid((current) => !current);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/register-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "ok") {
          setStatusError("");
          alert("Sign Up Successful");
          window.location.href = "/login";
        } else {
          setStatusError(data.error);
        }
      });
  };

  return (
    <div
      className="tab-pane fade"
      id="pills-register"
      role="tabpanel"
      aria-labelledby="tab-register"
    >
      {statusError !== "" && (
        <div>
          <p className="text-danger">{statusError}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div className="form-outline mb-4">
          <label className="form-label" for="registerName">
            Name
          </label>
          <input
            type="text"
            id="registerName"
            name="name"
            className="form-control"
            onChange={namehandleChange}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" for="registerUsername">
            Username
          </label>
          <input
            type="text"
            id="registerUsername"
            className="form-control"
            onChange={usernamehandleChange}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" for="registerEmail">
            Email
          </label>
          <input
            type="email"
            id="registerEmail"
            className="form-control"
            onChange={emailhandleChange}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" for="registerPassword">
            Password
          </label>
          <input
            type="password"
            id="registerPassword"
            className="form-control"
            onChange={passwordhandleChange}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" for="registerRepeatPassword">
            Repeat password
          </label>
          <input
            type="password"
            id="registerRepeatPassword"
            onChange={repeatPasswordhandleChange}
            className="form-control"
          />
        </div>

        <div className="form-check d-flex justify-content-start mb-4">
          <input
            className="form-check-input me-2"
            type="checkbox"
            value={termsIsValid}
            id="registerCheck"
            onChange={termshandleChange}
          />
          <label className="form-check-label" for="registerCheck">
            I have read and agree to the terms
          </label>
        </div>

        <div className="justify-content-center d-flex">
          <button className="btn btn-submit px-4" disabled={!formIsValid}>
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
