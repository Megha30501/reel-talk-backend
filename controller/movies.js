const axios = require("axios");

require("dotenv").config();

const API_KEY = process.env.TMBD_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const totalpage = 5;

async function getMoviesByPage(page) {
  try {
    const endpoint = `${BASE_URL}/movie/popular`;

    const response = await axios.get(endpoint, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching data from page ${page}:`, error);
    return [];
  }
}

// Fetch movies from the API
const retrieveAllMovies = async (req, res) => {
  try {
    let movies = [];

    for (let page = 1; page <= totalpage; page++) {
      const moviesOnPage = await getMoviesByPage(page);
      const movieTitles = moviesOnPage.map((movie) => movie.title);
      movies = movies.concat(movieTitles);
    }
    res.status(200).json({ movies: movies });
  } catch (error) {
    console.error("Error while fetching all movies:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching movie data." });
  }
};

module.exports = { retrieveAllMovies };
