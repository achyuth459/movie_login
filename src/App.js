//pages
import React from "react";
import { Component } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Review from "./pages/Review";
import OpenReview from "./pages/Openreviews";
import AddMovie from "./pages/AddMovie";
import Header from "./components/header/Header";
import Home from "./pages/home/home";
import MovieList from "./components/movieList/movieList";
import Movie from "./pages/movieDetail/movie";
import "./App.css";

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
              <Route exact path="/addmovie" element={<AddMovie />}></Route>
              <Route exact path="/openreview" element={<OpenReview />}></Route>
            </Routes>
          </StyledContainer>
        </div>
      </Router>
    );
  }
}

export default App;
