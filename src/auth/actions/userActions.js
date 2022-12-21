import axios from "axios";
import { sessionService } from "redux-react-session";
import { encode } from "base-64";

export const loginUser = (
  credentials,
  navigate,
  setFieldError,
  setSubmitting
) => {
  // make checks and get  some data

  return () => {
    let base64 = require("base-64");

    const username = "Amansai";
    const password = "Amansai10@";

    axios
      .post("http://13.113.111.68:8080/user/login", credentials, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + base64.encode(username + ":" + password),
        },
      })
      .then((Response) => {
        const { data } = Response;

        if (data.status === "FAILED") {
          const { message } = data;

          // check for specific error
          if (message.includes("credentials")) {
            setFieldError("email", message);
            setFieldError("password", message);
          } else if (message.includes("password")) {
            setFieldError("password", message);
          }
        } else if (data.status === "SUCCESS") {
          const userData = data.data[0];

          const token = userData._id;

          sessionService
            .saveSession(token)
            .then(() => {
              sessionService
                .saveUser(userData)
                .then(() => {
                  navigate("/");
                })
                .catch((err) => console.error(err));
            })

            .catch((err) => console.error(err));
        }

        //complete submission
        setSubmitting(false);
      })
      .catch((err) => console.error(err));
  };
};

export const signupUser = (
  credentials,
  navigate,
  setSubmitting,
  setFieldError
) => {
  return (dispatch) => {
    let base64 = require("base-64");

    const username = "Amansai";
    const password = "Amansai10@";
    axios
      .post("http://13.113.111.68:8080/api/save/UserDetails", credentials, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + base64.encode(username + ":" + password),
          // "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        const { data } = response;

        if (data.status === "FAILED") {
          const { message } = data;

          // checking for specific errors
          if (message.includes("name")) {
            setFieldError("name", message);
          } else if (message.includes("email")) {
            setFieldError("email", message);
          } else if (message.includes("password")) {
            setFieldError("password", message);
          }

          // complete submission
          setSubmitting(false);
        } else if (data.status === "SUCCESS") {
          // login user after successful signup
          const { email, password } = credentials;

          dispatch(
            loginUser(
              { email, password },
              navigate,
              setFieldError,
              setSubmitting
            )
          );
        } else if (data.status === "SUCCESS") {
          const userData = data.data[0];

          const token = userData._id;

          sessionService
            .saveSession(token)
            .then(() => {
              sessionService
                .saveUser(userData)
                .then(() => {
                  navigate("/");
                })
                .catch((err) => console.error(err));
            })
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  };
};

//Review
export const reviewUser = (
  credentials,
  navigate,
  setSubmitting,
  setFieldError
) => {
  return () => {
    let base64 = require("base-64");

    const username = "Amansai";
    const password = "Amansai10@";
    axios
      .post("http://13.113.111.68:8080/api/save/ReviewDetails", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + base64.encode(username + ":" + password),
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        const { data } = response;

        if (data.status === "FAILED") {
          const { message } = data;

          // checking for specific errors
          if (message.includes("movie_ratings")) {
            setFieldError("movie_ratings", message);
          } else if (message.includes("movie_reviews")) {
            setFieldError("movie_reviews", message);
          } else if (message.includes("content")) {
            setFieldError("content", message);
          }
        } else if (data.status === "SUCCESS") {
          const userData = data.data[0];

          const token = userData._id;

          sessionService
            .saveSession(token)
            .then(() => {
              sessionService
                .saveUser(userData)
                .then(() => {
                  navigate("/review");
                })
                .catch((err) => console.error(err));
            })
            .catch((err) => console.error(err));
        }
        // complete submission
        setSubmitting(false);
      })
      .catch((err) => console.error(err));
  };
};

export const logoutUser = (navigate) => {
  return () => {
    sessionService.deleteSession();
    sessionService.deleteUser();
    navigate("/");
  };
};
