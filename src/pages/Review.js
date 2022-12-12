//Styeld components
import {
  StyledFromArea,
  StyledFormButton,
  Avatar,
  StyledTitle,
  colors,
  ExtraText,
  TextLink,
  ButtonGroup,
  CopyrightText,
} from "./../components/Styles";

import Logo from "./../assets/logo.png";

// formik

import { Formik, Form } from "formik";
import { TextInput } from "../components/FormLib";
import * as Yup from "yup";
import { message } from "antd";

//icons

import { TiStar } from "react-icons/ti";
import { GoTextSize } from "react-icons/go";
import { BiMoviePlay } from "react-icons/bi";

//aut & redux

import { connect } from "react-redux";
import { reviewUser } from "../auth/actions/userActions";
import { useNavigate } from "react-router-dom";

const Review = ({ reviewUser }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Avatar image={Logo} />
      <br></br>
      <StyledFromArea bl={colors.dark3}>
        <StyledTitle color={colors.theme} size={30}>
          Review Page
        </StyledTitle>
        <Formik
          initialValues={{
            movie_ratings: "",
            movie_reviews: "",
            movie_name: "",
          }}
          validationSchema={Yup.object({
            movie_ratings: Yup.string().required("Required"),
            movie_reviews: Yup.string().required("Required"),
            movie_name: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            reviewUser(values, navigate, setFieldError, setSubmitting);
            message.success("Review posted Successfully");
          }}
        >
          {(isSubmitting) => (
            <Form>
              <TextInput
                name="movie_name"
                type="text"
                label="Movie Name"
                placeholder="Enter Movie Name"
                icon={<BiMoviePlay />}
              />
              <TextInput
                name="movie_ratings"
                type="text"
                label="Movie Rating"
                placeholder="Give rating out of 5"
                icon={<TiStar />}
              />
              <TextInput
                name="movie_reviews"
                type="text"
                label="Movie Reviews"
                placeholder="Give Review about Movie"
                icon={<GoTextSize />}
              />

              <ButtonGroup>
                <StyledFormButton type="submit" value="Submit">
                  Submit
                </StyledFormButton>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
        <br></br>
        <ExtraText>
          View All Reviews?? <TextLink to="/openreview">Open</TextLink>
        </ExtraText>
        <CopyrightText>All rights reversed &copy; Cool-coders</CopyrightText>
      </StyledFromArea>
    </div>
  );
};

export default connect(null, { reviewUser })(Review);
