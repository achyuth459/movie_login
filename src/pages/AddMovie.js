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

import { useNavigate } from "react-router-dom";

const AddMovie = ({ AddMovie }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Avatar image={Logo} />
      <br></br>
      <StyledFromArea bl={colors.dark3}>
        <StyledTitle color={colors.theme} size={30}>
          Add Movie Page
        </StyledTitle>
        <Formik
          initialValues={{
            movie_name: "",
            movie_categories: "",
            movie_language: "",
            movie_genres: "",
            release_date: "",
            movie_duration: "",
          }}
          validationSchema={Yup.object({
            movie_name: Yup.string().required("Required"),
            movie_categories: Yup.string().required("Required"),
            movie_language: Yup.string().required("Required"),
            movie_genres: Yup.string().required("Required"),
            release_date: Yup.date().required("Required"),
            movie_duration: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            AddMovie(values, navigate, setFieldError, setSubmitting);
            message.success("Movie Added Successfully");
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
                name="movie_categories"
                type="text"
                label="Movie Categorie"
                placeholder="Enter Movie Categorie "
                icon={<TiStar />}
              />
              <TextInput
                name="movie_language"
                type="text"
                label="Movie Language"
                placeholder="Enter Movie Language"
                icon={<GoTextSize />}
              />
              <TextInput
                name="movie_genres"
                type="text"
                label="Movie Genres"
                placeholder="Enter Movie Genres"
                icon={<GoTextSize />}
              />
              <TextInput
                name="release_date"
                type="text"
                label="Movie Release Date"
                placeholder="Enter Movie Release Date"
                icon={<GoTextSize />}
              />
              <TextInput
                name="movie_duration"
                type="text"
                label="Movie Duration"
                placeholder="Enter Movie duration"
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
          View All Movies?? <TextLink to="/">Open</TextLink>
        </ExtraText>
        <CopyrightText>All rights reversed &copy; Cool-coders</CopyrightText>
      </StyledFromArea>
    </div>
  );
};

export default connect(null, { AddMovie })(AddMovie);
