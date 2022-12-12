// dashboard can't be accessed unless logged in

import { Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";

const AuthRoute = ({ children, authenticated, ...rest }) => {
  return (
    <Routes
      {...rest}
      render={({ location }) =>
        authenticated ? (
          children
        ) : (
          <Navigate
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = ({ session }) => ({
  authenticated: session.authenticated,
});

export default connect(mapStateToProps)(AuthRoute);
