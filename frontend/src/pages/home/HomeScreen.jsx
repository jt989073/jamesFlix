import { Link } from "react-router-dom";
import { useState } from "react";
import { Info, Play } from "lucide-react";
import MovieSlider from "../../components/MovieSlider";

import {
  MOVIE_CATEGORIES,
  ORIGINAL_IMG_BASE_URL,
  TV_CATEGORIES,
} from "../../utils/constants";

import Navbar from "../../components/Navbar";
import useGetTrendingContent from "../../hooks/useGetTrendingContext";
import { useContentStore } from "../../store/content";

const HomeScreen = () => {
  const [isExpanded, setIsExpanded] = useState();
  const { trendingContent } = useGetTrendingContent();
  const { contentType } = useContentStore();
  


  if (!trendingContent) {
    return (
      <div className="h-screen text-white relative">
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer"></div>
      </div>
    );
  }
  return (
    <>
      {trendingContent && (
        <>
          <div className="relative h-screen text-white">
            <Navbar />
            <img
              src={ORIGINAL_IMG_BASE_URL + trendingContent.backdrop_path}
              alt="Hero img"
              className="absolute top-0 left-0 w-full h-full object-cover -z-50"
            />
            <div
              className="absolute top-0 left-0 w-full h-full object-cover bg-black/50 -z-50"
              aria-hidden="true"
            />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
              <div
                className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10"
                aria-hidden="true"
              />

              <div className="max-w-2xl">
                <h1 className="mt-4 text-6xl font-extrabold text-balance">
                  {trendingContent.title || trendingContent.name}
                </h1>
                <p className="mt-4 text-lg">
                  {isExpanded ? (
                    trendingContent.overview
                  ) : (
                    <>
                      {trendingContent.overview.slice(0, 200)}
                      {trendingContent.overview.length > 200 && (
                        <span
                          onClick={(e) => setIsExpanded(!isExpanded)}
                          className="text-white font-bold cursor-pointer"
                        >
                          {" "}
                          ...read more
                        </span>
                      )}
                    </>
                  )}
                  {isExpanded && (
                    <span
                      onClick={(e) => setIsExpanded(!isExpanded)}
                      className="text-white font-bold cursor-pointer"
                    >
                      {" "}
                      Show less
                    </span>
                  )}
                </p>

                <div className="flex mt-8">
                  <Link
                    to={`/watch/${trendingContent.id}`}
                    className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center"
                  >
                    <Play className="size-6 mr-2 fill-black cursor-pointer" />
                    Play
                  </Link>
                  <Link
                    to={`/watch/${trendingContent.id}`}
                    className="bg-gray-500/50 hover:bg-gray-500 py-2 px-4 rounded flex items-center"
                  >
                    <Info className="size-6 mr-2 cursor-pointer" />
                    MoreInfo
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-10 bg-black py-10">
            {contentType === "movie"
              ? MOVIE_CATEGORIES.map((category) => (
                  <MovieSlider key={category} category={category} />
                ))
              : 
              TV_CATEGORIES.map((category) => (
                  <MovieSlider key={category} category={category} />
                ))
                }
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
