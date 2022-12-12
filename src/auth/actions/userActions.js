import axios from "axios";
import { sessionService } from "redux-react-session";

export const loginUser = (
  credentials,
  navigate,
  setFieldError,
  setSubmitting
) => {
  // make checks and get  some data

  return () => {
    axios
      .post("http://localhost:8080/user/login", credentials, {
        headers: {
          "Content-Type": "application/json",
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
    axios
      .post("http://localhost:8080/api/save/UserDetails", credentials, {
        headers: {
          "Content-Type": "application/json",
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
    axios
      .post("http://localhost:8080/api/save/ReviewDetails", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { data } = response;

        if (data.status === "FAILED") {
          const { message } = data;

          // checking for specific errors
          if (message.includes("movie_ratings")) {
            setFieldError("movie_ratings", message);
          } else if (message.includes("emmovie_reviewsail")) {
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
