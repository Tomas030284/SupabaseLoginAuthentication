// import react from "react";
import { useState } from "react";
import { supabase } from "./../src/pages/api/supabaseCient";

const SIGN_UP_VIEW = "sin-up-view";
const SIGN_IN_VIEW = "sign-in-view";
const REQUEST_RESET_PASSWORD_VIEW = "request-reset-password-view";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState(SIGN_IN_VIEW);
  const [mailSent, setMailSent] = useState(false);

  const handleSignUp = async () => {
    try {
      //esto viene de la doc de supabase
      let { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      alert("Check your email to confirm Sign Up");

      if (error) throw error;
    } catch (e) {
      alert(e.message);
    }
  };

  const handleSignIn = async () => {
    try {
     let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      alert("User logged.");
      console.log("hey estoy loggueado");
      console.log(data.user);
      // console.log(session)
    } catch (e) {
      alert(e.message);
    }
  };

  const sendEmail = async () => {
    try {
     /*  const { data, error } = supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/reset-password",
      }); */
      
      console.log("email", email);

      let { data, error } = await supabase.auth.resetPasswordForEmail(email);

      alert("REVISAR CORREO/ CAMBIO PASSWORD");

      console.log("dataaaa", data);

      if (error) throw error;

      setMailSent(true);
    } catch (e) {
      alert(e.message);
    }
  };

  const signInView = () => {
    return (
      <div >
        <h1 >Sign In</h1>
        <div>
          <div className="field">
            <label htmlFor="">
              Email
            </label>
            <input
              type="text"
              name=""
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label htmlFor="">
              Password
            </label>
            <input
              type="password"
              name=""
              id=""
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button
            onClick={handleSignIn}
          >
            Sign In
          </button>
          <div className="text-center">
            <button
              onClick={() => setView(SIGN_UP_VIEW)}
            >
              You are new? Sign Up
            </button>
            <button
              onClick={() => setView(REQUEST_RESET_PASSWORD_VIEW)}
            >
              Forgot your password?
            </button>
          </div>
        </div>
      </div>
    );
  };

  const signUpView = () => {
    return (
      <div >
        <h1>Sign Up</h1>
        <div >
          <div className="field">
            <label htmlFor="" >
              Email
            </label>
            <input
              type="text"
              name=""
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div >
            <label htmlFor="">
              Password
            </label>
            <input
              type="password"
              name=""
              id=""
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button
            onClick={handleSignUp}
          >
            Sign Up
          </button>
          <div className="text-center">
            <button
              onClick={() => setView(SIGN_IN_VIEW)}
            >
              Do you already have an account? Sign In
            </button>
          </div>
        </div>
      </div>
    );
  };

  const requestResetPasswordView = () => {
    if (mailSent) {
      return (
        <h1>
          We sent a link! Please check your inbox!
        </h1>
      );
    }

    return (
      <div>
        <h1>
          Request reset password
        </h1>
        <div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="field">
            <button
              onClick={sendEmail}
            >
              Send email
            </button>
          </div>
        </div>
      </div>
    );
  };

  const getView = () => {
    if (view == SIGN_IN_VIEW) return signInView();
    if (view == SIGN_UP_VIEW) return signUpView();
    if (view == REQUEST_RESET_PASSWORD_VIEW) return requestResetPasswordView();
  };

  return getView();
}
