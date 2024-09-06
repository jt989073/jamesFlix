import { fetchFromTMBDB } from "../services/tmdb.service.js";
import { User } from "../models/user.model.js";


export const searchPerson = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetchFromTMBDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );



    if (!response.results?.length) return res.status(404).send(null);

     await User.findByIdAndUpdate(req.user._id, {
        $push: {
            searchHistory: {
                id: response.results[0].id,
                image: response.results[0].profile_path,
                title: response.results[0].name,
                serachType: 'person',
                createdAt: new Date()
            }
        }
    })


    return res.json({ success: true, content: response.results });
  } catch (error) {
    console.log("error in search person controller: ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Invalid Server Error" });
  }
};

export const searchMovie = async (req, res) => {
    const { query } = req.params;
    try {
      const response = await fetchFromTMBDB(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
      );
  
      if (!response.results.length) return res.status(404).send(null);
      
       await User.findByIdAndUpdate(req.user._id, {
          $push: {
              searchHistory: {
                  id: response.results[0].id,
                  image: response.results[0].poster_path,
                  title: response.results[0].title,
                  serachType: 'movie',
                  createdAt: new Date()
              }
          }
      })

      return res.json({ success: true, content: response.results });

    } catch (error) {
      console.log("error in search movie controller: ", error.message);
      return res
        .status(500)
        .json({ success: false, message: "Invalid Server Error" });
    }
};

export const searchTv = async (req, res) => {
    const { query } = req.params;
    try {
      const response = await fetchFromTMBDB(
        `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
      );
  
      if (!response.results.length) return res.status(404).send(null);
       await User.findByIdAndUpdate(req.user._id, {
          $push: {
              searchHistory: {
                  id: response.results[0].id,
                  image: response.results[0].poster_path,
                  title: response.results[0].name,
                  serachType: 'tv',
                  createdAt: new Date()
              }
          }
      })
  
  
      return res.json({ success: true, content: response.results });
    } catch (error) {
      console.log("error in search tv controller: ", error.message);
      return res
        .status(500)
        .json({ success: false, message: "Invalid Server Error" });
    }
};

export const getSearchHistory = async (req, res) => {
    try {
       return res.json({success: true, content: req.user.searchHistory})
    } catch (error) {
        
    }
}

export const removeFromSearchHistory = async (req, res) => {
    const {id} = req.params
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull : {
                searchHistory: {id: +id}
            }
        })

        return res.json({success: true, message: 'Item removed from search history'})
    } catch (error) {
        console.log('error from deleteSearch controller: ', error.message)
    }
}
