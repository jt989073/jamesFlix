import { fetchFromTMBDB } from "../services/tmdb.service.js";


// #TODO: make dynamic tv vs movie  route, simplify code base

export const getTrendingTV = async (req, res) => {
  try {
    const data = await fetchFromTMBDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );

    const randomtv =
      data.results[Math.floor(Math.random() * data.results?.length)];

    return res.json({ sucess: true, content: randomtv });
  } catch (error) {
    console.log("error in getTrending tv: ", error.message);
    return res
      .status(500)
      .json({ sucess: false, message: "Internal Server Error" });
  }
};

export const getTVTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMBDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    return res.json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getTVDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMBDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
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

export const getSimilarTVs = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMBDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    return res.json({ success: true, similar: data.results });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getTVsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchFromTMBDB(
        `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    return res.json({ success: true, content: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
        return res.status(404).send(null);
      }
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
