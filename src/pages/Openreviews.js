import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  StyledFromArea,
  colors,
  ExtraText,
  StyledFormButton,
} from "../components/Styles";
import { Link } from "react-router-dom";

function OpenReview() {
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
        "http://13.113.111.68:8080/api/getAllMovieDetails"
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
                  <h2>Movie name: {item.content}</h2>
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

export default OpenReview;
