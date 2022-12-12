import {
  StyledTitle,
  Avatar,
  StyledButton,
  ButtonGroup,
  StyledFromArea,
  colors,
} from "../components/Styles";

//logo
import Logo from "./../assets/logo.png";

// auth & redux
import { connect } from "react-redux";
import { logoutUser } from "./../auth/actions/userActions";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ logoutUser, user }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "transparent",
          width: "100%",
          padding: "15px",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Avatar image={Logo} />
      </div>
      <StyledFromArea bl={colors.dark2}>
        <StyledTitle size={20}>Welcome, {user.name}</StyledTitle>

        <ButtonGroup>
          <StyledButton to="/login" onClick={() => logoutUser(navigate)}>
            Logout
          </StyledButton>
        </ButtonGroup>
      </StyledFromArea>
    </div>
  );
};

const mapStateToProps = ({ session }) => ({
  user: session.user,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
