//pages
import { Component } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Review from "./pages/Review";
import Header from "./components/header/Header";
import Home from "./pages/home/home";
import MovieList from "./components/movieList/movieList";
import Movie from "./pages/movieDetail/movie";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import {
  StyledFromArea,
  ExtraText,
  StyledFormButton,
  colors,
} from "./components/Styles";

//styled components
import { StyledContainer } from "./components/Styles";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <div className="App">
          <StyledContainer>
            <Routes>
              <Route index element={<Home />}></Route>
              <Route path="movie/:id" element={<Movie />}></Route>
              <Route path="movies/:type" element={<MovieList />}></Route>
              <Route exact path="/signup" element={<Signup />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/review" element={<Review />}></Route>
              <Route exact path="/openreview" element={<API />}></Route>
            </Routes>
          </StyledContainer>
        </div>
      </Router>
    );
  }
}

function API() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPost = async () => {
      // Till the data is fetch using API
      // the Loading page will show.
      setLoading(true);

      // Await make wait until that
      // promise settles and return its result
      const response = await axios.get(
        "http://localhost:8080/api/getAllReviewDetails"
      );

      // After fetching data stored it in posts state.
      setPosts(response.data);

      // Closed the loading page
      setLoading(false);
    };

    // Call the function
    loadPost();
  }, []);

  return (
    <>
      <div>
        <div className="fetch">
          <h1>All Reviews :-</h1>
        </div>

        {loading ? (
          <h4>Loading...</h4>
        ) : (
          posts.map((item) => (
            // Presently we only fetch
            // title from the API

            <div className="items">
              <StyledFromArea bl={colors.dark3}>
                <>
                  <h2>Movie name: {item.movie_name}</h2>
                  <h3>Review: {item.movie_reviews}</h3>
                  <h4>Rating: {item.movie_ratings}</h4>
                </>
              </StyledFromArea>
            </div>
          ))
        )}

        <br></br>
        <ExtraText>
          Back to review page 👉
          <StyledFormButton>
            <Link to="/review">Back</Link>
          </StyledFormButton>
        </ExtraText>
      </div>
    </>
  );
}

export default App;
