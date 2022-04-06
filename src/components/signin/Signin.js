import React, { useEffect, useState } from "react";
import InputForm from "../../helpers/forms/input/Input";
import ButtonHandler from "../../helpers/forms/button/ButtonHandler";
import { Alert, AlertTitle } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InputCheckbox from "../../helpers/forms/checkbox/InputCheckbox";
import "./signin.css";
import Nav from "../header/nav/Nav";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  emailSignInStart,
  googleSignInStart,
  userErrorStart,
  userSuccessStart,
} from "../../redux/user/user.actions";
import axios from "axios";
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userError: user.userError,
  userSuccess: user.userSuccess,
});
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, userError, userSuccess } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [getLocal, setGetLocal] = useState({});

  const geoApiLink = "https://geolocation-db.com/json/";
  const getUserLocationFn = async () => {
    const res = await axios.get(geoApiLink);
    setGetLocal(res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userErrorStart({}));
    dispatch(userSuccessStart({}));
    dispatch(
      emailSignInStart({
        email,
        password,
        ipAddress: getLocal.IPv4,
        location: getLocal.country_name,
      })
    );
  };

  useEffect(() => {
    getUserLocationFn();
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const signInWithGoogle = () => {
    dispatch(userErrorStart({}));
    dispatch(userSuccessStart({}));

    dispatch(googleSignInStart());
  };

  useEffect(() => {
    return () => dispatch(userErrorStart({}));
  }, []);
  return (
    <div className="signin">
      <Nav />
      <div className="signin-grid">
        <div className="signin-left">
          <p>Unleash your investing potential!</p>
          <h1 className="access">Access binaryoptionstrade.org</h1>
          <div className="signin-left-options">
            <div className="signin-left-icon">
              <CheckCircleIcon />
              <span className="signin-left-icon-span">
                Secured Login Process.
              </span>
            </div>
            <div className="signin-left-icon">
              <CheckCircleIcon />
              <span className="signin-left-icon-span">
                256Bit Encryption Protection <small>ON</small>
              </span>
            </div>
            <div className="signin-left-icon">
              <CheckCircleIcon />
              <span className="signin-left-icon-span">
                Ddos Protection <small>ON.</small>
              </span>
            </div>
            <div className="signin-left-icon">
              <CheckCircleIcon />
              <span className="signin-left-icon-span">
                Keylogger protection. <small>ON.</small>
              </span>
            </div>
            <div className="signin-left-icon">
              <CheckCircleIcon />
              <span className="signin-left-icon-span">
                Cookie Store. <small>ON</small>
              </span>
            </div>
          </div>
          <Link to="/signup">
            <ButtonHandler text="Don't have account?" variant="outlined" />
          </Link>
        </div>
        <div className="signin-Right">
          {userError.length > 0 && (
            <>
              {userError.map((err, index) => (
                <Alert severity="error" key={index}>
                  <AlertTitle>{err.title}</AlertTitle>
                  {err.message}
                </Alert>
              ))}
            </>
          )}
          <form onSubmit={handleSubmit} className='signin-form'>
            <div className="signin-right-top">
              <h2 className="signin-details">Login Details</h2>
              <div className="signin-right-top-container">
                <InputForm
                  label="Email"
                  required
                  handleChange={(e) => setEmail(e.target.value)}
                />
                <InputForm
                  label="Password"
                  type="password"
                  required
                  handleChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <InputCheckbox
              bool={checked}
              label={"Remember Me"}
              onCheck={() => setChecked(!checked)}
            />
            <div className="signin-btn">
              <ButtonHandler text="Login" variant="contained" type="submit" />
              <ButtonHandler
                text="Login with Google"
                variant="standard"
                onClick={signInWithGoogle}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
