//Styeld components
import {
  StyledFromArea,
  StyledFormButton,
  Avatar,
  StyledTitle,
  colors,
  ButtonGroup,
  ExtraText,
  CopyrightText,
} from "./../components/Styles";

import Logo from "./../assets/logo.png";
import { message } from "antd";

// formik

import { Formik, Form } from "formik";
import { TextInput } from "../components/FormLib";
import * as Yup from "yup";

//icons

import { FiMail, FiLock } from "react-icons/fi";

//loader
import { Rings } from "react-loader-spinner";
import { Link } from "react-router-dom";

//aut & redux

import { connect } from "react-redux";
import { loginUser } from "../auth/actions/userActions";
import { useNavigate } from "react-router-dom";

const Login = ({ loginUser }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Avatar image={Logo} />
      <br></br>
      <StyledFromArea bl={colors.dark3}>
        <StyledTitle color={colors.theme} size={30}>
          Member Login
        </StyledTitle>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .min(8, "Password is too short")
              .max(30, "Password is too long")
              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            console.log(values);
            message.success("Login Successfully");
            loginUser(values, navigate, setFieldError, setSubmitting);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput
                name="email"
                type="text"
                label="Email Address"
                placeholder="abc@example.com"
                icon={<FiMail />}
              />
              <TextInput
                name="password"
                type="password"
                label="Password"
                placeholder="********"
                icon={<FiLock />}
              />
              <ButtonGroup>
                {!isSubmitting && (
                  <StyledFormButton type="submit">Login</StyledFormButton>
                )}
                {isSubmitting && (
                  <Rings
                    type="Bars"
                    color={colors.theme}
                    height={49}
                    width={100}
                  />
                )}
              </ButtonGroup>
            </Form>
          )}
        </Formik>
        <ExtraText>
          New here? <Link to="/signup">Signup</Link>
        </ExtraText>

        <CopyrightText>All rights reversed &copy; Cool-coders</CopyrightText>
      </StyledFromArea>
    </div>
  );
};

export default connect(null, { loginUser })(Login);
