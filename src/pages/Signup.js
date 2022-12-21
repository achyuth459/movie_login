//Styeld components
import {
  StyledFromArea,
  StyledFormButton,
  Avatar,
  StyledTitle,
  colors,
  ButtonGroup,
  ExtraText,
  TextLink,
  CopyrightText,
} from "./../components/Styles";

import Logo from "./../assets/logo.png";

// formik

import { Formik, Form } from "formik";
import { TextInput } from "../components/FormLib";
import * as Yup from "yup";
import { Link } from "react-router-dom";

//icons

import {
  FiMail,
  FiLock,
  FiUser,
  FiCalendar,
  FiUsers,
  FiPhone,
} from "react-icons/fi";
import { message } from "antd";

//aut & redux

import { connect } from "react-redux";
import { signupUser } from "../auth/actions/userActions";
import { useNavigate } from "react-router-dom";
import { Radio } from "react-loader-spinner";

const Signup = ({ signupUser }) => {
  const navigate = useNavigate();
  return (
    <div>
      <StyledFromArea bl={colors.dark3}>
        <Avatar image={Logo} />
        <StyledTitle color={colors.theme} size={30}>
          Member Signup
        </StyledTitle>
        <Formik
          initialValues={{
            email: "",
            password: "",
            repeatPassword: "",
            first_name: "",
            last_name: "",
            gender: "",
            contact_number: "",
            age: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .min(8, "Password is too short")
              .max(30, "Password is too long")
              .required("Required"),
            first_name: Yup.string().required("Required"),
            last_name: Yup.string().required("Required"),
            gender: Yup.string().required("Required"),
            age: Yup.number().required("Required"),
            contact_number: Yup.number().required("Required"),
            repeatPassword: Yup.string()
              .required("Required")
              .oneOf([Yup.ref("password")], "Password must match"),
          })}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            signupUser(values, navigate, setFieldError, setSubmitting);
            message.success("User Signup  Successfully");
          }}
        >
          {(isSubmitting) => (
            <Form>
              <TextInput
                name="first_name"
                type="text"
                label="First Name"
                placeholder="First Name"
                icon={<FiUser />}
              />
              <TextInput
                name="last_name"
                type="text"
                label="Last Name"
                placeholder="Last Name"
                icon={<FiUser />}
              />
              <TextInput
                name="email"
                type="text"
                label="Email Address"
                placeholder="abc@example.com"
                icon={<FiMail />}
              />
              <TextInput
                name="gender"
                type="text"
                label="Gender"
                placeholder="Gender"
                icon={<FiUsers />}
              />
              <TextInput
                name="contact_number"
                type="number"
                label="Contact Number"
                placeholder="9999999999"
                icon={<FiPhone />}
              />
              <TextInput
                name="age"
                type="number"
                label="Age"
                placeholder="Age"
                icon={<FiCalendar />}
              />
              <TextInput
                name="password"
                type="password"
                label="Password"
                placeholder="********"
                icon={<FiLock />}
              />
              <TextInput
                name="repeatPassword"
                type="password"
                label="RepeatPassword"
                placeholder="********"
                icon={<FiLock />}
              />
              <ButtonGroup>
                <StyledFormButton type="submit">Submit</StyledFormButton>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
        <ExtraText>
          Already have an account? <TextLink to="/login">Login</TextLink>
        </ExtraText>
        <CopyrightText>All rights reversed &copy; Cool-coders</CopyrightText>
      </StyledFromArea>
    </div>
  );
};

export default connect(null, { signupUser })(Signup);
