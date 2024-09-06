import { fetchFromTMBDB } from "../services/tmdb.service.js";

export const getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchFromTMBDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );

    const randomMovie =
      data.results[Math.floor(Math.random()) * data.results?.length];

    return res.json({ sucess: true, content: randomMovie });
  } catch (error) {
    console.log("error in getTrending Movie: ", error.message);
    return res
      .status(500)
      .json({ sucess: false, message: "Internal Server Error" });
  }
};

// 'https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US

export const getMovieTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMBDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    return res.json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getMovieDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMBDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );

    return res.json({ success: true, content: data });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getSimilarMoviees = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMBDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );
    return res.json({ success: true, similar: data.results });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getMoviesByCategory = async (req, res) => {
  const { category } = req.params;
  try {
      console.log(category)
    const data = await fetchFromTMBDB(
        `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    // 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
    return res.json({ success: true, similar: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
        return res.status(404).send(null);
      }
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
